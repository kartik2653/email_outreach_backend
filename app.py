import json
import smtplib
from email.message import EmailMessage

from flask import Flask, render_template, jsonify, request, send_file
from pymongo import MongoClient
import os
from flask_cors import CORS
from bson.json_util import dumps



MONGO_URI = "mongodb+srv://kartikthakur:XU95zlKGDx5oPSIh@cluster0.prcp6.mongodb.net/email-outreach-db?retryWrites=true&w=majority"

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["email-outreach-db"]  # Replace with your DB name
collection = db["sender-emails"]   # Replace with your collection name
sent_emails_collection = db["sent-emails"]



app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/sender-emails', methods=['GET'])
def get_emails():
    try:
        cursor = collection.find({}, {"_id": 0, "sender-emails": 1})  # Only get email field
        for doc in cursor:
            return jsonify({"sender-emails": doc['sender-emails']}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()

        # Parse sender credentials
        sender_info = json.loads(data["senderEmail"])
        sender_email = sender_info["email_id"]
        app_password = sender_info["app_password"]

        # Create HTML body
        plain_body = data["body"]
        html_body = f"""
               <html>
                   <body>
                       <p>{plain_body.replace('\n', '<br>')}</p>
                       <img src=f"/pixel-image/{data['id']}" alt="Email Image" style="margin-top: 20px; width: 300px;">
                   </body>
               </html>
               """

        # Prepare email
        msg = EmailMessage()
        msg["Subject"] = data["subject"]
        msg["From"] = sender_email
        msg["To"] = data["recipientEmail"]
        msg.set_content(plain_body)  # Fallback plain text
        msg.add_alternative(html_body, subtype='html')

        # Send email via Gmail SMTP
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(sender_email, app_password)
            smtp.send_message(msg)

        sent_emails_collection.insert_one(data)
        return jsonify({"message": "Email sent successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/sent-emails', methods=['GET'])
def get_sent_emails():
    try:
        emails = sent_emails_collection.find()
        return dumps(emails), 200  # dumps handles ObjectId serialization
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/pixel-image/<email_key>")
def track_email(email_key):
    try:
        # Update the document where id == email_id
        result = sent_emails_collection.update_one(
            {"id": email_key},
            {
                "$set": {
                    "isRead": True
                }
            }
        )

        # Optionally log if update was successful
        if result.modified_count > 0:
            print(f"Email {email_key} marked as read.")
        else:
            print(f"No email found with id {email_key}.")

    except Exception as e:
        print(f"Error updating email read status: {str(e)}")

    # Always return the tracking image
    return send_file("./tracking-images/tracking-img.png", mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)

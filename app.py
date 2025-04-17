import json
import smtplib
from email.message import EmailMessage
import itertools
import time
from flask import Flask, render_template, jsonify, request, send_file
from pymongo import MongoClient
import os
from flask_cors import CORS
from bson.json_util import dumps
import openpyxl
import uuid
from datetime import datetime
import threading



MONGO_URI = "mongodb+srv://kartikthakur:XU95zlKGDx5oPSIh@cluster0.prcp6.mongodb.net/email-outreach-db?retryWrites=true&w=majority"

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["email-outreach-db"]  # Replace with your DB name
collection = db["sender-emails"]   # Replace with your collection name
sent_emails_collection = db["sent-emails"]
campaign_collection = client["email-outreach-db"]["all-campaigns"]



app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/create-campaign', methods=['POST'])
def create_campaign():
    try:
        campaign_name = request.form.get('campaignName')
        if not campaign_name:
            return jsonify({"error": "Campaign name is required"}), 400

        file = request.files.get('file')
        if not file:
            return jsonify({"error": "Excel file is required"}), 400

        wb = openpyxl.load_workbook(file.stream)
        sheet = wb.active
        rows = list(sheet.iter_rows(min_row=2, values_only=True))

        contacts = []
        for row in rows:
            if len(row) >= 3 and row[2]:
                contact = {
                    "firstName": row[0],
                    "lastName": row[1],
                    "email": row[2]
                }
                contacts.append(contact)

        campaign_id = str(uuid.uuid4())
        created_at = datetime.utcnow().isoformat()

        campaign_doc = {
            "campaignId": campaign_id,
            "campaignName": campaign_name,
            "createdAt": created_at,
            "recipients": contacts,
            "readCount" : 0,
            "unreadCount": len(contacts),
        }

        campaign_collection.insert_one(campaign_doc)

        return jsonify({
            "message": "Campaign created successfully",
            "id": campaign_id,
            "name": campaign_name,
            "createdAt": created_at,
            "totalEmails": len(contacts),
            "readCount": 0,
            "unreadCount" : len(contacts),
            "recipients": contacts
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-all-campaigns', methods=['GET'])
def get_all_campaigns():
    try:
        campaigns_cursor = campaign_collection.find().sort("createdAt", -1)

        campaigns = []
        for campaign in campaigns_cursor:
            campaign['_id'] = str(campaign['_id'])  # Convert ObjectId to string
            campaign['id'] = campaign['campaignId']
            campaign['name'] = campaign['campaignName']
            campaign['totalEmails'] = len(campaign['recipients'])

            campaigns.append(campaign)

        return jsonify({"campaigns": campaigns}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-campaign/<campaign_id>', methods=['GET'])
def get_campaign_by_id(campaign_id):
    try:
        # Find the campaign by campaignId
        campaign = campaign_collection.find_one({"campaignId": campaign_id})

        if not campaign:
            return jsonify({"error": "Campaign not found"}), 404

        # Convert ObjectId to string (optional but nice for frontend)
        campaign['_id'] = str(campaign['_id'])
        print(campaign)
        return jsonify({
            "message": "Campaign created successfully",
            "id": campaign['campaignId'],
            "name": campaign['campaignName'],
            "createdAt": campaign['createdAt'],
            "totalEmails": len(campaign['recipients']),
            "readCount": campaign['readCount'],
            "unreadCount" : campaign['unreadCount'],
            "recipients": campaign['recipients']
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/sender-emails', methods=['GET'])
def get_emails():
    try:
        cursor = collection.find({}, {"_id": 0, "sender-emails": 1})  # Only get email field
        for doc in cursor:
            return jsonify({"sender-emails": doc['sender-emails']}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



def send_bulk_emails_background(data):
    try:
        sender_email_list = data.get("senderEmails", [])
        subject = data["subject"]
        plain_body = data["body"]
        formatted_body = plain_body.replace('\n', '<br>')
        sent_at = data.get("sentAt", datetime.utcnow().isoformat())
        recipient_emails = data.get("recipientEmails", [])

        sender_cycle = itertools.cycle(sender_email_list)
        smtp_sessions = {}

        for recipient_email in recipient_emails:
            sender_info = next(sender_cycle)
            sender_email = sender_info["email_id"]
            app_password = sender_info["app_password"]

            if sender_email not in smtp_sessions:
                smtp = smtplib.SMTP_SSL("smtp.gmail.com", 465)
                smtp.login(sender_email, app_password)
                smtp_sessions[sender_email] = smtp
            else:
                smtp = smtp_sessions[sender_email]

            email_id = f"email-{uuid.uuid4()}"
            image_src = f"https://email-outreach-backend-wmc3.onrender.com/pixel-image/{data['campaignId']}/{recipient_email['email']}"
            html_body = f"""
            <p>{formatted_body}</p>
            <img src="{image_src}" alt="Tracking Image" style="margin-top: 20px; width: 1px; height: 1px; display: hidden;">
            """

            msg = EmailMessage()
            msg["Subject"] = subject
            msg["From"] = sender_email
            msg["To"] = recipient_email['email']
            msg.set_content(plain_body)
            msg.add_alternative(html_body, subtype='html')

            try:
                smtp.send_message(msg)
                email_data = {
                    "id": email_id,
                    "templateId": data["templateId"],
                    "recipientId": recipient_email['email'],
                    "subject": subject,
                    "body": plain_body,
                    "sentAt": sent_at,
                    "isRead": False,
                    "senderEmail": json.dumps(sender_info),
                    "recipient": recipient_email,
                    "campaignId": data["campaignId"]
                }
                sent_emails_collection.insert_one(email_data)
                print(f"[✅] Sent email to: {recipient_email['email']}")
                time.sleep(5)
            except Exception as send_err:
                print(f"[❌] Failed to send to {recipient_email['email']}: {send_err}")

        for smtp in smtp_sessions.values():
            smtp.quit()

    except Exception as e:
        print(f"[ERROR] Background job failed: {str(e)}")

@app.route('/send-bulk-emails', methods=['POST'])
def send_bulk_emails():
    try:
        data = request.get_json()

        sender_email_list = data.get("senderEmails", [])
        recipient_emails = data.get("recipientEmails", [])

        if not sender_email_list:
            return jsonify({"error": "senderEmails array is required"}), 400

        if not recipient_emails:
            return jsonify({"error": "recipientEmails array is required"}), 400

        # Start background thread
        threading.Thread(target=send_bulk_emails_background, args=(data,)).start()

        # Return immediately
        return jsonify({"message": "Bulk email sending started in background"}), 202

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
        formatted_body = plain_body.replace('\n', '<br>')
        image_src = f"https://email-outreach-backend-wmc3.onrender.com/pixel-image/{data['campaign_id']}/{data['recipientId']}"
        html_body = f"""
        <p>{formatted_body}</p>
        <img src={image_src} alt="Email Image" style="margin-top: 20px; width: 1px; height: 1px; display:hidden">
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
        return dumps(emails), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/pixel-image/<campaign_id>/<email_key>")
def track_email(campaign_id, email_key):
    try:
        # Find the unread email document
        email_doc = sent_emails_collection.find_one({
            "recipientId": email_key,
            "campaign_id": campaign_id,
            "isRead": False
        })
        print(email_doc,'email_doc')

        if email_doc:
            # Mark as read
            sent_emails_collection.update_one(
                {"_id": email_doc["_id"]},
                {"$set": {"isRead": True}}
            )

            # Update read and unread counts in campaign collection
            campaign_collection.update_one(
                {"campaignId": campaign_id},
                {
                    "$inc": {
                        "readCount": 1,
                        "unreadCount": -1
                    }
                }
            )

            print(f"✅ Email '{email_key}' marked as read. Updated campaign counts.")
        else:
            print(f"ℹ️ Email already read or not found for '{email_key}'.")

    except Exception as e:
        print(f"❌ Error updating read status: {str(e)}")

    # Always return the tracking image
    return send_file("./tracking-images/tracking-img.png", mimetype='image/png')


@app.route('/sent-emails/<campaign_id>', methods=['GET'])
def get_sent_emails_by_campaign(campaign_id):
    try:
        # Find all emails where campaignId matches
        emails_cursor = sent_emails_collection.find({"campaign_id": campaign_id})

        # Convert cursor to list and format ObjectIds
        emails = []
        for email in emails_cursor:
            email['_id'] = str(email['_id'])
            emails.append(email)

        if not emails:
            return jsonify({"message": "No emails found for this campaign"}), 404

        return jsonify({"emails": emails}), 200

    except Exception as e:
        print(e,'error')
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

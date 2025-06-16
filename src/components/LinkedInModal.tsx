"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";
import { linkedInService } from "@/services/api/linkedinService";
import { useEffect } from "react";
import { Check } from "lucide-react";
import modalBgIcon from "@/assests/svg/modalbg.svg";

export default function LinkedInModal({
  code,
}: {
  code?: string;
}) {
  const navigate = useNavigate();
  const { linkedInCredentials }: any = useAuthStore();

  useEffect(() => {
    if (code) {
      setTimeout(() => {
        navigate("/dashboard/personal/calendar");
      }, 3000);
    }
  }, [code]);

  const handleLinkAccount = async () => {
    if (!linkedInCredentials?.isAccessProvided) {
      const response: any = await linkedInService.linkedInAuth();
      window.open(response, "_blank");
    }
  };

  return (
        <div className="relative p-8 flex flex-col justify-center items-center">
          <div className={`text-center ${code ? "" : "mb-8"}`}>
            {code && (
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Check />
              </div>
            )}
            <h2 className="text-3xl font-bold text-black mb-2 font-bricolage-grotesque">
              {code ? "Scheduled!" : "Link your LinkedIn now !"}
            </h2>
            <p className="flex flex-column justify-center items-center text-black/80 text-sm leading-relaxed">
              {code ? (
                "Set it and forget it. I’ll take it from here."
              ) : (
                <div >
                  {" "}
                  Manage your account, check notifications,
                  <br />
                  comments, uploads and more.
                </div>
              )}
            </p>
          </div>

          {!code && (
            <div className="w-full">
              <Button
                onClick={handleLinkAccount}
                className="px-[150px] h-12 bg-black text-white hover:bg-gray-800 rounded-full font-medium mb-4"
              >
                Link Account
              </Button>
              <div className="text-center">
                <span className="text-black/70 text-sm">Having Issue? </span>
                <button className="text-black font-medium text-sm underline hover:no-underline">
                  Support
                </button>
              </div>
            </div>
          )}
        </div>
  );
}





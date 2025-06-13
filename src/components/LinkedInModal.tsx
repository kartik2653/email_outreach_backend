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
  isOpen,
  setIsOpen,
  code,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        style={{
          backgroundImage: `url("${modalBgIcon}")`,
          backgroundPosition: "center",
        }}
        className="p-0 border-none w-[696px] h-[476px] rounded-standard bg-yellow-green"
      >
        <div className="relative flex flex-col items-center justify-center">
          <div className={`text-center ${code ? "" : "mb-8"}`}>
            {code && (
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Check />
              </div>
            )}
            <h2 className="text-3xl font-bold text-black mb-2 font-bricolage-grotesque">
              {code ? "Scheduled!" : "Link your LinkedIn now !"}
            </h2>
            <p className="text-black/80 text-sm leading-relaxed font-manrope">
              {code ? (
                "Set it and forget it. I’ll take it from here."
              ) : (
                <>
                  {" "}
                  Manage your account, check notifications,
                  <br />
                  comments, uploads and more.
                </>
              )}
            </p>
          </div>

          {!code && (
            <>
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
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store";
import { linkedInService } from "@/services/api/linkedinService";

export default function LinkedInModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const { linkedInCredentials }: any = useAuthStore();

  const handleLinkAccount = async () => {
    if (!linkedInCredentials?.isAccessProvided) {
      const response: any = await linkedInService.linkedInAuth();
      window.open(response, "_blank");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md p-0 bg-yellow-green border-none">
        <div className="relative p-8">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black text-white hover:bg-gray-800 rounded-full w-8 h-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-2">Link your LinkedIn now !</h2>
            <p className="text-black/80 text-sm leading-relaxed">
              Manage your account, check notifications,
              <br />
              comments, uploads and more.
            </p>
          </div>

          <Button
            onClick={handleLinkAccount}
            className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-full font-medium mb-4"
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
      </DialogContent>
    </Dialog>
  );
}

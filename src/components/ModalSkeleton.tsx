import React, { useState } from "react";
import modalBackground from "./ui/ModalBackground";
import WelcomeModal from "./WelcomeModal";
import LinkedInModal from "./LinkedInModal";

const WelcomeModalWrapper = modalBackground(WelcomeModal);
const LinkedInModalWrapper = modalBackground(LinkedInModal);

const ModalSkeleton = ({
  isOpen,
  setIsOpen,
  code,
  activeModal,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  code?: string;
  activeModal: "welcome" | "linkedIn";
}) => {
  switch (activeModal) {
    case "welcome":
      return<WelcomeModalWrapper key="welcome" setIsOpen={setIsOpen} isOpen = {isOpen} />
    case "linkedIn":
      return<LinkedInModalWrapper key="linkedIn" setIsOpen={setIsOpen} code = {code} isOpen = {isOpen} />
    default:
      return null;
  }
};

export default ModalSkeleton;

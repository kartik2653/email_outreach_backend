import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const modalBackground = (WrappedComponent: React.ComponentType<any>) => {
  return function ModalBackgroundComponent(props: any) {
    const { setIsOpen, isOpen, ...rest } = props;
    const handleClose = () => {
      setIsOpen(false);
    };
    return (
      <Modal open={isOpen} className="z-100000">
        <Box>
          <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl w-[45%] h-[60%] shadow-xl z-100000 flex items-center justify-center">
            <div className="relative bg-green-400 rounded-xl w-full h-full overflow-hidden">
              <div className="overflow-hidden w-full h-full">
                <div className="absolute w-[30%] h-[30%] bg-yellow-green rounded-full -right-16 -top-6 transform rotate-[155deg] z-0"></div>
                <div className="absolute w-[50%] h-[50%] bg-yellow-green rounded-full -bottom-32 -left-12  transform rotate-[165deg] z-0"></div>
                <div
                  className="absolute h-[24px] w-[24px] top-[10px] right-[10px]"
                  onClick={handleClose}
                >
                  <img src="/src/assests/svg/cross.svg" alt="Close" />
                </div>
                <div className="h-full w-full flex justify-center align-center">
                  <WrappedComponent {...props} />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    );
  };
};

export default modalBackground;

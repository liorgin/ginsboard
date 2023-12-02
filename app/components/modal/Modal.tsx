import { Box, Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { ModalProps } from "../ThemeRegistry/ThemeRegistry";
import { useEffect } from "react";
import useModalStore from "@/app/hooks/useModalStore";

const modalPanel = {
  hide: {
    opcity: 0,
    y: "-100vh",
  },
  show: {
    opcity: 1,
    y: "0%",
  },
};

const overlayStyle = {
  position: "absolute",
  zIndex: "9999",
  width: "100%",
  height: "100%",
  display: "grid",
  placeItems: "center",
};

const containerStyle = {
  maxWidth: "90%",
  overflow: "hidden",
  borderRadius: "10px",
  backdropFilter: "blur(5px)",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4))",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
};

export const Modal = () => {
  const { isOpen, closeModal, props } = useModalStore();

  useEffect(() => {
    if (props.timeout)
      setTimeout(() => {
        closeModal();
      }, props.timeout);
  }, [closeModal, props.timeout]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Box className="modal" layout component={motion.div} sx={overlayStyle}>
          <Box
            component={motion.div}
            variants={modalPanel}
            initial="hide"
            animate="show"
            exit={"hide"}
            transition={{ type: "spring", bounce: "0.25", duration: 0.5 }}
            sx={containerStyle}
          >
            {props.children}
            {props.timeout && (
              <Box
                sx={{ height: "8px", background: "cyan" }}
                component={motion.div}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: props.timeout / 1000 }}
              />
            )}
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
};

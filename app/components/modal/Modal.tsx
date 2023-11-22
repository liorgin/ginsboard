import { Box, Button } from "@mui/material";
import { AnimatePresence, AnimationControls, motion } from "framer-motion";

const variants = {
  // closed: { opacity: 1, y: "-100%" },
  // notification: {y: 500, opacity: 1},
  // modal: {y: 100, width: "90%", height: "50vh", background: "blue", opacity: 1},
};

export const Modal = ({
  open,
  onClose,
  modalControl
}: {
  open: boolean;
  onClose: () => void;
  modalControl: AnimationControls
}) => {


  return (
    // <AnimatePresence>
    //   {!open && (
        <Box
          className="modal"
          layout
          component={motion.div}
          initial={['closed']}
          animate={modalControl}
          exit="closed"
          sx={{
            zIndex: "9999",
            width: "50%",
            height: "50%",
            background: "red",
          }}
        >
            <h1>Modal</h1>
            <Button onClick={() => modalControl.start('modal')}>To Modal</Button>
          <Button onClick={onClose}>close</Button>
        </Box>
    //   )}
    // </AnimatePresence>
  );
};

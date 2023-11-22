"use client";

import { Drawer, Typography } from "@mui/material";
import useVoiceStore from "../hooks/useVoiceStore";
import MicrophoneIndicator from "./MicrophoneIndicator";
import Image from "next/image";
// import microphoneIcon from "../../public/awak.gif";
// import microphoneIcon from "../../public/awake2.gif";
import { Player } from "@lottiefiles/react-lottie-player";

function VoiceVisualization() {
  const { isAwake, text } = useVoiceStore();

  return (
    <Drawer
      open={isAwake}
      anchor="bottom"
      hideBackdrop={true}
      sx={{
        // flexShrink: 0,
        "& .MuiDrawer-paper": {
          bottom: "20px",
          left: "20px",
          minWidth: "200px",
          borderRadius: "20px",
          width: "400px",
          height: "200px",
          display: "flex",
          alignItems: "start",
          backdropFilter: "blur(5px)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        },
      }}
    >
      <Player
        autoplay
        loop
        src="/awake.json"
        style={{ height: "150px", width: "150px" }}
        speed={4}
      />
      <Typography variant="h6" sx={{ color: "white" }}>{text}</Typography>
    </Drawer>
  );
}

export default VoiceVisualization;

"use client";

import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";
import VoiceVisualization from "./components/VoiceVisualization";
import "./globals.css";
import useSpeechRecognition from "./hooks/useSpeechRecognition";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Ginsboard",
  description: "GBoard for Gin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useSpeechRecognition();

  const [type, setType] = useState("notification");

  return (
    <html lang="en">
      <body className={inter.className}>
        <Box
          sx={{
            padding: "20px",
            width: "100%",
            position: "absolute",
            display: "grid",
            placeItems: type === "notification" ? "end start" : "center",
            height: "100vh",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              borderRadius: "10px",
              background: "rgba(255,255,255,0.5)",
              width: type === "modal" ? "400px" : "200px",
              height: type === "modal" ? "500px" : "200px",
            }}
            component={motion.div}
            layout
            transition={{  type: 'spring', bounce: '0.25'}}
            className={type}
          >
            <Button
              component={motion.button}
              variant="contained"
              layout
              onClick={() => {
                setType("modal");
              }}
            >
              modal
            </Button>
            <Button
              component={motion.button}
              variant="contained"
              layout
              onClick={() => {
                setType("notification");
              }}
            >
              notification
            </Button>
          </Box>
        </Box>
        <ThemeRegistry>{children}</ThemeRegistry>
        <VoiceVisualization />
      </body>
    </html>
  );
}

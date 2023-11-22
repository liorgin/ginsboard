import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSub } from "../../hooks/usePubSub";

const images = [
  { url: "/port0.jpg", credit: "Satvik on Unsplash" },
  { url: "/port1.jpg", credit: "Miguel Lindo on Unsplash" },
  { url: "/port2.jpg", credit: " Aideal Hwa on Unsplash" },
];

const commands = ['change background', 'rotate image', 'switch photo', 'next image', 'switch background', 'switch image']

function BackgroundImage() {
  const [currIndex, setCurrIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useSub("changeBackground", commands, (event: string) => {
    console.log("changeBackground", event);
    nextImage();
  });

  const nextImage = () => {
    setCurrIndex((prev) => {
      const newVal = (prev + 1) % 3;
      console.log(newVal);
      return newVal;
    });
  };

  return (
    <Box>
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            background: `url(${image.url}) no-repeat center center fixed`,
            backgroundSize: "cover",
            height: "100vh",
            width: "100vw",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            opacity: index === currIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        ></Box>
      ))}
    </Box>
  );
}

export default BackgroundImage;

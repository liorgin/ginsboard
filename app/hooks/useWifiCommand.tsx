"use client";

import useModalStore from "./useModalStore";
import { useSub } from "./usePubSub";
import Image from 'next/image';
import WifiQR from '../../public/wifi-qr.jpg';

const actionCommand = ["wi-fi", "wifi", "internet"];

const WIFI_TIMEOUT_MS = 20000;

export const useWifiCommand = () => {

  const {openModal} = useModalStore();
    
  useSub({eventId: 'wifiCommand', confirmSpeech: 'Ok, Showing wifi QR for easy access'}, actionCommand, () => {
    openModal({
      children: <Image priority src={WifiQR} alt="M" color="blue"/>,
      timeout: WIFI_TIMEOUT_MS,
    })
   
  });
};

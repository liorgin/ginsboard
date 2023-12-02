"use client";

import { useRouter } from "next/navigation";
import { useSub } from "./usePubSub";

const actionCommand = ["go to", "open", "show", "switch to", "change to"];
const apps = ["recipes"];

export const useApplicationCommands = () => {

  const router = useRouter();
    
  useSub({eventId: 'actionCommand', confirmSpeech: 'Got it'}, actionCommand, (event: string) => {
    console.log("actionCommand", event);
    apps.forEach((app) => {
      if (event.endsWith(app)) {
        router.replace(`/${app}`);
      }
    });
  });
};

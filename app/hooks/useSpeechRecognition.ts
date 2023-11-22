"use client";

import { use, useCallback, useEffect, useMemo, useRef } from "react";
import { setTimeout } from "timers";
import { usePub } from "./usePubSub";
import useVoiceStore from "./useVoiceStore";
import { getEventFromText } from "../services/CommandAnalyzer";

let recognition: SpeechRecognition;
let speechSynthesis: SpeechSynthesis;

const grammar = "#JSGF V1.0; grammar colors; public <weak> = 'hello board';";

let beat: HTMLAudioElement

const useSpeechRecognition = () => {

  const awakeTimeoutId = useRef<ReturnType<typeof setTimeout>>();

  const publish = usePub();

  // optional usecallback, just get the fresh state is enought
  const isAwake = useCallback(() => {
    return useVoiceStore.getState().isAwake;
  }, []);

  useEffect(() => {
    beat = new Audio("/awake.wav")
    if ("webkitSpeechRecognition" in window) {
      recognition = new webkitSpeechRecognition();
      // recognition.continuous = true;
      speechSynthesis = window.speechSynthesis;

      // recognition.lang = "he";
    }
  }, []);

  useEffect(() => {
    console.log("useEffect", recognition);
    if (!recognition) return;

    recognition.onend = () => {
      startListening();
    };
    recognition.onspeechend = function () {};

    recognition.onerror = function (event) {};

    recognition.onaudiostart = function (event) {
      //Fired when the user agent has started to capture audio.
    };
    recognition.onaudioend = function (event) {
      //Fired when the user agent has finished capturing audio.
    };
    recognition.onnomatch = function (event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
    };
    recognition.onsoundstart = function (event) {
      //Fired when any sound — recognisable speech or not — has been detected.
    };
    recognition.onsoundend = function (event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
    };
    recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
    };
    recognition.onstart = function (event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log("SpeechRecognition.onstart");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      clearTimeout(awakeTimeoutId.current!);

      // recognition.stop();
      const text = event.results[0][0].transcript.toLowerCase();
      console.log(text);

      if (["ok johnson", "play johnson", "hey johnson"].includes(text)) {
        useVoiceStore.setState({ isAwake: true });
        beat.play();
        awakeTimeoutId.current = setTimeout(() => {
          useVoiceStore.setState({ isAwake: false });
        }, 5000);
        return;
      }
      if (isAwake()) {
        useVoiceStore.setState({ text: text });
        const a = new SpeechSynthesisUtterance();
        a.voice = speechSynthesis.getVoices()[3];

        const eventText = getEventFromText(text);
        if (!eventText) {
          a.text = "Sorry I didn't understand";
        } else {
          a.text = `OK, ${text}`;
          a.addEventListener("end", () => {
            publish(eventText, text);
          });
        }
        speechSynthesis.speak(a);
      }
      //this might change when we wallow sequental processing commands
      setTimeout(() => {
        useVoiceStore.setState({ isAwake: false });
      }, 1500);
    };

    recognition.start();

    return () => {
      console.log("distroy layout stop recognition");
      recognition.onresult = null;
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    recognition.start();
  };

  const stopListening = () => {
    recognition.stop();
  };

  return {
    // startListening,
    // stopListening,
    isRecognitionSupported: !!recognition,
  };
};

export default useSpeechRecognition;

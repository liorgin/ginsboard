import { useEffect } from "react";
import { EventEmitter } from "eventemitter3";
import {
  JohnsonEvent,
  addTextsForEvent,
  removeTextsForEvent,
} from "../services/CommandAnalyzer";

const emitter = new EventEmitter();

export const useSub = (event: JohnsonEvent, list: string[], callback: any) => {
  const unsubscribe = () => {
    emitter.off(event.eventId, callback);
    removeTextsForEvent(event.eventId, list);
  };

  useEffect(() => {
    emitter.on(event.eventId, callback);
    addTextsForEvent(event, list);
    return unsubscribe;
  }, []);

  return unsubscribe;
};

export const usePub = () => {
  return (event: any, data: any) => {
    emitter.emit(event, data);
  };
};

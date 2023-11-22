import { useEffect } from "react";
import { EventEmitter } from "eventemitter3";
import {
  addTextsForEvent,
  removeTextsForEvent,
} from "../services/CommandAnalyzer";

const emitter = new EventEmitter();

export const useSub = (event: string, list: string[], callback: any) => {
  const unsubscribe = () => {
    emitter.off(event, callback);
    removeTextsForEvent(event, list);
  };

  useEffect(() => {
    emitter.on(event, callback);
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

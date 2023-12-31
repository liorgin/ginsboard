
export let texts = [] as string[];
export const textsMap = new Map<string, JohnsonEvent>();

export type JohnsonEvent = {
  eventId: string;
  confirmSpeech: string;
}

export const getEventFromText = (speech: string) : JohnsonEvent | undefined  => {
  let event = undefined;  
  texts.forEach((text) => {
    if (speech.includes(text)) {
      event = textsMap.get(text);
    }
  });
  return event;
};

export const addTextsForEvent = (event: JohnsonEvent, textsToAdd: string[]) => {
  texts = [...texts, ...textsToAdd];
  textsToAdd.forEach((text) => {
    textsMap.set(text, event);
  });
};

export const removeTextsForEvent = (eventId: string, textsToRemove: string[]) => {
  texts = texts.filter((text) => !textsToRemove.includes(text));
  textsToRemove.forEach((text) => {
    textsMap.delete(text);
  });
}

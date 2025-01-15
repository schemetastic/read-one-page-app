import { writable } from "svelte/store";


export const currentScreen = writable("home");
export const selectedReadingField = writable(null);
export const selectedReadingTopic = writable(null);
export const questionsWithAnswers = writable(null);
export const score = writable(0);


export const dialogBoxVisible = writable(false);
export const dialogBoxTitle = writable("Title");
export const dialogBoxDescription = writable("Content");

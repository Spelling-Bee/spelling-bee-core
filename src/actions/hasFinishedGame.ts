import { SpellingBeeGame } from "../types";
import wasGuessed from "./wasGuessed";

function hasFinishedGame(
  words: Array<string>,
  guessedWords: Array<string>
): boolean;

function hasFinishedGame(sb: SpellingBeeGame): boolean;

function hasFinishedGame(
  dynamicArgument: Array<string> | SpellingBeeGame,
  guessedWords?: Array<string>
): boolean {
  let words = new Array<string>();
  if ("words" in dynamicArgument) {
    words = dynamicArgument.words;
    guessedWords = dynamicArgument.guessedWords;
  } else {
    words = dynamicArgument;
  }

  guessedWords = guessedWords.map(guessedWord => guessedWord.toUpperCase());
  if (guessedWords.length === words.length) {
    for (let word of words) {
      if (!wasGuessed(word, guessedWords)) {
        return false;
      }
    }
    return true;
  }
  return false;
}

export default hasFinishedGame;

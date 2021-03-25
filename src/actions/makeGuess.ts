import { SpellingBeeGame } from "../types";
import checkGuess from "./checkGuess";

function makeGuess(
  word: string,
  letters: Array<string>,
  pivotLetter: string,
  min: number,
  words: Array<string>,
  guessedWords: Array<string>
): boolean;
function makeGuess(word: string, sb: SpellingBeeGame): boolean;

function makeGuess(
  word: string,
  dynamicArgument: Array<string> | SpellingBeeGame,
  pivotLetter?: string,
  min?: number,
  words?: Array<string>,
  guessedWords?: Array<string>
): boolean {
  let letters = new Array<string>();
  if ("letters" in dynamicArgument) {
    letters = dynamicArgument.letters;
    pivotLetter = dynamicArgument.pivotLetter;
    min = dynamicArgument.min;
    words = dynamicArgument.words;
    guessedWords = dynamicArgument.guessedWords;
  } else {
    letters = dynamicArgument;
  }

  try {
    if (checkGuess(word, letters, pivotLetter, min, words, guessedWords)) {
      guessedWords.push(word);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export default makeGuess;

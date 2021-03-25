import { SpellingBeeGame } from "../types";
import { isValidGuess } from "../validators";
import hasWord from "./hasWord";
import wasGuessed from "./wasGuessed";
import hasFinishedGame from "./hasFinishedGame";

function checkGuess(
  word: string,
  letters: Array<string>,
  pivotLetter: string,
  min: number,
  words: Array<string>,
  guessedWords: Array<string>
): boolean | never;
function checkGuess(word: string, sb: SpellingBeeGame): boolean | never;

function checkGuess(
  word: string,
  dynamicArgument: Array<string> | SpellingBeeGame,
  pivotLetter?: string,
  min?: number,
  words?: Array<string>,
  guessedWords?: Array<string>
): boolean | never {
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

  if (!hasFinishedGame(words, guessedWords)) {
    if (isValidGuess(word, letters, pivotLetter, min)) {
      if (!wasGuessed(word, guessedWords)) {
        if (hasWord(word, words)) {
          return true;
        }
        throw "Word not in list.";
      }
      throw "Already found.";
    }
    return false;
  }
  throw "Game finished.";
}

export default checkGuess;

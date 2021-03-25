import { SpellingBeeSetting } from "../types";
import hasPivotLetter from "./hasPivotLetter";
import hasValidSize from "./hasValidSize";
import isValidWord from "./isValidWord";

function isValidGuess(
  word: string,
  letters: Array<string>,
  pivotLetter: string,
  min: number
): boolean | never;

function isValidGuess(word: string, sb: SpellingBeeSetting): boolean | never;

function isValidGuess(
  word: string,
  dynamicArgument: Array<string> | SpellingBeeSetting,
  pivotLetter?: string,
  min?: number
): boolean | never {
  let letters = new Array<string>();
  if ("letters" in dynamicArgument) {
    letters = dynamicArgument.letters;
    pivotLetter = dynamicArgument.pivotLetter;
    min = dynamicArgument.min;
  } else {
    letters = dynamicArgument;
  }

  if (hasValidSize(word, min)) {
    if (isValidWord(word, letters)) {
      if (hasPivotLetter(word, pivotLetter)) {
        return true;
      }
      throw "Missing pivot letter.";
    }
    throw "Bad letters.";
  }
  throw "Too short.";
}

export default isValidGuess;

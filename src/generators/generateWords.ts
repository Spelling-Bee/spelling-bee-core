import { SpellingBeeSetting } from "../types";
import { hasValidSize, isValidWord, hasPivotLetter } from "../validators";

function generateWords(
  dictionary: Array<string>,
  letters: Array<string>,
  pivotLetter: string,
  min: number
): Array<string>;
function generateWords(setting: SpellingBeeSetting): Array<string>;

function generateWords(
  dynamicArgument: Array<string> | SpellingBeeSetting,
  letters?: Array<string>,
  pivotLetter?: string,
  min?: number
): Array<string> {
  let dictionary = new Array<string>();
  if ("dictionary" in dynamicArgument) {
    dictionary = dynamicArgument.dictionary;
    letters = dynamicArgument.letters;
    pivotLetter = dynamicArgument.pivotLetter;
    min = dynamicArgument.min;
  } else {
    dictionary = dynamicArgument;
  }
  return dictionary
    .filter(word => hasValidSize(word, min))
    .filter(word => hasPivotLetter(word, pivotLetter))
    .filter(word => isValidWord(word, letters));
}

export default generateWords;

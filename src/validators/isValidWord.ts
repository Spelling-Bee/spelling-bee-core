import { SpellingBeeSetting } from "../types";
function isValidWord(word: string, letters: Array<string>): boolean;
function isValidWord(word: string, setting: SpellingBeeSetting): boolean;

// Doesn't check for pivot letter, only for all letters
function isValidWord(
  word: string,
  dynamicArgument: Array<string> | SpellingBeeSetting
): boolean {
  let letters = new Array<string>();
  if ("letters" in dynamicArgument) {
    letters = dynamicArgument.letters;
  } else {
    letters = dynamicArgument;
  }

  letters = letters.map(letter => letter.toUpperCase());
  for (let i = 0; i < word.length; i++) {
    if (letters.indexOf(word.charAt(i).toUpperCase()) === -1) {
      return false;
    }
  }
  return true;
}

export default isValidWord;

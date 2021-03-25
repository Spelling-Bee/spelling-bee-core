import { SpellingBeeGame } from "../types";
import { containsWord } from "../helpers";

function hasWord(word: string, words: Array<string>): boolean;
function hasWord(word: string, sb: SpellingBeeGame): boolean;
function hasWord(
  word: string,
  dynamicArgument: Array<string> | SpellingBeeGame
): boolean {
  let words = new Array<string>();
  if ("words" in dynamicArgument) {
    words = dynamicArgument.words;
  } else {
    words = dynamicArgument;
  }
  return containsWord(word, words);
}

export default hasWord;

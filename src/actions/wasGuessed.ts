import { SpellingBeeGame } from "../types";
import { containsWord } from "../helpers";

function wasGuessed(word: string, guessedWords: Array<string>): boolean;
function wasGuessed(word: string, sb: SpellingBeeGame): boolean;
function wasGuessed(
  word: string,
  dynamicArgument: Array<string> | SpellingBeeGame
): boolean {
  let guessedWords = new Array<string>();
  if ("guessedWords" in dynamicArgument) {
    guessedWords = dynamicArgument.guessedWords;
  } else {
    guessedWords = dynamicArgument;
  }
  return containsWord(word, guessedWords);
}

export default wasGuessed;

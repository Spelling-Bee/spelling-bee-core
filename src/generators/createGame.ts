import { SpellingBeeSetting, SpellingBeeGame } from "../types";
import generateWords from "./generateWords";
import createId from "./createId";

function createGame(
  dictionary: Array<string>,
  letters: Array<string>,
  pivotLetter: string,
  min: number
): SpellingBeeGame;
function createGame(setting: SpellingBeeSetting): SpellingBeeGame;

function createGame(
  dynamicArgument: Array<string> | SpellingBeeSetting,
  letters?: Array<string>,
  pivotLetter?: string,
  min?: number
): SpellingBeeGame {
  let dictionary = new Array<string>();
  if ("dictionary" in dynamicArgument) {
    dictionary = dynamicArgument.dictionary;
    letters = dynamicArgument.letters;
    pivotLetter = dynamicArgument.pivotLetter;
    min = dynamicArgument.min;
  } else {
    dictionary = dynamicArgument;
  }

  return {
    id: createId(letters),
    dictionary,
    letters,
    pivotLetter,
    min,
    guessedWords: [],
    words: generateWords(dictionary, letters, pivotLetter, min)
  };
}

export default createGame;

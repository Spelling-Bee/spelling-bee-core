import { SpellingBeeSetting } from "../types";
function hasPivotLetter(word: string, pivotLetter: string): boolean;
function hasPivotLetter(word: string, setting: SpellingBeeSetting): boolean;
function hasPivotLetter(
  word: string,
  dynamicArgument: string | SpellingBeeSetting
): boolean {
  let pivotLetter = "";
  if (typeof dynamicArgument != "string" && "pivotLetter" in dynamicArgument) {
    pivotLetter = dynamicArgument.pivotLetter;
  } else {
    pivotLetter = dynamicArgument;
  }

  return word.toUpperCase().indexOf(pivotLetter.toUpperCase()) !== -1;
}

export default hasPivotLetter;

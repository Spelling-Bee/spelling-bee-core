import { SpellingBeeSetting } from "../types";
function createId(letters: Array<string>, pivotLetter: string, min: number);
function createId(setting: SpellingBeeSetting);

function createId(
  dynamicArgument: Array<string> | SpellingBeeSetting,
  pivotLetter?: string,
  min?: number
) {
  let letters = new Array<string>();
  if ("letters" in dynamicArgument) {
    letters = dynamicArgument.letters;
    pivotLetter = dynamicArgument.pivotLetter;
    min = dynamicArgument.min;
  } else {
    letters = dynamicArgument;
  }

  return min + "-" + pivotLetter + "-" + [...letters].sort().join("");
}

export default createId;

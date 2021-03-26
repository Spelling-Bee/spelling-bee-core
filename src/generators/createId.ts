import { SpellingBeeSetting } from "../types";
function createId(letters: Array<string>, pivotLetter: string);
function createId(setting: SpellingBeeSetting);

function createId(
  dynamicArgument: Array<string> | SpellingBeeSetting,
  pivotLetter?: string
) {
  let letters = new Array<string>();
  if ("letters" in dynamicArgument) {
    letters = dynamicArgument.letters;
    pivotLetter = dynamicArgument.pivotLetter;
  } else {
    letters = dynamicArgument;
    pivotLetter = pivotLetter;
  }

  return pivotLetter + "-" + [...letters].sort().join("");
}

export default createId;

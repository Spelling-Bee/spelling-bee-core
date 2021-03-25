import { SpellingBeeSetting } from "../types";
function createId(letters: Array<string>);
function createId(setting: SpellingBeeSetting);

function createId(dynamicArgument: Array<string> | SpellingBeeSetting) {
  let letters = new Array<string>();
  if ("letters" in dynamicArgument) {
    letters = dynamicArgument.letters;
  } else {
    letters = dynamicArgument;
  }

  return [...letters]
    .sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (b < a) {
        return -1;
      }
      return 0;
    })
    .join("");
}

export default createId;

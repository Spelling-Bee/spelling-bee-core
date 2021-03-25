import { SpellingBeeSetting } from "../types";
function hasValidSize(word: string, min: number): boolean;
function hasValidSize(word: string, setting: SpellingBeeSetting): boolean;

function hasValidSize(
  word: string,
  dynamicArgument: number | SpellingBeeSetting
): boolean {
  let min = dynamicArgument;
  if (typeof dynamicArgument != "number" && "min" in dynamicArgument) {
    min = dynamicArgument.min;
  }
  return min <= word.length;
}

export default hasValidSize;

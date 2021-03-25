export type SpellingBeeSetting = {
  dictionary: Array<string>;
  letters: Array<string>;
  pivotLetter: string;
  min: number;
};

export type SpellingBeeGame = {
  id: string;
  words: Array<string>;
  guessedWords: Array<string>;
} & SpellingBeeSetting;

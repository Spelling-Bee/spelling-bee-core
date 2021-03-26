export interface SpellingBeeSetting {
  dictionary: Array<string>;
  letters: Array<string>;
  pivotLetter: string;
  min: number;
}

export interface SpellingBeeGame extends SpellingBeeSetting {
  id: string;
  words: Array<string>;
  guessedWords: Array<string>;
}

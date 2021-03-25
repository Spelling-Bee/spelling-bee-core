function containsWord(word: string, words: Array<string>) {
  return (
    words.map(element => element.toUpperCase()).indexOf(word.toUpperCase()) !==
    -1
  );
}

export default containsWord;

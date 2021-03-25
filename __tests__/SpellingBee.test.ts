import SpellingBee from "../src/SpellingBee";

describe("Spelling Bee", () => {
  const setting = {
    dictionary: ["a", "b", "aa", "ab", "bb", "aaa", "aba", "bbb", "ac"],
    letters: ["a", "b"],
    pivotLetter: "a",
    min: 2
  };
  const sb = {
    ...setting,
    id: "ab",
    guessedWords: [],
    words: ["aa", "ab", "aaa", "aba"]
  };

  beforeEach(() => {
    sb.guessedWords = [];
  });

  describe("actions", () => {
    test("hasWord", () => {
      expect(SpellingBee.hasWord("bb", ["aa"])).toBeFalsy();
      expect(SpellingBee.hasWord("aa", ["aa"])).toBeTruthy();

      expect(SpellingBee.hasWord("bb", sb)).toBeFalsy();
      expect(SpellingBee.hasWord("aa", sb)).toBeTruthy();
    });

    test("wasGuessed", () => {
      expect(SpellingBee.wasGuessed("bb", ["aa"])).toBeFalsy();
      expect(SpellingBee.wasGuessed("aa", ["aa"])).toBeTruthy();

      SpellingBee.makeGuess("aa", sb);
      expect(SpellingBee.wasGuessed("bb", sb)).toBeFalsy();
      expect(SpellingBee.wasGuessed("ab", sb)).toBeFalsy();
      expect(SpellingBee.wasGuessed("aa", sb)).toBeTruthy();
    });

    test("hasFinishedGame", () => {
      expect(SpellingBee.hasFinishedGame(["a"], ["a"])).toBeTruthy();
      expect(SpellingBee.hasFinishedGame(["a"], ["b"])).toBeFalsy();
      expect(SpellingBee.hasFinishedGame(["a"], [""])).toBeFalsy();

      expect(SpellingBee.hasFinishedGame(sb)).toBeFalsy();

      SpellingBee.makeGuess("aa", sb);
      expect(SpellingBee.hasFinishedGame(sb)).toBeFalsy();

      SpellingBee.makeGuess("ab", sb);
      expect(SpellingBee.hasFinishedGame(sb)).toBeFalsy();

      SpellingBee.makeGuess("aaa", sb);
      expect(SpellingBee.hasFinishedGame(sb)).toBeFalsy();

      SpellingBee.makeGuess("aba", sb);
      expect(SpellingBee.hasFinishedGame(sb)).toBeTruthy();
    });

    test("checkGuess", () => {
      expect(() =>
        SpellingBee.checkGuess("a", ["a"], "a", 1, ["a"], [])
      ).toBeTruthy();
      expect(() =>
        SpellingBee.checkGuess("ab", ["a", "b"], "a", 1, ["a", "ab"], ["a"])
      ).toBeTruthy();
      expect(() =>
        SpellingBee.checkGuess("a", ["a"], "a", 1, ["a"], ["a"])
      ).toThrow("Game finished.");
      expect(() =>
        SpellingBee.checkGuess("a", ["a", "b"], "a", 1, ["a", "ab"], ["a"])
      ).toThrow("Already found.");
      expect(() =>
        SpellingBee.checkGuess("aaa", ["a", "b"], "a", 1, ["a", "ab"], ["a"])
      ).toThrow("Word not in list.");
      expect(() =>
        SpellingBee.checkGuess("a", ["a", "b"], "a", 2, ["aa", "ab"], ["a"])
      ).toThrow("Too short.");
      expect(() =>
        SpellingBee.checkGuess("c", ["a", "b"], "a", 1, ["aa", "ab"], ["a"])
      ).toThrow("Bad letters.");
      expect(() =>
        SpellingBee.checkGuess("bbb", ["a", "b"], "a", 1, ["aa", "ab"], ["a"])
      ).toThrow("Missing pivot letter.");

      expect(() => SpellingBee.checkGuess("aa", sb)).toBeTruthy();
      sb.guessedWords.push("aa");
      expect(() => SpellingBee.checkGuess("aa", sb)).toThrow("Already found.");

      expect(() => SpellingBee.checkGuess("a", sb)).toThrow("Too short.");
      expect(() => SpellingBee.checkGuess("bb", sb)).toThrow(
        "Missing pivot letter."
      );

      expect(() => SpellingBee.checkGuess("ab", sb)).toBeTruthy();
      sb.guessedWords.push("ab");
      expect(() => SpellingBee.checkGuess("aba", sb)).toBeTruthy();
      sb.guessedWords.push("aba");
      expect(() => SpellingBee.checkGuess("aaa", sb)).toBeTruthy();
      sb.guessedWords.push("aaa");

      expect(() => SpellingBee.checkGuess("aaa", sb)).toThrow("Game finished.");
    });

    test("makeGuess", () => {
      expect(SpellingBee.makeGuess("a", ["a"], "a", 1, ["a"], [])).toBeTruthy();
      expect(
        SpellingBee.makeGuess("ab", ["a", "b"], "a", 1, ["a", "ab"], ["a"])
      ).toBeTruthy();
      expect(
        SpellingBee.makeGuess("a", ["a"], "a", 1, ["a"], ["a"])
      ).toBeFalsy();
      expect(
        SpellingBee.makeGuess("a", ["a", "b"], "a", 1, ["a", "ab"], ["a"])
      ).toBeFalsy();

      expect(SpellingBee.makeGuess("aa", sb)).toBeTruthy();
      expect(SpellingBee.makeGuess("aa", sb)).toBeFalsy();

      expect(SpellingBee.makeGuess("a", sb)).toBeFalsy();
      expect(SpellingBee.makeGuess("bb", sb)).toBeFalsy();

      expect(SpellingBee.makeGuess("ab", sb)).toBeTruthy();
      expect(SpellingBee.makeGuess("aba", sb)).toBeTruthy();
      expect(SpellingBee.makeGuess("aaa", sb)).toBeTruthy();

      expect(SpellingBee.makeGuess("aaa", sb)).toBeFalsy();
    });
  });

  describe("generators", () => {
    test("createId", () => {
      expect(SpellingBee.createId(["a", "b"])).toEqual("ab");
      expect(SpellingBee.createId(["b", "a"])).toEqual("ab");
      expect(SpellingBee.createId(["b", "c", "a"])).toEqual("abc");
      expect(SpellingBee.createId(["a", "c", "a"])).toEqual("aac");
      expect(SpellingBee.createId(["a", "a", "a"])).toEqual("aaa");

      expect(SpellingBee.createId(setting)).toEqual("ab");
    });

    test("generateWords", () => {
      expect(
        SpellingBee.generateWords(
          ["a", "b", "aa", "bb", "ab", "cc"],
          ["a", "b"],
          "a",
          2
        )
      ).toEqual(["aa", "ab"]);

      expect(SpellingBee.generateWords(setting)).toEqual([
        "aa",
        "ab",
        "aaa",
        "aba"
      ]);
    });

    test("createGame", () => {
      expect(
        SpellingBee.createGame(
          ["a", "b", "aa", "bb", "ab", "cc"],
          ["a", "b"],
          "a",
          1
        )
      ).toEqual({
        id: "ab",
        dictionary: ["a", "b", "aa", "bb", "ab", "cc"],
        letters: ["a", "b"],
        pivotLetter: "a",
        min: 1,
        guessedWords: [],
        words: ["a", "aa", "ab"]
      });

      expect(SpellingBee.createGame(setting)).toEqual(sb);
    });
  });

  describe("validators", () => {
    test("hasPivotLetter", () => {
      expect(SpellingBee.hasPivotLetter("z", "")).toBeTruthy();

      expect(SpellingBee.hasPivotLetter("aa", "a")).toBeTruthy();
      expect(SpellingBee.hasPivotLetter("bb", "a")).toBeFalsy();

      expect(SpellingBee.hasPivotLetter("aa", setting)).toBeTruthy();
      expect(SpellingBee.hasPivotLetter("bb", setting)).toBeFalsy();
    });

    test("hasValidSize", () => {
      expect(SpellingBee.hasValidSize("a", 2)).toBeFalsy();
      expect(SpellingBee.hasValidSize("a", 1)).toBeTruthy();
      expect(SpellingBee.hasValidSize("aa", 2)).toBeTruthy();

      expect(SpellingBee.hasValidSize("a", setting)).toBeFalsy();
      expect(SpellingBee.hasValidSize("aa", setting)).toBeTruthy();
    });

    test("isValidWord", () => {
      // Doesn't check for pivot Letter
      expect(SpellingBee.isValidWord("a", ["a"])).toBeTruthy();
      expect(SpellingBee.isValidWord("b", ["a"])).toBeFalsy();

      expect(SpellingBee.isValidWord("a", setting)).toBeTruthy();
      expect(SpellingBee.isValidWord("c", setting)).toBeFalsy();
    });

    test("isValidGuess", () => {
      expect(() => SpellingBee.isValidGuess("a", ["a"], "a", 1)).toBeTruthy();
      expect(() =>
        SpellingBee.isValidGuess("aa", ["a", "b"], "a", 2)
      ).toBeTruthy();
      expect(() => SpellingBee.isValidGuess("a", ["a", "b"], "a", 2)).toThrow(
        "Too short."
      );
      expect(() => SpellingBee.isValidGuess("c", ["a", "b"], "a", 1)).toThrow(
        "Bad letters."
      );
      expect(() => SpellingBee.isValidGuess("bb", ["a", "b"], "a", 2)).toThrow(
        "Missing pivot letter."
      );

      expect(() => SpellingBee.isValidGuess("aa", setting)).toBeTruthy();
      expect(() => SpellingBee.isValidGuess("a", setting)).toThrow(
        "Too short."
      );
      expect(() => SpellingBee.isValidGuess("cf", setting)).toThrow(
        "Bad letters."
      );
      expect(() => SpellingBee.isValidGuess("bb", setting)).toThrow(
        "Missing pivot letter."
      );
    });
  });
});

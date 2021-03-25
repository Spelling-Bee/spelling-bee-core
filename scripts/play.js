#! /usr/bin/env node
var readline = require("readline");
var SpellingBee = require("../").default;

var yargs = require("yargs");

function requiredOptions(yargs, argv) {
  return yargs
    .example(
      "$0 --d=foo.json --p=a --min=4 --l=a,b,c,d,e,f,g",
      "Starts the game"
    )
    .alias("d", "dictionary")
    .nargs("d", 1)
    .describe("d", "Load a dictionary")
    .alias("p", "pivotLetter")
    .nargs("p", 1)
    .describe("p", "Pivot letter")
    .alias("min", "minimum")
    .nargs("min", 1)
    .describe("min", "Minimum number of letters")
    .alias("l", "letters")
    .describe("l", "Allowed letters")
    .demandOption(["d", "p", "min", "l"]).argv;
}

function createGameFromCommandLine(argv) {
  return SpellingBee.createGame(
    require("../" + argv.d),
    argv.l.split(","),
    argv.p,
    parseInt(argv.min)
  );
}

function makeGuess(guess, sb) {
  try {
    if (SpellingBee.checkGuess(guess, sb)) {
      SpellingBee.makeGuess(guess, sb);
      console.log(guess, "was a correct guess.");
    }
  } catch (error) {
    console.log(error);
  }
  console.log("--------------------");
}

function play(yargs, argv) {
  argv = requiredOptions(yargs, argv);
  var sb = createGameFromCommandLine(argv);

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function prompt() {
    rl.question("Make a guess: \n", (guess) => {
      makeGuess(guess, sb);
      prompt();
    });
  }
  prompt();
}

var argv = yargs
  .usage("Usage: $0 <command> [options]")
  .command("$0", "Starts a new Spelling Bee Game", function (yargs) {
    play(yargs, argv);
  })
  .help("h")
  .alias("h", "help")
  .wrap(null)
  .epilog("copyright 2021").argv;

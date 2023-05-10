const fs = require("fs");

const convertFromTxt = (from, to) =>
  fs.readFile(from, "utf8", (err, data) => {
    if (err) console.error(err);

    fs.writeFile(
      to,
      JSON.stringify({
        dictionary: data
          .split(",")
          .filter((word) => word && word[0] !== word[0].toUpperCase()),
      }),
      () => {}
    );
  });

convertFromTxt(
  "./AliasDictionaries/dictionaryEasy.txt",
  "./src/api/dictionaries/dictionaryEasy.json"
);
convertFromTxt(
  "./AliasDictionaries/dictionaryMedium.txt",
  "./src/api/dictionaries/dictionaryMedium.json"
);
convertFromTxt(
  "./AliasDictionaries/dictionaryHard.txt",
  "./src/api/dictionaries/dictionaryHard.json"
);

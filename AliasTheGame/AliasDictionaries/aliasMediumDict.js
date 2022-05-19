const puppeteer = require("puppeteer");
const userAgent = require("user-agents");
const fs = require("fs");

async function fetchProductList(url) {
  let startTime = Date.now();
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const packSize = 100000;
  const quantWords = 200;
  const wordDelay = 700;

  const wordList = new Set();

  const page = await browser.newPage();
  await page.setUserAgent(userAgent.toString());
  await page.goto(url, { waitUntil: "networkidle2" });

  for (let i = 0; i < packSize / quantWords; i++) {
    let time1 = Date.now();

    await page.waitForSelector("#quant_words");
    await page.evaluate(
      (val) => (document.querySelector("#quant_words").value = val),
      quantWords
    );

    await page.waitForSelector("input.btn-primary");
    await page.click("input.btn-primary");

    await page.waitForSelector("#element_list>li>span");
    const newWords = await page.evaluate(() =>
      [...document.querySelectorAll("#element_list>li>span")].map(
        (item) => item.textContent
      )
    );

    newWords.forEach((item) => wordList.add(item));
    console.log(
      `${i + 1}/${packSize / quantWords}`,
      "time for pack: ",
      Date.now() - time1,
      "ms"
    );
    await page.click("input.btn-primary", { delay: wordDelay });
  }

  await browser.close();
  console.log(wordList.size);

  fs.readFile("dictionaryMedium.txt", "utf8", (err, data) => {
    if (err) console.error(err);

    const prevWords = data.split(",");
    console.log("was in file:", prevWords.length);
    console.log(prevWords);

    for (const index in prevWords) {
      wordList.add(prevWords[index]);
    }

    const newWordList = Array.from(wordList);
    console.log("now in file:", newWordList.length);
    console.log(newWordList);

    fs.writeFile("dictionaryMedium.txt", newWordList.join(","), () => {
      console.log("meant to be", packSize);
      console.log("actually", newWordList.length - prevWords.length);
      console.log("Time: ", (Date.now() - startTime) / 1000, "s");
    });
  });
}

fetchProductList("https://teoset.com/word-generator#element_list");

const puppeteer = require("puppeteer");
const userAgent = require("user-agents");
const fs = require("fs");

async function fetchProductList(url) {
  let startTime = Date.now();
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const packSize = 10000;
  const wordDelay = 50;
  const page = await browser.newPage();
  await page.setUserAgent(userAgent.toString());
  await page.goto(url, { waitUntil: "networkidle2" });

  await page.waitForSelector('input[value="1"]');
  await page.click('input[value="1"]');
  await page.waitForSelector('button[class="btn btn-success"]');
  await page.click('button[class="btn btn-success"]');

  const wordList = new Set();
  const resultElement = await page.waitForSelector("#result");

  await page.waitForSelector('button[class="btn btn-success"]');
  for (let i = 0; i < packSize; i++) {
    let time1 = Date.now();

    resultElement
      .evaluate((el) => el.textContent, resultElement)
      .then((word) => {
        wordList.add(word);
      });
    console.log("time for word: ", Date.now() - time1, "ms");
    await page.click('button[class="btn btn-success"]', { delay: wordDelay });
  }

  await browser.close();
  console.log(wordList);

  fs.readFile("dictionaryEasy.txt", "utf8", (err, data) => {
    if (err) console.error(err);

    const prevWords = data.split(",");
    console.log(`was in file: (${prevWords.length})`);
    console.log(prevWords);

    for (const index in prevWords) {
      wordList.add(prevWords[index]);
    }

    const newWordList = Array.from(wordList);
    console.log(`now in file: (${newWordList.length})`);
    console.log(newWordList);

    fs.writeFile("dictionaryEasy.txt", newWordList.join(","), () => {
      console.log(packSize);
      console.log(newWordList.length - packSize);
      console.log("Time: ", (Date.now() - startTime) / 1000, "s");
    });
  });
}

fetchProductList("http://free-generator.ru/words.html");

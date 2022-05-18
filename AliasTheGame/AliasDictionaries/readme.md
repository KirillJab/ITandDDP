# Here we get the dictionaries for our game using puppeteer.

Due to the fact, that I couldn't find any api to get russian nouns for the app, I developed the way, to parse them directly from such online generators, that have their one db full of words.

### Setup and Gathering dictionaries.

1. Run `npm install`
2. - To Get the Easy dictionary run `npm run get:EasyDictionary`
   - To Get the Medium dictionary run `npm run get:MediumDictionary`
   - To Get the Hard dictionary run `npm run get:HardDictionary`

Dictionaries will be presented in according text files, with each word divided by comma.

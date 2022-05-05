export const getPoints = (swipedWords, shouldCountLastWord) =>
  swipedWords.reduce(
    (result, word) => (result += word.guessed ? 1 : -1),
    shouldCountLastWord ? 0 : -1
  );

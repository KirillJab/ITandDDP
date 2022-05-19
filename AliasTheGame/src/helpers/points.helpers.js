export const getPoints = (
  swipedWords,
  isLastWordForAll,
  shouldCountLastWord
) => {
  return swipedWords.reduce(
    (result, word) => (result += word.guessed ? 1 : -1),
    isLastWordForAll && !shouldCountLastWord ? -1 : 0
  );
};

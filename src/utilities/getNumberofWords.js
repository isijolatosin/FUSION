function getNumberofWords(sentence) {
  const trimmedSentence = sentence.trim();
  const wordsArray = trimmedSentence.split(/\s+/);
  return wordsArray.length;
}

export { getNumberofWords };

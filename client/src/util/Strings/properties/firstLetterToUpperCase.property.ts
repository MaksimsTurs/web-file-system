export default function firstLetterToUpperCase(words: string | string[]): string | string[] {
  if(Array.isArray(words)) return processWords(words)
  else return processWord(words)
}

function processWord(word: string): string {
  return `${word[0].toUpperCase()}${word.slice(1, word.length)}`
}

function processWords(words: string[]): string[] {
  let processedWords: string[] = []

  for(let index: number = 0; index < words.length; index++) processedWords.push(processWord(words[index]))

  return processedWords
}
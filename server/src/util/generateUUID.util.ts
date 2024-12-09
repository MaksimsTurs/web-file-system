export default function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const randNumber: number = Math.random() * 16 | 0
    const value: number = char === 'x' ? randNumber : (randNumber & 0x3 | 0x8)
    return value.toString(16)
  });
}
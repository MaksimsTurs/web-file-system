export default function joinPath(strings: string[]): string {
  return strings.length === 1 ? strings.at(0) || '' : strings.join('\\')
}
export type ArrayUtil = {
  include: (what: any[], inArrayOf: any[]) => boolean
  countDuplicates: <T>(inArray: any[], find: (keyof T)[]) => Record<keyof T, number>
  removeDuplicates: (fromArray: any[], duplicates: any[]) => any[]
}
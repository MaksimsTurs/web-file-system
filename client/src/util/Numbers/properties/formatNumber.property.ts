import type { FormatNumberUnits, FormatNumberOptions } from "../Numbers.type";

export default function formatNumber(num: number, options?: FormatNumberOptions): string {
  if(options?.nullsCount) return processNulls(num, options.nullsCount)
  if(options?.unit) return processUnit(num, options.unit)

  return num.toFixed(2)
}

function processNulls(num: number, nullsCount: number): string {
  let processedNum: string[] = Array.from(num.toString())

  if(processedNum.length >= nullsCount) return num.toString()
    
  for(let index: number = 0; index < nullsCount; index++) {
    if(!processedNum[index]) processedNum.unshift('0')
  }
    
  return processedNum.join('')
}

function processUnit(num: number, unit: keyof typeof FormatNumberUnits): string {
  switch(unit) {
    case 'DATA_UNIT':
      const DATA_UNIT_KEYS: string[] = ['Bytes', 'KiB', 'MiB', 'GiB']

      let unitKeyIndex: number = 0, processedNum = num

      while(processedNum >= 1024) {
        processedNum = processedNum / 1024
        unitKeyIndex++
      }

      return `${processedNum.toFixed(2)}${DATA_UNIT_KEYS[unitKeyIndex]}`
  }
}
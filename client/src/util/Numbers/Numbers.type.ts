export type NumbersUtil = {
  formatNumber: (num: number, options: FormatNumberOptions) => string
}

export type FormatNumberOptions = {
  unit?: keyof typeof FormatNumberUnits
  nullsCount?: number
}

export enum FormatNumberUnits {
  DATA_UNIT = 'DATA_UNIT'
}
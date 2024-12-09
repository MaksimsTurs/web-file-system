export type TFormatNumberOptions = {
  unit?: keyof typeof EFormatNumberUnits
  nullsCount?: number
}

export enum EFormatNumberUnits {
  DATA_UNIT = 'DATA_UNIT'
}
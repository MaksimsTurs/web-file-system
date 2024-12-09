import scss from '../scss/itemInformationMenu.module.scss'
import '@/scss/global.scss'

import type { ItemInformationMenuProps } from "../page.type";

import Numbers from '@/util/Numbers/Numbers.util';

export default function ItemInformationMenu({ item }: ItemInformationMenuProps) {
  return(
    <div className={`${scss.item_side_menu_container}`}>
      <div className={scss.item_side_menu_body}>
        <p className={scss.item_side_menu_title}>Information</p>
        <div className={`${scss.item_information_container} flex-row-center-space-between-big`}>
          <p>Name:</p>
          <p>{item.name}</p>
        </div>
        <div className={`${scss.item_information_container} flex-row-center-space-between-big`}>
          <p>Full path:</p>
          <p>{item.fullPath}</p>
        </div>
        <div className={`${scss.item_information_container} flex-row-center-space-between-big`}>
          <p>Size:</p>
          <p>{Numbers.formatNumber(item.size || 0, { unit: 'DATA_UNIT' })}</p>
        </div>
        <div className={`${scss.item_information_container} flex-row-center-space-between-big`}>
          <p>Dimension:</p>
          <p>{item.dimension?.height} x {item.dimension?.width}</p>
        </div>
      </div>
    </div>
  )
}
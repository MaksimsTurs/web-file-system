import scss from './selectInput.module.scss'

import { type PropsWithChildren, type ReactNode, useEffect, useRef, useState } from "react";

import type { UseSelectProps } from './selectInput.type';
import type { FieldValues } from 'react-hook-form';

import InputError from '../input-error/inputError.component';

export default function useSelect<T extends FieldValues>({ defaultValue, isMultiple, placeholder, title }: UseSelectProps<T>) {
  const [selected, setSelected] = useState<string[]>(defaultValue || []),
        [isExpanded, setExpanded] = useState<boolean>(false),
        [selectedChildren, setSelectedChildren] = useState<ReactNode | undefined>(undefined),
        [error, setError] = useState<string | undefined>(),
        listExpandButton = useRef<HTMLLIElement>(null)

  const listSelectedItemClass: string = `${isExpanded ? scss.list_container_no_border_radius : ''} ${scss.list_selected_item}`,
        listBodyClass: string = `${isExpanded ? scss.list_body_visible : ''} ${scss.list_body}`

  const selectItem = (value: string, children: ReactNode, onClick?: any) => {
    setSelected(prev => {
      if(prev.includes(value)) return prev.filter(curr => curr !== value)
      else if(!isMultiple)     return [value]
      else                     return [...prev, value]
    })

    setSelectedChildren(prev => {
      if(prev?.toString() === children?.toString()) return undefined
      else                                          return children
    })

    onClick && onClick(value)
  }

  const isSelected = (value: string) => {
    return selected.includes(value)
  }

  useEffect(() => {
    const closeList = (event: any) => {
      if(event.target === listExpandButton.current) {
        setExpanded(prev => !prev)
      } else {
        setExpanded(false)
      }
    }

    document.addEventListener('click', closeList)
  }, [])
  
  return {
    selected,
    setError,
    clear: function() {
      setSelected([])
      setSelectedChildren(undefined)
    },
    List: function({ children }: PropsWithChildren) {
      return(
        <div>
          {title && <p>{title}</p>}
          <ul className={scss.list_container}>
            <li ref={listExpandButton} className={listSelectedItemClass}>{selectedChildren || placeholder}</li>
            <InputError error={error}/>
            <div className={listBodyClass}>
              {children}
            </div>
          </ul>
        </div>
      )
    },
    Item: function({ children, value, onClick }: PropsWithChildren<{ value: string, onClick?: (value: string) => any }>) {
      return(
        <li className={isSelected(value) ? scss.list_body_item_selected : ''} onClick={() => selectItem(value, children, onClick)}>
          {children}
        </li>
      )
    }
  }
}
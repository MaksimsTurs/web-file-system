import type { KeyValueObject } from "@/global.type"
import type { CoockieUtil } from "./Coockie.type"

const Coockie: CoockieUtil = {
  getOne: function(key) {
    return parse()[key]
  },
  setOne: function(key, value) {
    document.cookie = `${key}=${value};Path=/;Max-Age=${60 * 60 * 24 * 7};`
  }
}

function parse(): KeyValueObject {
  let coockies = {}
  
  document.cookie.split(/\;/).forEach(coockie => {
    const [key, value] = coockie.split(/\=/)
    coockies = {...coockies, [key.trim()]: value }
  })

  return coockies
}

export default Coockie
import chalk from 'chalk'

import type { Console } from './Console.type'

import { ConsoleLogLevel  } from './Console.type'

const Console: Console = {
  info: function(text, object) {
    text = `${getLogLeveleTimeColor(ConsoleLogLevel.INFO, getLocaleLogTimeString())} - ${colorizeLogText(text)}`
    console.info(text, object || '')
  },
  error: function(text, object) {
    text = `${getLogLeveleTimeColor(ConsoleLogLevel.ERROR, getLocaleLogTimeString())} - ${colorizeLogText(text)}`
    console.info(text, object || '')
  }
}

const getLocaleLogTimeString = (): string => {
  return new Date().toLocaleTimeString()
}

const getLogLeveleTimeColor = (logLevel: ConsoleLogLevel, timeText: string): string => {
  switch(logLevel) {
    case 'ERROR':
      return `${chalk.redBright(timeText)}`
    case 'INFO':
      return `${chalk.blueBright(timeText)}`
    default: 
      return timeText
  }
}

const colorizeLogText = (text: string): string => {
  return text.replace(/([0-9]+)/g, `${chalk.yellowBright('$1')}`).replace(/"([^"]*)"/g, `${chalk.greenBright('$1')}`)
}

export default Console
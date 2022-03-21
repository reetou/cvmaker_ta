import debug from 'debug'

class Logger {
  static log(namespace: string, ...args: any[]) {
    // eslint-disable-next-line prefer-spread
    debug(`cvmaker:${namespace}`).apply(null, args as any)
  }
}

export default Logger

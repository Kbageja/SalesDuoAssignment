class Logger {
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  static info(message: string, ...args: any[]): void {
    console.log(`[${this.getTimestamp()}] INFO:`, message, ...args);
  }

  static error(message: string, error?: any): void {
    console.error(`[${this.getTimestamp()}] ERROR:`, message, error || '');
  }

  static warn(message: string, ...args: any[]): void {
    console.warn(`[${this.getTimestamp()}] WARN:`, message, ...args);
  }

  static debug(message: string, ...args: any[]): void {
    console.debug(`[${this.getTimestamp()}] DEBUG:`, message, ...args);
  }
}

export { Logger };
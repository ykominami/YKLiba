// Import required classes
// Arrayx class for array operations

class Log {
  // static log_level
  // UNKNOWN(6)
  // 常に記録されるべき不明なエラー
  //
  // FATAL(5)
  // プログラムをクラッシュさせるような制御不可能なエラー
  //
  // ERROR(4)
  // 制御可能なエラー
  //
  // WARN(3)
  // 警告
  //
  // INFO(2)
  // 一般的な情報
  //
  // DEBUG(1)
  // 低レベルの情報  // DEBUG=

  /**
   * Returns the log level for unknown messages.
   * @returns {number} Log level for unknown messages.
   */
  static UNKNOWN() { return 6; }

  /**
   * Returns the log level for fault messages.
   * @returns {number} Log level for fault messages.
   */
  static FAULT() { return 5; }

  /**
   * Returns the log level for error messages.
   * @returns {number} Log level for error messages.
   */
  static ERROR() { return 4; }

  /**
   * Returns the log level for warnings.
   * @returns {number} Log level for warnings.
   */
  static WARN() { return 3; }

  /**
   * Returns the log level for informational messages.
   * @returns {number} Log level for informational messages.
   */
  static INFO() { return 2; }

  /**
   * Returns the log level for debug messages.
   * @returns {number} Log level for debug messages.
   */
  static DEBUG() { return 1; }

  /**
   * Sets the current log level.
   * @param {number} level - The log level to set.
   */
  static setLogLevel(level) {
    Log.logLevel = level;
  }

  /**
   * Returns the current log level.
   * @returns {number} The current log level.
   */
  static logLevel() {
    return Log.logLevel;
  }

  /**
   * Returns the current log level.
   * @returns {number} The current log level.
   */
  static getLogLevel() {
    return Log.logLevel;
  }

  /**
   * Logs the contents of a 2D array if the log level is set to debug.
   * @param {string} name - The name to display in the log.
   * @param {Array} array - The 2D array to log.
   */
  static debugArray(name, array) {
    const ret = Arrayx.isValid2dArray(array);
    if (ret[0] !== true) {
      return;
    }
    if (Log.getLogLevel() <= Log.DEBUG()) {
      console.error(`${name}`);
      array.map((item) => console.error(item));
    }
  }

  /**
   * Logs a debug message if the log level is set to debug.
   * @param {string} mes - The message to log.
   */
  static debug(mes) {
    if (Log.getLogLevel() <= Log.DEBUG()) {
      console.error(mes);
    }
  }

  /**
   * Logs a debug message with a name and value if the log level is set to debug.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static debugX(name, value) {
    if (Log.getLogLevel() <= Log.DEBUG()) {
      console.error(`${name}`);
      console.error(value);
    }
  }

  /**
   * Logs a debug message with a name and value if the log level is set to debug.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static debug1(name, value) {
    if (Log.getLogLevel() <= Log.DEBUG()) {
      console.error(`${name}=${value}`);
    }
  }

  /**
   * Logs a debug message with two names and values if the log level is set to debug.
   * @param {string} name - The first name to display in the log.
   * @param {*} value - The first value to display in the log.
   * @param {string} name2 - The second name to display in the log.
   * @param {*} value2 - The second value to display in the log.
   */
  static debug2(name, value, name2, value2) {
    if (Log.getLogLevel() <= Log.DEBUG()) {
      console.error(`${name}=${value} ${name2}=${value2}`);
    }
  }

  /**
   * Logs the contents of a 2D array if the log level is set to info.
   * @param {string} name - The name to display in the log.
   * @param {Array} array - The 2D array to log.
   */
  static infoArray(name, array) {
    if (Log.getLogLevel() <= Log.INFO()) {
      console.info(`${name}`);
      array.map((item) => console.info(item));
    }
  }

  /**
   * Logs an informational message if the log level is set to info.
   * @param {string} mes - The message to log.
   */
  static info(mes) {
    if (Log.getLogLevel() <= Log.INFO()) {
      console.info(mes);
    }
  }

  /**
   * Logs an informational message with a name and value if the log level is set to info.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static infoX(name, value) {
    if (Log.getLogLevel() <= Log.INFO()) {
      console.info(`${name}`);
      console.info(value);
    }
  }

  /**
   * Logs an informational message with a name and value if the log level is set to info.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static info1(name, value) {
    if (Log.getLogLevel() <= Log.INFO()) {
      console.info(`${name}=${value}`);
    }
  }

  /**
   * Logs an informational message with two names and values if the log level is set to info.
   * @param {string} name - The first name to display in the log.
   * @param {*} value - The first value to display in the log.
   * @param {string} name2 - The second name to display in the log.
   * @param {*} value2 - The second value to display in the log.
   */
  static info2(name, value, name2, value2) {
    if (Log.getLogLevel() <= Log.INFO()) {
      console.info(`${name}=${value} ${name2}=${value2}`);
    }
  }

  /**
   * Logs the contents of a 2D array if the log level is set to warn.
   * @param {string} name - The name to display in the log.
   * @param {Array} array - The 2D array to log.
   */
  static warn_array(name, array) {
    if (Log.getLogLevel() <= Log.WARN()) {
      console.warn(`${name}`);
      array.map((item) => console.warn(item));
    }
  }

  /**
   * Logs a warning message if the log level is set to warn.
   * @param {string} mes - The message to log.
   */
  static warn(mes) {
    if (Log.getLogLevel() <= Log.WARN()) {
      console.warn(mes);
    }
  }

  /**
   * Logs a warning message with a name and value if the log level is set to warn.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static warnX(name, value) {
    if (Log.getLogLevel() <= Log.WARN()) {
      console.warn(`${name}`);
      console.warn(value);
    }
  }

  /**
   * Logs a warning message with a name and value if the log level is set to warn.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static warn1(name, value) {
    if (Log.getLogLevel() <= Log.WARN()) {
      console.warn(`${name}=${value}`);
    }
  }

  /**
   * Logs a warning message with two names and values if the log level is set to warn.
   * @param {string} name - The first name to display in the log.
   * @param {*} value - The first value to display in the log.
   * @param {string} name2 - The second name to display in the log.
   * @param {*} value2 - The second value to display in the log.
   */
  static warn2(name, value, name2, value2) {
    if (Log.getLogLevel() <= Log.WARN()) {
      console.warn(`${name}=${value} ${name2}=${value2}`);
    }
  }

  /**
   * Logs the contents of a 2D array if the log level is set to error.
   * @param {string} name - The name to display in the log.
   * @param {Array} array - The 2D array to log.
   */
  static errorArray(name, array) {
    if (Log.getLogLevel() <= Log.ERROR()) {
      Log.error(`${name}`);
      array.map((item) => console.error(item));
    }
  }

  /**
   * Logs an error message if the log level is set to error.
   * @param {string} mes - The message to log.
   */
  static error(mes) {
    if (Log.getLogLevel() <= Log.ERROR()) {
      console.error(mes);
    }
  }

  /**
   * Logs an error message with a name and value if the log level is set to error.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static errorX(name, value) {
    if (Log.getLogLevel() <= Log.ERROR()) {
      console.error(`${name}`);
      console.error(value);
    }
  }

  /**
   * Logs an error message with a name and value if the log level is set to error.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static error1(name, value) {
    if (Log.getLogLevel() <= Log.ERROR()) {
      console.error(`${name}=${value}`);
    }
  }

  /**
   * Logs an error message with two names and values if the log level is set to error.
   * @param {string} name - The first name to display in the log.
   * @param {*} value - The first value to display in the log.
   * @param {string} name2 - The second name to display in the log.
   * @param {*} value2 - The second value to display in the log.
   */
  static error2(name, value, name2, value2) {
    if (Log.getLogLevel() <= Log.ERROR()) {
      console.error(`${name}=${value} ${name2}=${value2}`);
    }
  }

  /**
   * Logs the contents of a 2D array if the log level is set to fault.
   * @param {string} name - The name to display in the log.
   * @param {Array} array - The 2D array to log.
   */
  static faultArray(name, array) {
    if (Log.getLogLevel() <= Log.FAULT()) {
      console.error(`${name}`);
      array.map((item) => console.error(item));
    }
  }

  /**
   * Logs a fault message if the log level is set to fault.
   * @param {string} mes - The message to log.
   */
  static fault(mes) {
    if (Log.getLogLevel() <= Log.FAULT()) {
      console.error(mes);
    }
  }

  /**
   * Logs a fault message with a name and value if the log level is set to fault.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static faultX(name, value) {
    if (Log.getLogLevel() <= Log.FAULT()) {
      console.error(`${name}`);
      console.error(value);
    }
  }

  /**
   * Logs a fault message with a name and value if the log level is set to fault.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static fault1(name, value) {
    if (Log.getLogLevel() <= Log.FAULT()) {
      console.error(`${name}=${value}`);
    }
  }

  /**
   * Logs a fault message with two names and values if the log level is set to fault.
   * @param {string} name - The first name to display in the log.
   * @param {*} value - The first value to display in the log.
   * @param {string} name2 - The second name to display in the log.
   * @param {*} value2 - The second value to display in the log.
   */
  static fault2(name, value, name2, value2) {
    if (Log.getLogLevel() <= Log.FAULT()) {
      console.error(`${name}=${value} ${name2}=${value2}`);
    }
  }

  /**
   * Logs the contents of a 2D array if the log level is set to unknown.
   * @param {string} name - The name to display in the log.
   * @param {Array} array - The 2D array to log.
   */
  static unknownArray(name, array) {
    if (Log.getLogLevel() <= Log.UNKNOWN()) {
      console.error(`${name}`);
      array.map((item) => console.error(item));
    }
  }

  /**
   * Logs an unknown message if the log level is set to unknown.
   * @param {string} mes - The message to log.
   */
  static unknown(mes) {
    if (Log.getLogLevel() <= Log.UNKNOWN()) {
      console.error(mes);
    }
  }

  /**
   * Logs an unknown message with a name and value if the log level is set to unknown.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static unknownX(name, value) {
    if (Log.getLogLevel() <= Log.UNKNOWN()) {
      console.error(`${name}`);
      console.error(value);
    }
  }

  /**
   * Logs an unknown message with a name and value if the log level is set to unknown.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static unknown1(name, value) {
    if (Log.getLogLevel() <= Log.UNKNOWN()) {
      console.error(`${name}=${value}`);
    }
  }

  /**
   * Logs an unknown message with two names and values if the log level is set to unknown.
   * @param {string} name - The first name to display in the log.
   * @param {*} value - The first value to display in the log.
   * @param {string} name2 - The second name to display in the log.
   * @param {*} value2 - The second value to display in the log.
   */
  static unknown2(name, value, name2, value2) {
    if (Log.getLogLevel() <= Log.UNKNOWN()) {
      console.error(`${name}=${value} ${name2}=${value2}`);
    }
  }

  /**
   * Logs the contents of a 2D array if the log level is set to debug.
   * @param {Array} array - The 2D array to log.
   * @param {string} name - The name to display in the log.
   */
  static displayxArray(array, name) {
    console.log(`${name}`);
    array.map((item) => console.log(item));
  }

  /**
   * Logs a debug message with a value and name if the log level is set to debug.
   * @param {*} value - The value to display in the log.
   * @param {string} name - The name to display in the log.
   */
  static displayX(value, name) {
    console.log(`${name}`)
    console.log(value);
  }

  /**
   * Displays a message in the console log.
   * @param {string} message - The message to display.
   */
  static displayLog(message) {
    Log.display(message, 'CUI', true);
  }

  /**
   * Displays a message as an alert dialog.
   * @param {string} message - The message to display.
   */
  static displayAlert(message) {
    Log.display(message, 'GUI', true);
  }

  /**
   * Displays a message based on the specified kind and mode.
   * @param {string} message - The message to display.
   * @param {string} kind - The display kind ('GUI' for alert, 'CUI' for console).
   * @param {boolean} mode - Whether to display the message (true to display, false to skip).
   */
  static display(message, kind, mode) {
    if (mode != true) {
      return;
    }
    if (kind == 'GUI') {
      const ui = SpreadsheetApp.getUi();
      ui.alert(message);
    } else {
      console.log(message);
    }
  }

  /**
   * Tests various console logging methods.
   */
  static testConsole() {
    console.info('INFO')
    console.log('LOG')
    console.warn('WARN')
    console.error('ERROR')
    //console.debug('DEBUG')
    //console.fatal('FATAL')
  }
}
this.Log = Log;

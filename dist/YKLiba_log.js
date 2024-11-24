class Util {
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
  static UNKNOWN(){ return 6}
  static FAULT(){ return 5}
  static ERROR(){ return 4}

  /**
   * Returns the log level for warnings.
   * @returns {number} Log level for warnings.
   */
  static WARN(){ return 3}

  /**
   * Returns the log level for informational messages.
   * @returns {number} Log level for informational messages.
   */
  static INFO(){ return 2}

  /**
   * Returns the log level for debug messages.
   * @returns {number} Log level for debug messages.
   */
  static DEBUG(){ return 1}

  /**
   * Sets the current log level.
   * @param {number} level - The log level to set.
   */
  static set_log_level(level){
    Log.log_level = level
  }

  /**
   * Returns the current log level.
   * @returns {number} The current log level.
   */
  static log_level(){
    return Log.log_level
  }

  /**
   * Returns the current log level.
   * @returns {number} The current log level.
   */
  static get_log_level(){
    return Log.log_level
  }

  /**
   * Logs the contents of a 2D array if the log level is set to debug.
   * @param {string} name - The name to display in the log.
   * @param {Array} array - The 2D array to log.
   */
  static debug_array(name, array){
    const ret = is_valid_2d_array(array)
    if( ret[0] !== true){
      return
    }
    if( Log.get_log_level() <= Log.DEBUG() ){
      Log.debug(`${name}`)
      array.map( item => Log.debug(item));
    }
  }

    /**
     * Logs a debug message if the log level is set to debug.
     * @param {string} mes - The message to log.
     */
    static debug(mes){
      Log.display_log(`debug ${mes}`)
      if( Log.get_log_level() <= Log.DEBUG() ){
        Log.display_log(mes)
      }
    }

  /**
   * Logs a debug message with a name and value if the log level is set to debug.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static debug_x(name, value){
    if( Log.get_log_level() <= Log.DEBUG() ){
      Log.display_log(`${name}`)
      Log.display_log( value )
    }
  }

  /**
   * Logs a debug message with a name and value if the log level is set to debug.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static debug_1(name, value){
    if( Log.get_log_level() <= Log.DEBUG() ){
      Log.display_log(`${name}=${value}`)
    }
  }

  /**
   * Logs a debug message with two names and values if the log level is set to debug.
   * @param {string} name - The first name to display in the log.
   * @param {*} value - The first value to display in the log.
   * @param {string} name2 - The second name to display in the log.
   * @param {*} value2 - The second value to display in the log.
   */
  static debug_2(name, value, name2, value2){
    if( Log.get_log_level() <= Log.DEBUG() ){
      Log.display_log(`${name}=${value} ${name2}=${value2}`)
    }
  }

  /**
   * Logs the contents of a 2D array if the log level is set to info.
   * @param {string} name - The name to display in the log.
   * @param {Array} array - The 2D array to log.
   */
  static info_array(name, array){
    if( Log.get_log_level() <= Log.INFO() ){
      Log.display_log(`${name}`)
      array.map( item => Log.display_log(item));
    }
  }

  /**
   * Logs an informational message if the log level is set to info.
   * @param {string} mes - The message to log.
   */
  static info(mes){
    if( Log.get_log_level() <= Log.INFO() ){
      Log.display_log(mes)
    }
  }

  /**
   * Logs an informational message with a name and value if the log level is set to info.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static info_x(name, value){
    if( Log.get_log_level() <= Log.INFO() ){
      Log.display_log(`${name}`)
      Log.display_log( value)
    }
  }

  /**
   * Logs an informational message with a name and value if the log level is set to info.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static info_1(name, value){
    if( Log.get_log_level() <= Log.INFO() ){
      Log.display_log(`${name}=${value}`)
    }
  }

  /**
   * Logs an informational message with two names and values if the log level is set to info.
   * @param {string} name - The first name to display in the log.
   * @param {*} value - The first value to display in the log.
   * @param {string} name2 - The second name to display in the log.
   * @param {*} value2 - The second value to display in the log.
   */
  static info_2(name, value, name2, value2){
    if( Log.get_log_level() <= Log.INFO() ){
      Log.display_log(`${name}=${value} ${name2}=${value2}`)
    }
  }

  /**
   * Logs the contents of a 2D array if the log level is set to warn.
   * @param {string} name - The name to display in the log.
   * @param {Array} array - The 2D array to log.
   */
  static warn_array(name, array){
    if( Log.get_log_level() <= Log.WARN() ){
      Log.display_log(`${name}`)
      array.map( item => Log.display_log(item));
    }
  }

  /**
   * Logs a warning message if the log level is set to warn.
   * @param {string} mes - The message to log.
   */
  static warn(mes){
    if( Log.get_log_level() <= Log.WARN() ){
      Log.display_log(mes)
    }
  }

  /**
   * Logs a warning message with a name and value if the log level is set to warn.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static warn_x(name, value){
    if( Log.get_log_level() <= Log.WARN() ){
      Log.display_log(`${name}`)
      Log.display_log( value)
    }
  }

  /**
   * Logs a warning message with a name and value if the log level is set to warn.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static warn_1(name, value){
    if( Log.get_log_level() <= Log.WARN() ){
      Log.display_log(`${name}=${value}`)
    }
  }

  /**
   * Logs a warning message with two names and values if the log level is set to warn.
   * @param {string} name - The first name to display in the log.
   * @param {*} value - The first value to display in the log.
   * @param {string} name2 - The second name to display in the log.
   * @param {*} value2 - The second value to display in the log.
   */
  static warn_2(name, value, name2, value2){
    if( Log.get_log_level() <= Log.WARN() ){
      Log.display_log(`${name}=${value} ${name2}=${value2}`)
    }
  }

  /**
   * Logs the contents of a 2D array if the log level is set to error.
   * @param {string} name - The name to display in the log.
   * @param {Array} array - The 2D array to log.
   */
  static error_array(name, array){
    if( Log.get_log_level() <= Log.ERROR() ){
      Log.display_log(`${name}`)
      array.map( item => Log.display_log(item));
    }
  }

  /**
   * Logs an error message if the log level is set to error.
   * @param {string} mes - The message to log.
   */
  static error(mes){
    if( Log.get_log_level() <= Log.ERROR() ){
      Log.display_log(mes)
    }
  }

  /**
   * Logs an error message with a name and value if the log level is set to error.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static error_x(name, value){
    if( Log.get_log_level() <= Log.ERROR() ){
      Log.display_log(`${name}`)
      Log.display_log( value)
    }
  }

  /**
   * Logs an error message with a name and value if the log level is set to error.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static error_1(name, value){
    if( Log.get_log_level() <= Log.ERROR() ){
      Log.display_log(`${name}=${value}`)
    }
  }

  /**
   * Logs an error message with two names and values if the log level is set to error.
   * @param {string} name - The first name to display in the log.
   * @param {*} value - The first value to display in the log.
   * @param {string} name2 - The second name to display in the log.
   * @param {*} value2 - The second value to display in the log.
   */
  static error_2(name, value, name2, value2){
    if( Log.get_log_level() <= Log.ERROR() ){
      Log.display_log(`${name}=${value} ${name2}=${value2}`)
    }
  }

  /**
   * Logs the contents of a 2D array if the log level is set to fault.
   * @param {string} name - The name to display in the log.
   * @param {Array} array - The 2D array to log.
   */
  static fault_array(name, array){
    if( Log.get_log_level() <= Log.FAULT() ){
      Log.display_log(`${name}`)
      array.map( item => Log.display_log(item));
    }
  }

  /**
   * Logs a fault message if the log level is set to fault.
   * @param {string} mes - The message to log.
   */
  static fault(mes){
    if( Log.get_log_level() <= FAULT.FAULT() ){
      Log.display_log(mes)
    }
  }

  /**
   * Logs a fault message with a name and value if the log level is set to fault.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static fault_x(name, value){
    if( Log.get_log_level() <= FAULT.FAULT() ){
      Log.display_log(`${name}`)
      Log.display_log( value)
    }
  }

  /**
   * Logs a fault message with a name and value if the log level is set to fault.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static fault_1(name, value){
    if( Log.get_log_level() <= Log.FAULT() ){
      Log.display_log(`${name}=${value}`)
    }
  }

  /**
   * Logs a fault message with two names and values if the log level is set to fault.
   * @param {string} name - The first name to display in the log.
   * @param {*} value - The first value to display in the log.
   * @param {string} name2 - The second name to display in the log.
   * @param {*} value2 - The second value to display in the log.
   */
  static fault_2(name, value, name2, value2){
    if( Log.get_log_level() <= Log.FAULT() ){
      Log.display_log(`${name}=${value} ${name2}=${value2}`)
    }
  }

  /**
   * Logs the contents of a 2D array if the log level is set to unknown.
   * @param {string} name - The name to display in the log.
   * @param {Array} array - The 2D array to log.
   */
  static unknown_array(name, array){
    if( Log.get_log_level() <= Log.UNKNOWN() ){
      Log.display_log(`${name}`)
      array.map( item => Log.display_log(item));
    }
  }

  /**
   * Logs an unknown message if the log level is set to unknown.
   * @param {string} mes - The message to log.
   */
  static unknown(mes){
    if( Log.get_log_level() <= Log.UNKNOWN() ){
      Log.display_log(mes)
    }
  }

  /**
   * Logs an unknown message with a name and value if the log level is set to unknown.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static unknown_x(name, value){
    if( Log.get_log_level() <= Log.UNKNOWN() ){
      Log.display_log(`${name}`)
      Log.display_log( value)
    }
  }

  /**
   * Logs an unknown message with a name and value if the log level is set to unknown.
   * @param {string} name - The name to display in the log.
   * @param {*} value - The value to display in the log.
   */
  static unknown_1(name, value){
    if( Log.get_log_level() <= Log.UNKNOWN() ){
      Log.display_log(`${name}=${value}`)
    }
  }

  /**
   * Logs an unknown message with two names and values if the log level is set to unknown.
   * @param {string} name - The first name to display in the log.
   * @param {*} value - The first value to display in the log.
   * @param {string} name2 - The second name to display in the log.
   * @param {*} value2 - The second value to display in the log.
   */
  static unknownt_2(name, value, name2, value2){
    if( Log.get_log_level() <= Log.UNKNOWN() ) {
      Log.display_log(`${name}=${value} ${name2}=${value2}`)
    }
  }

  /**
   * Logs the contents of a 2D array if the log level is set to debug.
   * @param {Array} array - The 2D array to log.
   * @param {string} name - The name to display in the log.
   */
  static displayx_array(array, name){
    if( Log.get_log_level() <= Log.DEBUG() ){
      Log.display_log(`${name}`)
      array.map( item => Log.display_log(item));
    }
  }

  /**
   * Logs a debug message with a value and name if the log level is set to debug.
   * @param {*} value - The value to display in the log.
   * @param {string} name - The name to display in the log.
   */
  static displayx(value, name){
    if( Log.get_log_level() <= Log.DEBUG() ){
      Log.display_log(`${name}`)
      Log.display_log( value)
    }
  }

  static display_log(message ){
    Log.display(message, 'CUI', true);
  }

  static display_alert(message){
    .display(message, 'GUI', true);
  }

  static display(message, kind, mode){
    if(mode != true){
      return;
    }
    if(kind == "GUI"){
      const ui = SpreadsheetApp.getUi();
      ui.alert( message )
    }
    else{
      Logger.log( message );    
    }
  }
}
this.Log = Log

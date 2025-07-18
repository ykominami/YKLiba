class Store {
  /**
   * Storeクラスの初期化を行う
   * storesオブジェクトとcountsカウンターを初期化する
   */
  static init() {
    if (typeof (Store.counts) === 'undefined') {
      Store.stores = {};
      Store.counts = 0;
    }
  }
  
  /**
   * 指定されたキーでハッシュオブジェクトをストアに追加する
   * @param {string|number} key - ストアのキー
   * @param {object} hash - 保存するハッシュオブジェクト
   */
  static add_hash(key, hash) {
    Store.stores[key] = hash;
  }

  /**
   * ハッシュオブジェクトをストアに追加し、自動的にインデックスを割り当てる
   * @param {object} hash - 保存するハッシュオブジェクト
   * @returns {number} 割り当てられたインデックス番号
   */
  static add(hash) {
    const count = Store.counts;
    Store.stores[count] = hash;
    Store.counts++;
    return count;
  }

  /**
   * 指定されたインデックスのストアにキーと値のペアを設定する
   * @param {number} index - ストアのインデックス
   * @param {string} key - 設定するキー
   * @param {any} value - 設定する値
   */
  static set(index, key, value) {
    Store.stores[index][key] = value;
    Log.debug('Store.stores', Store.stores);
  }

  /**
   * 指定されたインデックスのストアからキーに対応する値を取得する
   * @param {number} index - ストアのインデックス
   * @param {string} key - 取得するキー
   * @returns {any} 取得した値
   */
  static get(index, key) {
    Log.debug(`Store.get index=${index} key=${key}`);
    Log.debug(Store.stores);
    Log.debug(`Store.set index=${index} key=${key}`);
    Log.debug(Store.stores);

    return Store.stores[index][key];
  }

  /**
   * 指定されたインデックスのストアのキー一覧を取得する
   * @param {number} index - ストアのインデックス
   * @returns {Array} キーの配列
   */
  static keys(index){
    return Object.keys( Store.stores[index] );
  }

  /**
   * 2階層のストア構造にハッシュオブジェクトを追加する
   * @param {number} store_index - ストアのインデックス
   * @param {string|number} index - 2階層目のインデックス
   * @param {object} hash - 保存するハッシュオブジェクト
   */
  static add_level_2(store_index, index, hash){
    if( (typeof Store.stores[store_index]) === "undefined" ){
      Store.stores[store_index] = {};
    }
    Store.stores[store_index][index] = hash;
  }
  
  /**
   * 2階層のストア構造にキーと値のペアを設定する
   * @param {number} store_index - ストアのインデックス
   * @param {string|number} index - 2階層目のインデックス
   * @param {string} key - 設定するキー
   * @param {any} value - 設定する値
   */
  static  set_level_2(store_index, index, key, value){
    if( (typeof Store.stores[store_index]) === "undefined" ){
      Store.stores[store_index] = {};
    }
    if( (typeof Store.stores[store_index][index]) === "undefined" ){
      Store.stores[store_index][index] = {};
    }
    Store.stores[store_index][index][key] = value;
  }
  
  /**
   * 2階層のストア構造からキーに対応する値を取得する
   * @param {number} store_index - ストアのインデックス
   * @param {string|number} index - 2階層目のインデックス
   * @param {string} key - 取得するキー
   * @returns {any} 取得した値
   */
  static  get_level_2(store_index, index, key){
    if( (typeof Store.stores[store_index]) === "undefined" ){
      Store.stores[store_index] = {};
    }
    if( (typeof Store.stores[store_index][index]) === "undefined" ){
      Store.stores[store_index][index] = {};
    }
    return Store.stores[store_index][index][key];
  }

  /**
   * 3階層のストア構造にハッシュオブジェクトを追加する
   * @param {number} store_index - ストアのインデックス
   * @param {string|number} index - 2階層目のインデックス
   * @param {string} base_name - 3階層目のベース名
   * @param {object} hash - 保存するハッシュオブジェクト
   */
  static add_level_3(store_index, index, base_name, hash){
    if( (typeof Store.stores[store_index]) === "undefined" ){
      Store.stores[store_index] = {};
    }
    if( (typeof Store.stores[store_index][index]) === "undefined" ){
      Store.stores[store_index][index] = {};
    }
    Store.stores[store_index][index][base_name] = hash;
  }
  
  /**
   * 3階層のストア構造にキーと値のペアを設定する
   * @param {number} store_index - ストアのインデックス
   * @param {string|number} index - 2階層目のインデックス
   * @param {string} base_name - 3階層目のベース名
   * @param {string} key - 設定するキー
   * @param {any} value - 設定する値
   */
  static  set_level_3(store_index, index, base_name, key, value){
    if( (typeof Store.stores[store_index]) === "undefined" ){
      Store.stores[store_index] = {};
    }
    if( (typeof Store.stores[store_index][index]) === "undefined" ){
      Store.stores[store_index][index] = {};
    }
    if( (typeof Store.stores[store_index][index][base_name]) === "undefined" ){
      Store.stores[store_index][index][base_name] = {};
    }
    Store.stores[store_index][index][base_name][key] = value;
  }
  
  /**
   * 3階層のストア構造からキーに対応する値を取得する
   * @param {number} store_index - ストアのインデックス
   * @param {string|number} index - 2階層目のインデックス
   * @param {string} base_name - 3階層目のベース名
   * @param {string} key - 取得するキー
   * @returns {any} 取得した値
   */
  static  get_level_3(store_index, index, base_name, key){
    if( (typeof Store.stores[store_index]) === "undefined" ){
      Store.stores[store_index] = {};
    }
    if( (typeof Store.stores[store_index][index]) === "undefined" ){
      Store.stores[store_index][index] = {};
    }
    if( (typeof Store.stores[store_index][index][base_name]) === "undefined" ){
      Store.stores[store_index][index][base_name] = {};
    }
    return Store.stores[store_index][index][base_name][key];
  }
  
  /**
   * 3階層のストア構造のキー一覧を取得する
   * @param {number} store_index - ストアのインデックス
   * @param {string|number} index - 2階層目のインデックス
   * @param {string} base_name - 3階層目のベース名
   * @returns {Array} キーの配列
   */
  static  keys_level_3(store_index, index, base_name){
    if( (typeof Store.stores[store_index]) === "undefined" ){
      Store.stores[store_index] = {};
    }
    if( (typeof Store.stores[store_index][index]) === "undefined" ){
      Store.stores[store_index][index] = {};
    }
    if( (typeof Store.stores[store_index][index][base_name]) === "undefined" ){
      Store.stores[store_index][index][base_name] = {};
    }
    return Object.keys( Store.stores[store_index][index][base_name] );
  }
}
this.Store = Store;

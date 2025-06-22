class Store {
  static init() {
    if (typeof (Store.counts) === 'undefined') {
      Store.stores = {};
      Store.counts = 0;
    }
  }
  static add_hash(key, hash) {
    Store.stores[key] = hash;
  }

  static add(hash) {
    const count = Store.counts;
    Store.stores[count] = hash;
    Store.counts++;
    return count;
  }

  static set(index, key, value) {
    Store.stores[index][key] = value;
    Log.debug('Store.stores', Store.stores);
  }

  static get(index, key) {
    Log.debug(`Store.get index=${index} key=${key}`);
    Log.debug(Store.stores);
    Log.debug(`Store.set index=${index} key=${key}`);
    Log.debug(Store.stores);

    return Store.stores[index][key];
  }

  static keys(index){
    return Object.keys( Store.sores[index] );
  }

  static add_level_2(store_index, index, hash){
    if( (typeof Store.stores[store_index]) === "undefined" ){
      Store.stores[store_index] = {};
    }
    Store.stores[store_index][index] = hash;
  }
  static  set_level_2(store_index, index, key, value){
    if( (typeof Store.stores[store_index]) === "undefined" ){
      Store.stores[store_index] = {};
    }
    if( (typeof Store.stores[store_index][index]) === "undefined" ){
      Store.stores[store_index][index] = {};
    }
    Store.stores[store_index][index][key] = value;
  }
  static  get_level_2(store_index, index, key){
    if( (typeof Store.stores[store_index]) === "undefined" ){
      Store.stores[store_index] = {};
    }
    if( (typeof Store.stores[store_index][index]) === "undefined" ){
      Store.stores[store_index][index] = {};
    }
    return Store.stores[store_index][index][key];
  }

  static add_level_3(store_index, index, base_name, hash){
    if( (typeof Store.stores[store_index]) === "undefined" ){
      Store.stores[store_index] = {};
    }
    if( (typeof Store.stores[store_index][index]) === "undefined" ){
      Store.stores[store_index][index] = {};
    }
    Store.stores[store_index][index][base_name] = hash;
  }
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

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

  static add_level_2(store_index, base_name, hash){
    Store.stores[store_index] = {};
    Store.stores[store_index][base_name] = hash;
  }
  static  get_level_2(store_index, index, key){
    Store.stores[store_index][index][key];
  }
}
this.Store = Store;

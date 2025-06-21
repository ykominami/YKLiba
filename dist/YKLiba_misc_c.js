class Misc {
  static makeShape(obj) {
    return {
      r: obj.r,
      c: obj.c,
      h: obj.h,
      w: obj.w,
    };
  }

  static makeRangeAdjust(obj) {
    return {
      r: obj.r,
      c: obj.c,
      h: obj.h,
      w: obj.w,
    };
  }

  static getValidAdjust(arg_adjust) {
    let adjust;
    if (arg_adjust === null) {
      adjust = this.makeRangeAdjust({
        r: 0, c: 0, h: 0, w: 0,
      });
    } else {
      adjust = arg_adjust;
    }
    return adjust;
  }

  static makeFunctionGetEnv() {
    const ssId = get_ss_id();
    const message = `function get_env() {
    return {
      ssId: "${ssId}",
      sheetName:"Sheet1",
      display_mode: false
    }
  }`;
    return message;
  }

  static makeConfig(env, ...fields) {
    return {
      displayMode: env.displayMode, 
      ssId: env.ssId, 
      sheetName: env.sheetName, 
      sortOptions: null, 
      columnIndex: env.columnIndex, 
      fields: fields.pop(),
    };
  }

  static makeConfig2(env, sortOptions, ...fields) {
    let obj;
    if (sortOptions != null) {
      obj = {
        displayMode: env.displayMode, 
        ssId: env.ssId, 
        sheetName: env.sheetName, 
        sortOptions, 
        columnIndex: -1, 
        fields,
      };
    } else {
      obj = {
        displayMode: env.displayMode, 
        ssId: env.ssId, 
        sheetName: env.sheetName, 
        sort_options: null, 
        column_index: env.column_index, 
        fields,
      };
    }
    Log.debug(`YKLiba_misc makeConfig2 obj=${JSON.stringify(obj)}`)
    return obj;
  }

  static convertAscendingSortOption(ch) {
    const sort_char = ch.toLowerCase();
    let sort_option;
    if (sort_char === 'a') {
      sort_option = true;
    } else {
      sort_option = false;
    }
    return sort_option;
  }

  static convertColumnNumber(ch) {
    let column_number = ch;

    if (typeof (ch) === 'string') {
      column_number = get_column_number(ch);
    }
    return column_number;
  }

  static makeAscendingSortOptionInArray(item) {
    const column_number = this.convertColumnNumber(item[0]);
    const sort_option = this.convertAscendingSortOption(item[1]);

    return [column_number, sort_option];
  }

  static makeAscendingSortOptionArray2(array) {
    const array2 = array.map((item) => {
      if (item !== null) {
        const typeof_item = typeof (item);
        if (typeof_item === 'array' || typeof_item === 'object') {
          return this.makeAscendingSortOptionInArray(item);
        }
        return [];
      }
      return null;
    });
    return array2;
  }

  static makeAscendingSortOptionArray(array) {
    const v = array.map((item) => {
      let sort_option;
      if (item !== null) {
        const sort_char = item[0].toLowerCase();
        if (sort_char === 'a') {
          sort_option = true;
        } else {
          sort_option = false;
        }
      } else {
        sort_option = null;
      }
      return sort_option;
    });
    return v;
  }

  static makeFieldCondition2(array) {
    const sort_option_array = this.makeAscendingSortOptionArray2(array);
    const ret = sort_option_array.filter((item) => item !== null).map((item) => ({ column: item[0], ascending: item[1] }));
    return ret;
  }

  static makeFieldCondition(column_index, array) {
    const ret_array = [];
    const sort_option_array = this.makeAscendingSortOptionArray(array);
    for (let i = 0; i < sort_option_array.length; i++) {
      if (sort_option_array[i] !== null) {
        ret_array.push({ column: column_index + i, ascending: sort_option_array[i] });
      }
    }

    return ret_array;
  }
}
this.Misc = Misc;
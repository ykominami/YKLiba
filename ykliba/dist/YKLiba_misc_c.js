// Import required classes
// Base class for spreadsheet operations
// YKLiblog class for logging operations
// Utils class for utility functions

/**
 * その他の雑多な機能を提供するクラス
 * シェイプ情報の作成、設定オブジェクトの構築、ソートオプションの変換機能を提供する
 * 様々な補助的な処理を集約したヘルパークラス
 */
class Misc {
  /**
   * オブジェクトからシェイプ情報（行、列、高さ、幅）を抽出して新しいオブジェクトを作成する
   * @param {Object} obj - シェイプ情報を含むオブジェクト
   * @param {number} obj.r - 行番号
   * @param {number} obj.c - 列番号
   * @param {number} obj.h - 高さ
   * @param {number} obj.w - 幅
   * @returns {Object} シェイプ情報オブジェクト
   */
  static makeShape(obj) {
    return {
      r: obj.r,
      c: obj.c,
      h: obj.h,
      w: obj.w,
    };
  }

  /**
   * オブジェクトから範囲調整情報（行、列、高さ、幅）を抽出して新しいオブジェクトを作成する
   * @param {Object} obj - 範囲調整情報を含むオブジェクト
   * @param {number} obj.r - 行番号
   * @param {number} obj.c - 列番号
   * @param {number} obj.h - 高さ
   * @param {number} obj.w - 幅
   * @returns {Object} 範囲調整情報オブジェクト
   */
  static makeRangeAdjust(obj) {
    return {
      r: obj.r,
      c: obj.c,
      h: obj.h,
      w: obj.w,
    };
  }

  /**
   * 調整オブジェクトの有効性をチェックし、nullの場合はデフォルト値を設定する
   * @param {Object|null} arg_adjust - 調整オブジェクト
   * @returns {Object} 有効な調整オブジェクト
   */
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

  /**
   * 環境設定を取得する関数の文字列を生成する
   * @returns {string} get_env関数の文字列
   */
  static makeFunctionGetEnv() {
    const ssId = Base.getSsId();
    const message = `function get_env() {
    return {
      ssId: "${ssId}",
      sheetName:"Sheet1",
      display_mode: false
    }
  }`;
    return message;
  }

  /**
   * 環境設定とフィールド情報から設定オブジェクトを作成する
   * @param {Object} env - 環境設定オブジェクト
   * @param {...any} fields - フィールド情報（可変長引数）
   * @returns {Object} 設定オブジェクト
   */
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

  /**
   * 環境設定、ソートオプション、フィールド情報から設定オブジェクトを作成する（拡張版）
   * @param {Object} env - 環境設定オブジェクト
   * @param {Object|null} sortOptions - ソートオプション
   * @param {...any} fields - フィールド情報（可変長引数）
   * @returns {Object} 設定オブジェクト
   */
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
    YKLiblog.Log.debug(`YKLiba_misc makeConfig2 obj=${JSON.stringify(obj)}`)
    return obj;
  }

  /**
   * 文字から昇順ソートオプションの真偽値を変換する
   * @param {string} ch - ソート文字（'a'またはその他）
   * @returns {boolean} 昇順ソートオプション（'a'の場合はtrue、その他はfalse）
   */
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

  /**
   * 文字または数値から列番号を変換する
   * @param {string|number} ch - 列文字または列番号
   * @returns {number} 列番号
   */
  static convertColumnNumber(ch) {
    let column_number = ch;

    if (typeof (ch) === 'string') {
      column_number = Utils.getColumnNumber(ch);
    }
    return column_number;
  }

  /**
   * 配列アイテムから昇順ソートオプションの配列を作成する
   * @param {Array} item - [列情報, ソート文字]の配列
   * @returns {Array} [列番号, 昇順ソートオプション]の配列
   */
  static makeAscendingSortOptionInArray(item) {
    const column_number = Misc.convertColumnNumber(item[0]);
    const sort_option = Misc.convertAscendingSortOption(item[1]);

    return [column_number, sort_option];
  }

  /**
   * 配列の各アイテムから昇順ソートオプションの配列を作成する（拡張版）
   * @param {Array} array - ソート情報の配列
   * @returns {Array} 昇順ソートオプションの配列
   */
  static makeAscendingSortOptionArray2(array) {
    const array2 = array.map((item) => {
      if (item !== null) {
        const typeof_item = typeof (item);
        if (typeof_item === 'array' || typeof_item === 'object') {
          return Misc.makeAscendingSortOptionInArray(item);
        }
        return [];
      }
      return null;
    });
    return array2;
  }

  /**
   * 配列の各アイテムから昇順ソートオプションの配列を作成する
   * @param {Array} array - ソート情報の配列
   * @returns {Array} 昇順ソートオプションの配列
   */
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

  /**
   * 配列からフィールド条件オブジェクトの配列を作成する（拡張版）
   * @param {Array} array - ソート情報の配列
   * @returns {Array} フィールド条件オブジェクトの配列
   */
  static makeFieldCondition2(array) {
    const sort_option_array = this.makeAscendingSortOptionArray2(array);
    const ret = sort_option_array.filter((item) => item !== null).map((item) => ({ column: item[0], ascending: item[1] }));
    return ret;
  }

  /**
   * 列インデックスと配列からフィールド条件オブジェクトの配列を作成する
   * @param {number} column_index - 開始列インデックス
   * @param {Array} array - ソート情報の配列
   * @returns {Array} フィールド条件オブジェクトの配列
   */
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
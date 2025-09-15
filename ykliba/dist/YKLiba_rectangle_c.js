// Import required classes
// Arrayx class for array operations

/**
 * 矩形領域と隣接要素の解析を行うクラス
 * 2次元配列からマスクパターンの生成、隣接要素の検出機能を提供する
 * 配列内の空白要素や隣接関係の分析に特化したアルゴリズムを実装
 */
class Rectangle {
  /**
   * 2次元配列からマスクパターンを生成する
   * @param {Array<Array>} array - 入力2次元配列
   * @returns {Array<Array<number>>} マスクパターン（空文字は0、それ以外は1）
   */
  static makeMaskPattern(array) {
    const ret_check = Arrayx.isValid2dArray(array);
    if (ret_check[0] === false) {
      return [];
    }
    const height = array.length;
    const width = array[0].length;
    const buffer = [];

    for (let y = 0; y < height; y++) {
      buffer[y] = [];
      for (let x = 0; x < width; x++) {
        if (array[y][x] == '') {
          buffer[y].push(0);
        } else {
          buffer[y].push(1);
        }
      }
    }
    return buffer;
  }

  /**
   * 左上角の隣接要素を検出する
   * @param {Array<Array>} array - 入力2次元配列
   * @param {Array<Array>} ret_array - 結果を格納する配列
   * @param {number} x - X座標
   * @param {number} y - Y座標
   */
  static detectAdjacencyTopLeft(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x + 1] + array[y + 1][x];
  }

  /**
   * 右上角の隣接要素を検出する
   * @param {Array<Array>} array - 入力2次元配列
   * @param {Array<Array>} ret_array - 結果を格納する配列
   * @param {number} x - X座標
   * @param {number} y - Y座標
   */
  static detectAdjacencyTopRight(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x - 1] + array[y + 1][x];
  }

  /**
   * 左下角の隣接要素を検出する
   * @param {Array<Array>} array - 入力2次元配列
   * @param {Array<Array>} ret_array - 結果を格納する配列
   * @param {number} x - X座標
   * @param {number} y - Y座標
   */
  static detectAdjacencyBottomLeft(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x + 1] + array[y - 1][x];
  }

  /**
   * 右下角の隣接要素を検出する
   * @param {Array<Array>} array - 入力2次元配列
   * @param {Array<Array>} ret_array - 結果を格納する配列
   * @param {number} x - X座標
   * @param {number} y - Y座標
   */
  static detectAdjacencyBottomRight(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x - 1] + array[y - 1][x];
  }

  /**
   * 上辺の隣接要素を検出する
   * @param {Array<Array>} array - 入力2次元配列
   * @param {Array<Array>} ret_array - 結果を格納する配列
   * @param {number} x - X座標
   * @param {number} y - Y座標
   */
  static detectAdjacencyTopSide(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x + 1] + array[y][x - 1] + array[y + 1][x];
  }

  /**
   * 下辺の隣接要素を検出する
   * @param {Array<Array>} array - 入力2次元配列
   * @param {Array<Array>} ret_array - 結果を格納する配列
   * @param {number} x - X座標
   * @param {number} y - Y座標
   */
  static detectAdjacencyBottomSide(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x + 1] + array[y][x - 1] + array[y - 1][x];
  }

  /**
   * 左辺の隣接要素を検出する
   * @param {Array<Array>} array - 入力2次元配列
   * @param {Array<Array>} ret_array - 結果を格納する配列
   * @param {number} x - X座標
   * @param {number} y - Y座標
   */
  static detectAdjacencyLeftSide(array, ret_array, x, y) {
    ret_array[y][x] = array[y - 1][x] + array[y][x + 1] + array[y + 1][x];
  }

  /**
   * 右辺の隣接要素を検出する
   * @param {Array<Array>} array - 入力2次元配列
   * @param {Array<Array>} ret_array - 結果を格納する配列
   * @param {number} x - X座標
   * @param {number} y - Y座標
   */
  static detectAdjacencyRightSide(array, ret_array, x, y) {
    ret_array[y][x] = array[y - 1][x] + array[y][x - 1] + array[y + 1][x];
  }

  /**
   * 内部の隣接要素を検出する
   * @param {Array<Array>} array - 入力2次元配列
   * @param {Array<Array>} ret_array - 結果を格納する配列
   * @param {number} x - X座標
   * @param {number} y - Y座標
   */
  static detectAdjacencyInterior(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x - 1] + array[y][x + 1] + array[y + 1][x] + array[y - 1][x];
  }

  /**
   * 1行の隣接要素を検出する
   * @param {Array<Array>} array - 入力2次元配列
   * @param {Array<Array>} ret_array - 結果を格納する配列
   * @param {number} width - 幅
   * @returns {Array<Array>} 更新された結果配列
   */
  static detectAdjacencyRow(array, ret_array, width) {
    for (let x = 0; x < width; x++) {
      if (x === 0) {
        ret_array[0][x] = array[0][x + 1];
      } else if (x === (width - 1)) {
        ret_array[0][x] = array[0][x - 1];
      } else {
        ret_array[0][x] = array[0][x - 1] + array[0][x + 1];
      }
    }
    return ret_array;
  }

  /**
   * 1列の隣接要素を検出する
   * @param {Array<Array>} array - 入力2次元配列
   * @param {Array<Array>} ret_array - 結果を格納する配列
   * @param {number} height - 高さ
   */
  static detectAdjacencyColumn(array, ret_array, height) {
    for (let y = 0; y < height; y++) {
      if (y === 0) {
        ret_array[y][0] = array[y + 1][0];
      } else if (y === (height - 1)) {
        ret_array[y][0] = array[y - 1][0];
      } else {
        ret_array[y][0] = array[y - 1][0] + array[y + 1][0];
      }
    }
  }

  /**
   * 2次元配列から隣接要素配列を生成する
   * @param {Array<Array>} array - 入力2次元配列
   * @returns {Array<Array<number>>} 隣接要素配列
   */
  static makeAdjacencyArray(array) {
    const ret_check = Arrayx.isValid2dArray(array);
    if (ret_check[0] === false) {
      return [];
    }
    const height = array.length;
    const width = array[0].length;
    const ret_array = [];

    for (let i = 0; i < height; i++) {
      const row = Array(width).fill(0);
      ret_array.push(row);
    }

    if (width === 1) {
      if (height === 1) {
        ret_array.push([1]);
        return ret_array;
      }

      Rectangle.detectAdjacencyColumn(array, ret_array, height);
      return ret_array;
    }
    if (height === 1) {
      if (width === 1) {
        ret_array.push([1]);
        return ret_array;
      }

      Rectangle.detectAdjacencyRow(array, ret_array, width);
      return ret_array;
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (y == 0) {
          if (x == 0) {
            Rectangle.detectAdjacencyTopLeft(array, ret_array, x, y);
          } else if (x == (width - 1)) {
            Rectangle.detectAdjacencyTopRight(array, ret_array, x, y);
          } else {
            Rectangle.detectAdjacencyTopSide(array, ret_array, x, y);
          }
        } else if (y == (height - 1)) {
          if (x == 0) {
            Rectangle.detectAdjacencyBottomLeft(array, ret_array, x, y);
          } else if (x == (width - 1)) {
            Rectangle.detectAdjacencyBottomRight(array, ret_array, x, y);
          } else {
            Rectangle.detectAdjacencyBottomSide(array, ret_array, x, y);
          }
        } else if (x == 0) {
          Rectangle.detectAdjacencyLeftSide(array, ret_array, x, y);
        } else if (x == (width - 1)) {
          Rectangle.detectAdjacencyRightSide(array, ret_array, x, y);
        } else {
          Rectangle.detectAdjacencyInterior(array, ret_array, x, y);
        }
      }
    }
    return ret_array;
  }
}
this.Rectangle = Rectangle;
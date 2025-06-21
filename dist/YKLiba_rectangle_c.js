class Rectangle {
  static makeMaskPattern(array) {
    const ret_check = is_valid_2d_array(array);
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

  static detectAdjacencyTopLeft(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x + 1] + array[y + 1][x];
  }

  static detectAdjacencyTopRight(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x - 1] + array[y + 1][x];
  }

  static detectAdjacencyBottomLeft(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x + 1] + array[y - 1][x];
  }

  static detectAdjacencyBottomRight(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x - 1] + array[y - 1][x];
  }

  static detectAdjacencyTopSide(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x + 1] + array[y][x - 1] + array[y + 1][x];
  }

  static detectAdjacencyBottomSide(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x + 1] + array[y][x - 1] + array[y - 1][x];
  }

  static detectAdjacencyLeftSide(array, ret_array, x, y) {
    ret_array[y][x] = array[y - 1][x] + array[y][x + 1] + array[y + 1][x];
  }

  static detectAdjacencyRightSide(array, ret_array, x, y) {
    ret_array[y][x] = array[y - 1][x] + array[y][x - 1] + array[y + 1][x];
  }

  static detectAdjacencyInterior(array, ret_array, x, y) {
    ret_array[y][x] = array[y][x - 1] + array[y][x + 1] + array[y + 1][x] + array[y - 1][x];
  }

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

  static makeAdjacencyArray(array) {
    const ret_check = is_valid_2d_array(array);
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
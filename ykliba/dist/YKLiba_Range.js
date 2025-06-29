function getRangeAndValues(sheet) {
  let range = null;
  let values = null;
  if (sheet !== null && typeof (sheet) !== 'undefined') {
    range = sheet.getDataRange();
    values = range.getValues();
  }
  return [range, values];
}

function getValidRange(sheet) {
  let newRange = null;
  const [range, values] = getRangeAndValues(sheet);
  if ((range !== null && typeof (range) !== 'undefined') && values !== null) {
    const shape = getRangeShape(range);
    const tlRelative = getRelativeCoordinatesOfTopLeft(values);

    const newHeight = shape.h - tlRelative.y;
    const newWidth = shape.w - tlRelative.x;
    newRange = range.offset(tlRelative.y, tlRelative.x, newHeight, newWidth);
  }
  return newRange;
}

function getRangeShape(range) {
  const column = range.getColumn();
  const row = range.getRow();
  const height = range.getHeight();
  const width = range.getWidth();

  return Misc.makeShape({
    r: row, c: column, h: height, w: width,
  });
}

function setValues(range, values) {
  range.setValues(values);
}

function getColumn(dataRange, index) {
  const dataArray = dataRange.getValues();
  return dataArray.map((row) => row[index]);
}

function insertOneRow(sheet, argAdjust = null) {
  const [header_range, dataRange] = Code.getRangeOfHeaderAndData(sheet, argAdjust);
  const shape = getRangeShape(dataRange);
  const targetRange = dataRange.offset(0, 0, 1, shape.w);
  targetRange.insertCells(SpreadsheetApp.Dimension.COLUMNS);
}

function grouping(values, op) {
  return values.reduce((hash, curVal, index) => {

    const [key, value] = op(curVal);
    if (typeof (hash[key]) === 'undefined') {
      hash[key] = [value];
    } else {
      hash[key] = [...hash[key], value];
    }
    return hash;
  }, {});
}

function validString(value) {
  if (typeof (value) === 'undefined') {
    return '';
  }
  return value.toString();
}

function compareWithString(a, b) {
  const aStr = validString(a);
  const bStr = validString(b);
  if (aStr < bStr) {
    return -1;
  }
  if (aStr > bStr) {
    return 1;
  }
  return 0;
}

function sortx(array, op) {
  return array.sort(op);
}

function groupingWithRange(range, op) {
  const values = range.getValues();
  return grouping(values, op);
}

function divideRangeX(range, grouping_op, link_op) {
  const hash = groupingWithRange(range, grouping_op);
  // const index = 0
  // const cond_value = 2
  const values = range.getValues();
  const result = Arrayx.linkedRegion(values, link_op);
  const width = values[0].length;
  const targetRange = range.offset(result[0][0], 0, result[0][1] - result[0][0] + 1, width);
  const shape = getRangeShape(targetRange);
  Utils.dumpObject(shape);
  return targetRange;
}

/**
 * 指定されたスプレッドシートのbookシートのpurchase_date列に日付フォーマットを適用する
 * @param {string} ss_id - スプレッドシートID
 */
function setFormatToNamedRowsSheetBySheetnameX(ss_id) {
  const sheetname = 'book';
  const column_name = 'purchase_date';
  const format = 'yyyy-mm-dd';
  set_format_to_named_rows_sheet_by_sheetname(ss_id, sheetname, column_name, format);
}

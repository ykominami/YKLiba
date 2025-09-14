/**
 * 書籍管理に関する機能を提供するクラス
 * スプレッドシートのbookシートの操作を行う
 */
// Import required classes
// Code class for code operations

class Book {
  /**
   * bookシートのpurchase_date列のフォーマットをyyyy-mm-ddに設定する
   * @param {string} ss_id - スプレッドシートID
   */
  static setFormatToNamedRowsSheetBySheetnameX(ss_id) {
    const sheetname = 'book';
    const column_name = 'purchase_date';
    const format = 'yyyy-mm-dd';
    Code.setFormatToNamedRowsSheetBySheetname(ss_id, sheetname, column_name, format);
  }
}
this.Book = Book;

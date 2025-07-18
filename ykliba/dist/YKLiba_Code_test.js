/**
 * フォルダを取得するテスト関数
 * キー名からフォルダIDを取得し、そのIDでフォルダオブジェクトを取得する
 */
function test_get_folder() {
  const folder_id = get_folder_id_by_key('Frontend Focus');
  const folder = get_folder_by_id(folder_id);
}

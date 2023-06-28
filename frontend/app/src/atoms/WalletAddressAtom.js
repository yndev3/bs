import { atom } from "recoil";

/** todo
 * Headerのアドレス情報をグローバルに保持しているが,ページ遷移すると消えてしまう
 * defaultをlocalstorageに保存した値をつかうようにする
**/
export const walletAddressAtom = atom({
  key: 'walletAddressAtom',
  default: null
});
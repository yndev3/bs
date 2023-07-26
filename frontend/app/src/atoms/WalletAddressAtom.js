import { atom } from "recoil";
import { recoilPersist } from"recoil-persist";

const { persistAtom } = recoilPersist()
export const walletAddressAtom = atom({
  key: 'walletAddressAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
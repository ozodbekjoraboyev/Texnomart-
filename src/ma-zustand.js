import { create } from "zustand";
const useMyStore = create(() => {
  return {
    produkts: [],
    cards: [],
    loading: true,
    savatcha: [],
    like: [],
    haridlar: [],
  };
});
export default useMyStore;

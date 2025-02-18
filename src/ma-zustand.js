import { create } from "zustand";
const useMyStore = create(() => {
  return {
    produkts: [],
    cards: [],
    loading: true,
    savatcha: [],
    like: [],
    haridlar: [],
    currentSort: "Narx bo’yicha",
    tartibi: false,
  };
});
export default useMyStore;

import { create } from "zustand";
const useMyStore = create(() => {
  return {
    produkts: [],
    cards: [],
    loading: true,
    savatcha: [],
    like: [],
  };
});
export default useMyStore;

import { atom } from "recoil";

export const filtersState = atom({
  key: 'filtersState',
  default: {
    query: "",
    errorsOnly: false
  }
});
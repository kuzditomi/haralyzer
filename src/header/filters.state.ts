import { atom } from "recoil";

export const filtersState = atom({
  key: 'filtersState', // unique ID (with respect to other atoms/selectors)
  default: {
    query: ""
  }
});
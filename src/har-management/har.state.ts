import { atom, selector } from "recoil";
import { HarWithIds } from "./har-import";

export const harState = atom({
    key: 'harState',
    default: null as HarWithIds | null
});

export const selectedEntryIdState = atom({
    key: 'selectedEntryStateState',
    default: null as number | null
});


export const harEntries = selector({
    key: 'harEntries',
    get: ({ get }) => {
        const har = get(harState);

        if (!har) {
            return null;
        }

        return har.log.entries;
    }
})


import { atom, selector } from "recoil";
import { HarWithIds } from "./har-import";
import { filtersState } from "../header/filters.state";

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

export const filteredHarEntries = selector({
    key: 'filteredHarEntries',
    get: ({ get }) => {
        const har = get(harState);
        const filters = get(filtersState);

        if (!har) {
            return null;
        }

        return har.log.entries.filter(entry => !filters.query || entry.request.url.includes(filters.query)
        );
    }
})



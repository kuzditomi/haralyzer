import { atom, selector } from "recoil";
import { HarWithIds } from "./har-import";
import { filtersState } from "../header/filters.state";
import { isEntryRelevant } from "./filter";

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

        return har.log.entries
            .filter(entry => !filters.query || entry.request.url.includes(filters.query))
            .filter(entry => !filters.errorsOnly || entry.response.status >= 400)
            .filter(entry => !filters.xhrOnly || entry._resourceType == "xhr")
            .filter(entry => !filters.relevantOnly || isEntryRelevant(entry));
    }
})

export const selectedHarEntry = selector({
    key: 'selectedHarEntry',
    get: ({ get }) => {
        const har = get(harState);
        const selectedId = get(selectedEntryIdState);

        if (!har || !selectedId) {
            return null;
        }

        return har.log.entries.find(entry => entry.id === selectedId);
    }
})



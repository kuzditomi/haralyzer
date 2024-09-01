import { Entry } from "har-format";

export function isEntryRelevant(entry: Entry): boolean {
    return entry.request.url.includes('jira') || entry.request.url.includes('azure')
}
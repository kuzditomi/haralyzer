import { Entry, Log } from "har-format";

export type EntryWithId = Entry & { id: number };

export type HarWithIds = {
    log: Omit<Log, 'entries'> & {
        entries: Array<EntryWithId>
    }
}

export async function parseHar(file: File): Promise<HarWithIds> {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();

            reader.onload = () => {
                if (!reader.result) {
                    reject("empty file");
                }

                const har = JSON.parse(reader.result as string) as HarWithIds;
                console.info({ har });

                har.log.entries.forEach((entry, i) => {
                    entry.id = i;
                });

                resolve(har);
            }
            reader.readAsText(file);
        } catch (e) {
            console.error(e);
            reject(e);
        }

    })
}
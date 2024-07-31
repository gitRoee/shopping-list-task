import { category } from "./categories"

export type item = {
    name: string,
    count: number
}

export type itemsByCategory = Record<string, category & {items: item[]}>;


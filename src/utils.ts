export const $ =
    <T extends unknown[], U extends NonNullable<unknown>>(
        function_: (...arguments_: T) => U,
        hash: (arguments_: T) => string = JSON.stringify,
        cache: Record<string, U> = {},
    ): typeof function_ =>
    (...arguments_) =>
        (cache[hash(arguments_)] ??= function_(...arguments_)) // eslint-disable-line functional/immutable-data

export const _ = <T>(value: T | undefined): value is T => value !== undefined // eslint-disable-line no-undefined

export const at = <T>(list: T[], position: number): T => {
    const index = ((position % list.length) + list.length) % list.length

    if (!_(list[index]))
        throw new Error(`No item at index: ${position} / ${index}`)

    return list[index]
}

export const clockwise = <T>([first = [], ...rest]: T[][]): T[][] =>
    first.map((item, index) =>
        [item, ...rest.map((row) => at(row, index))].toReversed(),
    )

export const count = <T>(
    list: T[],
    predicate: (item: T, index: number, list: T[]) => boolean,
): number => list.filter(predicate).length

export const distance = (left: number, right: number): number =>
    Math.abs(left - right)

export const reduceMany = <T>(
    lists: T[][],
    reducer: (left: T[], right: T[], index: number) => T,
): T[] =>
    lists.reduce((left, right) =>
        left.map((__, index) => reducer(left, right, index)),
    )

export const sort = <T>(
    list: T[],
    compare: (left: T, right: T) => number = (left, right) =>
        left < right ? -1
        : right > left ? 1
        : 0,
): T[] => list.toSorted(compare)

export const sum = (numbers: number[]): number =>
    numbers.reduce((total, number) => total + number)

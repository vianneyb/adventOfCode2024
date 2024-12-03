/* eslint-disable @typescript-eslint/no-non-null-assertion */
const parse = (input: string): [number[], number[]] => {
    const lines = input.trim().split("\n")

    const [array1, array2] = lines.reduce<[number[], number[]]>(
        ([array1_, array2_], line): [number[], number[]] => {
            const numbers = line.split(/\s+/u).map(Number)
            if (numbers.length !== 2)
                throw new Error(`Expected 2 numbers, got ${numbers.length}`)
            return [
                [...array1_, numbers[0]!],
                [...array2_, numbers[1]!],
            ]
        },
        [[], []],
    )
    return [array1, array2]
}

/* --------------------------------- part01 --------------------------------- */

export const part01 = (input: string): number => {
    const [firstArray, secondArray] = parse(input)
    const sortedFirst = [...firstArray].sort((first, second) => first - second)
    const sortedSecond = [...secondArray].sort(
        (first, second) => first - second,
    )

    const totalDiff = sortedFirst.reduce((sum, current, index) => {
        const diff = Math.abs(current - sortedSecond[index]!)
        return sum + diff
    }, 0)
    return totalDiff
}

/* --------------------------------- part02 --------------------------------- */

export const part02 = (input: string): number => {
    const [firstArray, secondArray] = parse(input)
    const data = firstArray.reduce<number[]>((accumulator, current) => {
        const occurrences = secondArray.filter(
            (number_) => number_ === current,
        ).length
        const multipliedValue = current * occurrences
        return [...accumulator, multipliedValue]
    }, [])

    return data.reduce((sum, current) => sum + current, 0)
}

/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const parse = (input: string): string[] => input.trim().split("\n")

const parseLine = (line: string): { nums: number[]; target: number } => {
    const [result, numbers] = line.split(": ")
    const target = Number(result)
    const nums = numbers!.trim().split(" ").map(Number)
    return { nums, target }
}

const evaluate = (
    accumulator: number,
    nextNumber: number,
    op: string,
): number => {
    if (op === "*") return accumulator * nextNumber
    if (op === "+") return accumulator + nextNumber
    if (op === "|") return Number(`${accumulator}${nextNumber}`)
    return accumulator
}
const tryOperators = (
    numsLeft: number[],
    op = "",
    accumulator = 0,
    target = 0,
    ops: string[] = ["+", "*", "|"],
): boolean => {
    const subResult = evaluate(accumulator, numsLeft[0]!, op)
    if (subResult > target) return false
    if (numsLeft.length === 1) return subResult === target
    return ops.some((operator) =>
        tryOperators(numsLeft.slice(1), operator, subResult, target, ops),
    )
}

/* --------------------------------- part01 --------------------------------- */

export const part01 = (input: string): number => {
    const data = parse(input)
    // Data is a list of line, each line is composed of a number, a : and a list of numbers separated by spaces
    // The number is the result of the operations applied to the list of numbers
    // The operations are + and *
    // The goal is to find if we can find a combination of operations that can lead to the number
    // We can only use each number once, and in the same order

    return data
        .filter((line) => {
            const { nums, target } = parseLine(line)
            return tryOperators(nums, "", nums[0], target, ["+", "*"])
        })
        .reduce(
            (accumulator, current) =>
                accumulator + Number(current.split(": ")[0]),
            0,
        )
}

/* --------------------------------- part02 --------------------------------- */
export const part02 = (input: string): number => {
    const data = parse(input)

    return data
        .filter((line) => {
            const { nums, target } = parseLine(line)
            return tryOperators(nums, "", nums[0], target)
        })
        .reduce(
            (accumulator, current) =>
                accumulator + Number(current.split(": ")[0]),
            0,
        )
}

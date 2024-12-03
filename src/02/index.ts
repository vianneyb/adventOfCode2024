/* eslint-disable @typescript-eslint/no-non-null-assertion */
const parse = (input: string): number[][] =>
    input
        .trim()
        .split("\n")
        .map((line) => line.split(" ").map(Number))

const isSafe = (line: number[]): number => {
    if (line.length < 2) return -1

    const sens = line[1]! > line[0]! ? 1 : -1
    return line.reduce(
        (accumulator: number, number_: number, index: number) => {
            if (accumulator !== -1) return accumulator
            if (index === 0) return -1

            const diff = sens * (number_ - line[index - 1]!)
            if (diff > 3 || diff < 1) return index
            return -1
        },
        -1,
    )
}

/* --------------------------------- part01 --------------------------------- */

export const part01 = (input: string): number => {
    const data = parse(input)
    // On cherche le nombre de lignes ou l'ecart entre 2 nombres consécutifs est plus grand que 2

    const result = data.filter((line) => isSafe(line) === -1)
    return result.length
}

/* --------------------------------- part02 --------------------------------- */

export const part02 = (input: string): number => {
    const data = parse(input)
    // On cherche le nombre de lignes ou l'ecart entre 2 nombres consécutifs est plus grand que 2

    const result = data.filter((line) => {
        const index = isSafe(line)
        if (index === -1) return true
        // Try without each element
        const hasValidSubsequence = line.some((_, index_) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const subsequence = line.filter((_, index2) => index2 !== index_)
            return isSafe(subsequence) === -1
        })

        return hasValidSubsequence
    })

    return result.length
}

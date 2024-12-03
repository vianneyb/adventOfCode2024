const parse = (input: string): string => input.trim()

const multiply = (line: string): number => {
    const matches = line.match(/mul\((\d+),(\d+)\)/g)
    return (
        matches?.reduce((accumulator, match) => {
            const numbers = match
                .replaceAll(/[()lmu]/g, "")
                .split(",")
                .map(Number)
            return accumulator + numbers[0] * numbers[1]
        }, 0) ?? 0
    )
}

/* --------------------------------- part01 --------------------------------- */

export const part01 = (input: string): number => {
    const line = parse(input)
    // Extract with a regex all the mul(x,y) and sum them

    return multiply(line)
}

/* --------------------------------- part02 --------------------------------- */

export const part02 = (input: string): number => {
    const data = parse(input)
    // Split with don't() and do() and keep if it has been split by don't() or do()
    const parts = data.split(/(don't\(\)|do\(\))/)
    // Process array and call multiply on next part if it's a do()
    const initialValue = multiply(parts[0] ?? "")
    const result = parts.slice(1).reduce((accumulator, part, index) => {
        if (index % 2 === 0 && part === "do()") {
            const nextPart = parts[index + 2] ?? ""
            return accumulator + multiply(nextPart)
        }
        return accumulator
    }, initialValue)

    return result
}

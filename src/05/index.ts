const parse = (input: string): string[] => input.trim().split("\n")

/* --------------------------------- part01 --------------------------------- */

const ParseOrderData = (order: string) =>
    parse(order).reduce<Record<number, number[]>>((accumulator, line) => {
        const [key, value] = line.split("|").map(Number)
        return {
            ...accumulator,
            [key]: [...(accumulator[key] ?? []), value],
        }
    }, {})

export const part01 = (order: string, output: string): number => {
    const orderData = ParseOrderData(order)
    const outputData = parse(output)

    const data = outputData.filter((line) => {
        const numbers = line.split(",").map(Number)

        const hasInvalidPair = numbers.slice(1).some((current, index) => {
            const previous = numbers[index]

            // Skip if current number has no rules
            if (!orderData[current]) return false

            // Check if previous number violates rules for current
            return orderData[current].includes(previous)
        })

        return !hasInvalidPair
    })

    // Additionne le nombre au centre de chaque ligne du tableau data
    const result = data.reduce((accumulator, line) => {
        const numbers = line.split(",").map(Number)
        return accumulator + numbers[Math.floor(numbers.length / 2)]
    }, 0)

    return result
}

/* --------------------------------- part02 --------------------------------- */

export const part02 = (order: string, output: string): number => {
    const orderData = parse(order).reduce((accumulator, line) => {
        const [key, value] = line.split("|").map(Number)
        accumulator[key] = [...(accumulator[key] ?? []), value]
        return accumulator
    }, {})

    const getWrongIndex = (array: number[]): boolean => {
        for (let index = 1; index < array.length; index++) {
            const current = array[index]
            const previous = array[index - 1]

            if (orderData[current]?.includes(previous)) return index
        }
        return -1
    }

    const outputData = parse(output)

    const dataWrong = outputData.filter(
        (line) => getWrongIndex(line.split(",").map(Number)) !== -1,
    )
    console.log(dataWrong.length)

    const sortedData = dataWrong.map((line, index) => {
        console.log(index, line)
        const numbers = line.split(",").map(Number)
        let wrongIndex = getWrongIndex(numbers)
        // Permute avec le nombre précedent
        while (wrongIndex !== -1) {
            const temporary = numbers[wrongIndex]
            numbers[wrongIndex] = numbers[wrongIndex - 1]
            numbers[wrongIndex - 1] = temporary
            wrongIndex = getWrongIndex(numbers)
        }
        return numbers
    })

    const result = sortedData.reduce(
        (accumulator, numbers) =>
            accumulator + numbers[Math.floor(numbers.length / 2)],
        0,
    )

    return result
}

/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable max-lines-per-function */
const parse = (input: string): string[] => input.trim().split("\n")

/* --------------------------------- part01 --------------------------------- */

export const part01 = (input: string): number => {
    const data = parse(input)
    // In a table of nxm columns, each case is a letter, i want to find how many times i can find the word XMAS in every directions
    // I can go up, down, left, right, and diagonally
    // I want to find how many times i can find the word XMAS in every directions
    let count = 0
    const rows = data.length
    const cols = data[0].length
    const word = "XMAS"

    // Helper to check if a word exists at position in given direction
    const checkDirection = (
        row: number,
        col: number,
        dRow: number,
        dCol: number,
    ): boolean => {
        for (let index = 0; index < word.length; index++) {
            const newRow = row + dRow * index
            const newCol = col + dCol * index

            if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols)
                return false

            if (data[newRow][newCol] !== word[index]) return false
        }
        return true
    }

    // Check all positions and all 8 directions
    for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++) {
            // All possible directions: right, down-right, down, down-left, left, up-left, up, up-right
            const directions = [
                [0, 1],
                [1, 1],
                [1, 0],
                [1, -1],
                [0, -1],
                [-1, -1],
                [-1, 0],
                [-1, 1],
            ]

            for (const [dRow, dCol] of directions)
                if (checkDirection(row, col, dRow, dCol)) {
                    count++
                }
        }

    return count
}

/* --------------------------------- part02 --------------------------------- */

export const part02 = (input: string): number => {
    const data = parse(input)
    // Now i want to find that schema:
    // M.S
    // .A.
    // M.S
    // Where . can be any letter
    // MAS can be written in any direction
    // I want to find how many times this schema is present in the table
    const rows = data.length
    const cols = data[0].length

    // Find all 'A' positions that are not on the edge
    const centerPositions = data.flatMap((row, rowIndex) =>
        [...row].flatMap((char, colIndex) =>
            (
                char === "A" &&
                rowIndex > 0 &&
                rowIndex < rows - 1 &&
                colIndex > 0 &&
                colIndex < cols - 1
            ) ?
                [[rowIndex, colIndex]]
            :   [],
        ),
    )
    // Helper function to check if a pattern exists starting from a center A in a diagonal direction
    const checkPattern = (centerRow: number, centerCol: number): boolean => {
        // MAS + MAS
        const pattern1 =
            data[centerRow - 1]?.[centerCol - 1] === "M" &&
            data[centerRow + 1]?.[centerCol + 1] === "S" &&
            data[centerRow - 1]?.[centerCol + 1] === "M" &&
            data[centerRow + 1]?.[centerCol - 1] === "S"

        // SAM + SAM
        const pattern2 =
            data[centerRow - 1]?.[centerCol - 1] === "S" &&
            data[centerRow + 1]?.[centerCol + 1] === "M" &&
            data[centerRow - 1]?.[centerCol + 1] === "S" &&
            data[centerRow + 1]?.[centerCol - 1] === "M"

        // MAS + SAM
        const pattern3 =
            data[centerRow - 1]?.[centerCol - 1] === "M" &&
            data[centerRow + 1]?.[centerCol + 1] === "S" &&
            data[centerRow - 1]?.[centerCol + 1] === "S" &&
            data[centerRow + 1]?.[centerCol - 1] === "M"

        // SAM + MAS
        const pattern4 =
            data[centerRow - 1]?.[centerCol - 1] === "S" &&
            data[centerRow + 1]?.[centerCol + 1] === "M" &&
            data[centerRow - 1]?.[centerCol + 1] === "M" &&
            data[centerRow + 1]?.[centerCol - 1] === "S"

        return pattern1 || pattern2 || pattern3 || pattern4
    }

    const found = centerPositions.filter(([row, col]) => checkPattern(row, col))
    return found.length
}

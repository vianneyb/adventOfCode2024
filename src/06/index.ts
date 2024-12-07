/* eslint-disable max-statements */

import { INPUT_01 } from "./input"

/* eslint-disable max-lines-per-function */
const parse = (input: string): string[] => input.trim().split("\n")

/* --------------------------------- part01 --------------------------------- */

const markPath = (
    data: string[],
    startingPosition: { x: number; y: number },
): string[] => {
    let robotX = -1
    let robotY = -1
    const gridHeight = data.length
    const gridWidth = data[0].length

    robotX = startingPosition.x
    robotY = startingPosition.y

    // Convert data to mutable grid
    const grid = data.map((row) => [...row])

    // Direction vectors (up, right, down, left)
    const dx = [0, 1, 0, -1]
    const dy = [-1, 0, 1, 0]
    let direction = 0 // Start facing up

    while (true) {
        // Mark current position
        if (grid[robotY][robotX] !== "#") grid[robotY][robotX] = "X"

        // Calculate next position
        const nextX = robotX + dx[direction]
        const nextY = robotY + dy[direction]

        // Check if out of bounds
        if (nextX < 0 || nextX >= gridWidth || nextY < 0 || nextY >= gridHeight)
            break

        // Check if hit wall
        if (grid[nextY][nextX] === "#") {
            // Turn 90 degrees clockwise
            direction = (direction + 1) % 4
            continue
        }

        // Move robot
        robotX = nextX
        robotY = nextY
    }
    return grid
}
export const part01 = (input: string): number => {
    const data = parse(input)
    const startingPosition = lookForStartingPosition(data)
    const grid = markPath(data, startingPosition)
    // Data represent a grid of nxm
    // Each line represent a row of the grid
    // Each character represent a cell of the grid
    // ^ represent the current position of the robot
    // # represent a wall
    // Other characters represent empty cells
    // The robot traverses the grid in straight lines
    // Each time the robot encounters a wall, it turns 90 degrees clockwise
    // The robot starts going up
    // Each case where the robot moves is marked by a X
    // The goal is to count the number of X
    // If the robot moves out of the grid, it's finished
    // Find starting position (^)

    // Return count of x in grid
    return grid.flat().filter((cell) => cell === "X").length
}

/* --------------------------------- part02 --------------------------------- */

const tryToFindLoop = (grid: string[][], startingPosition): number => {
    // Data represent a grid of nxm
    // Each line represent a row of the grid
    // Each character represent a cell of the grid
    // ^ represent the current position of the robot
    // # represent a wall
    // Other characters represent empty cells
    // The robot traverses the grid in straight lines
    // Each time the robot encounters a wall, it turns 90 degrees clockwise
    // The robot starts going up
    // If the robot moves out of the grid, it's finished
    // You need to detect if the robot is in a loop
    // If it is, return the number of moves it has made
    // If it is not, return -1
    // Console.log("grid")
    // Grid.map((row) => {
    //     Console.log(`--\t${row.join("")}`)
    // })
    // Console.log("===")
    const gridHeight = grid.length
    const gridWidth = grid[0].length

    // Find starting position
    let robotX = startingPosition.x
    let robotY = startingPosition.y

    // Direction: 0 = up, 1 = right, 2 = down, 3 = left
    let direction = 0
    const dx = [0, 1, 0, -1]
    const dy = [-1, 0, 1, 0]

    // Keep track of visited positions with directions
    const visited = new Set<string>()

    while (true) {
        // Create state string for current position and direction
        const state = `${robotX},${robotY},${direction}`

        // If we've seen this state before, we're in a loop
        if (visited.has(state)) return 1

        // Mark current state as visited
        visited.add(state)

        // // Mark current position
        // If (grid[robotY][robotX] !== "#" && grid[robotY][robotX] !== "$")
        //     Grid[robotY][robotX] = direction.toString()

        // Calculate next position
        const nextX = robotX + dx[direction]
        const nextY = robotY + dy[direction]

        // Check if out of bounds
        if (nextX < 0 || nextX >= gridWidth || nextY < 0 || nextY >= gridHeight)
            return -1

        // Check if hit wall
        if (grid[nextY][nextX] === "#" || grid[nextY][nextX] === "$") {
            // Turn 90 degrees clockwise
            direction = (direction + 1) % 4
            continue
        }

        // Move robot
        robotX = nextX
        robotY = nextY
    }
}
export const part02 = (input: string): number => {
    const data = parse(input)
    const startingPosition = lookForStartingPosition(data)
    // Detect path
    const grid = markPath(data, startingPosition)

    let count = 0

    // On each point of the path, marked by a X, try to put a wall #, and check if the robot end in a loop with that new grid
    for (let y = 0; y < grid.length; y++)
        for (let x = 0; x < grid[y].length; x++)
            if (
                grid[y][x] === "X" &&
                !(x === startingPosition.x && y === startingPosition.y)
            ) {
                // Create a new grid with a wall instead of X, try to find loop
                const newGrid = data.map((row) => [...row])
                newGrid[y][x] = "$"
                const result = tryToFindLoop(newGrid, startingPosition)
                if (result !== -1) {
                    count++
                    // Console.log(`Loop found at ${x},${y} with ${result} moves`)
                }
            }
    return count
}
const lookForStartingPosition = (data: string[]): { x: number; y: number } =>
    data.reduce<{ x: number; y: number }>(
        (accumulator, row, y) => {
            const x = row.indexOf("^")
            return x === -1 ? accumulator : { x, y }
        },
        { x: -1, y: -1 },
    )

console.log("start")
part02(INPUT_01)

console.log("end")

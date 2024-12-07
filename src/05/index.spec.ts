import { part01, part02 } from "@/05"
import { EXAMPLE_01_ORDER, EXAMPLE_01_OUTPUT } from "@/05/example"
import { INPUT_01_ORDER, INPUT_01_OUTPUT } from "@/05/input"
import { describe, expect, test } from "bun:test"

describe("05", () => {
    describe("part01", () => {
        test("EXAMPLE_01", () => {
            expect(part01(EXAMPLE_01_ORDER, EXAMPLE_01_OUTPUT)).toBe(143)
        })

        test("INPUT_01", () => {
            expect(part01(INPUT_01_ORDER, INPUT_01_OUTPUT)).toBe(4662)
        })
    })

    describe("part02", () => {
        test("EXAMPLE_01", () => {
            expect(part02(EXAMPLE_01_ORDER, EXAMPLE_01_OUTPUT)).toBe(123)
        })

        test("INPUT_01", () => {
            expect(part02(INPUT_01_ORDER, INPUT_01_OUTPUT)).toBe(5900)
        })
    })
})

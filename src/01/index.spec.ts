/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { part01, part02 } from "@/01"
import { EXAMPLE_01 } from "@/01/example"
import { INPUT_01 } from "@/01/input"
import { describe, expect, test } from "bun:test"

describe("01", () => {
    describe("part01", () => {
        test("EXAMPLE_01", () => {
            expect(part01(EXAMPLE_01)).toBe(11)
        })

        test("INPUT_01", () => {
            expect(part01(INPUT_01)).toBe(1_222_801)
        })
    })

    describe("part02", () => {
        test("EXAMPLE_01", () => {
            expect(part02(EXAMPLE_01)).toBe(31)
        })

        test("INPUT_01", () => {
            expect(part02(INPUT_01)).toBe(1_848_810)
        })
    })
})

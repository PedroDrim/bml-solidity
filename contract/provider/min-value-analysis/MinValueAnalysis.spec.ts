import { expect, test, describe } from "bun:test";
import { UserInfo } from "../../model/user-info/UserInfo";
import type { SimpleTableAnalysis } from "../../model/simple-table-analysis/SimpleTableAnalysis";
import { MinValueAnalysis } from "./MinValueAnalysis";

describe("MeanAnalysis", () => {
    test("1. Devera ser inscanciavel", () => {
        expect(new MinValueAnalysis()).toBeTruthy()
    });

    test("2. 'analysis()' devera ser valido caso possua parametros validos", () => {
        const mock: SimpleTableAnalysis = new MinValueAnalysis()
        const list: UserInfo[] = [
            new UserInfo("ua", "pa", 1),
            new UserInfo("ub", "pb", 2),
            new UserInfo("uc", "pc", 3)
        ]
        expect(mock.analysis(list)).toEqual(1)
    });
});


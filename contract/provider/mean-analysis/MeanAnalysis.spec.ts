import { expect, test, describe } from "bun:test";
import { UserInfo } from "../../model/user-info/UserInfo";
import type { SimpleTableAnalysis } from "../../model/simple-table-analysis/SimpleTableAnalysis";
import { MeanAnalysis } from "./MeanAnalysis";

describe("MeanAnalysis", () => {
    test("1. Devera ser inscanciave'", () => {
        expect(new MeanAnalysis()).toBeTruthy()
    });

    test("2. 'analysis()' devera ser valido caso possua parametros validos", () => {
        const mock: SimpleTableAnalysis = new MeanAnalysis()
        const list: UserInfo[] = [
            new UserInfo("ua", "pa", 1),
            new UserInfo("ub", "pb", 2),
            new UserInfo("uc", "pc", 3)
        ]
        expect(mock.analysis(list)).toEqual(2)
    });
});


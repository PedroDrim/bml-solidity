import { expect, test, describe } from "bun:test";
import { MaxValueAnalysis } from "./MaxValueAnalysis";
import { UserInfo } from "../../model/user-info/UserInfo";
import type { SimpleTableAnalysis } from "../../model/simple-table-analysis/SimpleTableAnalysis";

describe("MaxValueAnalysis", () => {
    test("1. Devera ser inscanciavel", () => {
        expect(new MaxValueAnalysis()).toBeTruthy()
    });

    test("2. 'analysis()' devera ser valido caso possua parametros validos", () => {
        const mock: SimpleTableAnalysis = new MaxValueAnalysis()
        const list: UserInfo[] = [
            new UserInfo("ua", "pa", 1),
            new UserInfo("ub", "pb", 2),
            new UserInfo("uc", "pc", 3)
        ]
        expect(mock.analysis(list)).toEqual(3)
    });
});


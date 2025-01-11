import { expect, test, describe } from "bun:test";
import type { SimpleTableAnalysis } from "./SimpleTableAnalysis";
import type { UserInfo } from "../user-info/UserInfo";

class MockSimpleTableAnalysis implements SimpleTableAnalysis {
    public analysis(userInfoList: UserInfo[]): number {
        return 0
    }
}

describe("SimpleTableAnalysis", () => {
    test("1. Integracao do 'analysis()'", () => {
        const mock: SimpleTableAnalysis = new MockSimpleTableAnalysis()
        expect(mock.analysis([])).toEqual(0)
    });
});


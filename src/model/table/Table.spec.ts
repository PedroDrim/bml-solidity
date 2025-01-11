import { expect, test, describe } from "bun:test";
import { Table } from "./Table";
import type { UserInfo } from "../user-info/UserInfo";

describe("Table", () => {
    test("1. Devera ser instanciavel caso possua valor valido", () => {
        expect(new Table("./data/test.csv")).toBeTruthy()
    });

    test("2. 'userInfoList' devera retornar valor corretamente", async () => {
        const mock: Table = new Table("./data/test.csv")
        const list: UserInfo[] = await mock.userInfoList
        expect(list.length).toEqual(10)
    });
});


import { expect, test, describe } from "bun:test";
import { UserInfo } from "./UserInfo.sol";

describe("UserInfo", () => {
    test("1. Devera ser instanciavel corretamente", () => {
        const userinfo: UserInfo = new UserInfo("user", "password")
        expect(userinfo).toBeTruthy()
    });

    test("2. 'username' devera ser alteravel", () => {
        let userinfo: UserInfo = new UserInfo("user", "password")
        expect(() => { userinfo.user = "newUser" }).toBeTruthy()
    });

    test("3. Metodo 'setPassword()' devera ser executado corretamente", () => {
        let userinfo: UserInfo = new UserInfo("user", "password")
        expect(() => { userinfo.setPassword("newPassword") }).toBeTruthy()
    });

    test("4. 'username' devera ser obtido corretamente", () => {
        const variable: string = "user"
        let userinfo: UserInfo = new UserInfo(variable, "password")
        expect(userinfo.user).toEqual(variable)
    });

    test("5. Metodo 'getPassword()' devera ser executado corretamente", () => {
        let userinfo: UserInfo = new UserInfo("user", "password")
        expect(userinfo.getPassword()).toBeTruthy()
    });
});
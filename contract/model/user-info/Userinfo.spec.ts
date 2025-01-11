import { expect, test, describe } from "bun:test";
import Web3, { Contract } from "web3";
import { ContractBuilder } from "../../../utils/ContractBuilder";

const web3: Web3 = new Web3("http://127.0.0.1:8545")
const contractBuilder: ContractBuilder<[string, string, number]> = new ContractBuilder("Userinfo")
const sender: string = "0x9816353C1078529c5aE16f0cb044CC0a7BD88D31"

describe("UserInfo", () => {
    test("1. Devera ser instanciavel corretamente", async () => {
        const instance: Contract<any> = await contractBuilder.newInstance(web3, ["user", "password", 0], sender)
        expect(instance).toBeTruthy()
    });

    test("2. 'username' devera ser alteravel", async () => {
        const instance: Contract<any> = await contractBuilder.newInstance(web3, ["user", "password", 0], sender)
        expect(async () => { instance.methods.user.call("newUser") }).toBeTruthy()
    });

    test("3. Metodo 'setPassword()' devera ser executado corretamente", async () => {
        const instance: Contract<any> = await contractBuilder.newInstance(web3, ["user", "password", 0], sender)
        expect(async () => { instance.methods.setPassword.call("newPassword") }).toBeTruthy()
    });

    test("4. 'credit' devera ser alteravel", async () => {
        const instance: Contract<any> = await contractBuilder.newInstance(web3, ["user", "password", 0], sender)
        expect(async () => { instance.methods.credit.call(1) }).toBeTruthy()
    });

    test("5. 'username' devera ser obtido corretamente", async () => {
        const expected: string = "user"
        const instance: Contract<any> = await contractBuilder.newInstance(web3, [expected, "password", 0], sender)
        instance.methods.user.call(expected)
        const value: string = await instance.methods.user().call()
        expect(value).toEqual(expected)
    });

    test("6. Metodo 'getPassword()' devera ser executado corretamente", async () => {
        const instance: Contract<any> = await contractBuilder.newInstance(web3, ["user", "password", 0], sender)
        expect(async () => { instance.methods.getPassword.call("newPassword") }).toBeTruthy()
    });

    test("7. 'credit' devera ser obtido corretamente", async () => {
        const expected: number = 1
        const instance: Contract<any> = await contractBuilder.newInstance(web3, ["user", "password", expected], sender)
        instance.methods.credit.call(expected)
        const value: number = await instance.methods.credit().call()
        expect(value).toEqual(expected)
    });
});
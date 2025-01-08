import { expect, test, describe } from "bun:test";
import Web3, { Contract } from "web3";
import { ContractBuilder } from "../../../utils/ContractBuilder";

const web3: Web3 = new Web3("http://127.0.0.1:8545")
const contractBuilder: ContractBuilder<[string, string]> = new ContractBuilder("Userinfo")
const sender: string = "0x9816353C1078529c5aE16f0cb044CC0a7BD88D31"

describe("UserInfo", () => {
    test("1. Devera ser instanciavel corretamente", async () => {
        const instance: Contract<any> = await contractBuilder.newInstance(web3, ["user", "password"], sender)
        expect(instance).toBeTruthy()
    });

    test("2. 'username' devera ser alteravel", async () => {
        const instance: Contract<any> = await contractBuilder.newInstance(web3, ["user", "password"], sender)
        expect(async () => { instance.methods.user.call("newUser") }).toBeTruthy()
    });

    test("3. Metodo 'setPassword()' devera ser executado corretamente", async () => {
        const instance: Contract<any> = await contractBuilder.newInstance(web3, ["user", "password"], sender)
        expect(async () => { instance.methods.setPassword.call("newPassword") }).toBeTruthy()
    });

    test("4. 'username' devera ser obtido corretamente", async () => {
        const expected: string = "user"
        const instance: Contract<any> = await contractBuilder.newInstance(web3, [expected, "password"], sender)
        instance.methods.user.call(expected)
        const value: string = await instance.methods.user().call()
        expect(value).toEqual(expected)
    });

    test("5. Metodo 'getPassword()' devera ser executado corretamente", async () => {
        const instance: Contract<any> = await contractBuilder.newInstance(web3, ["user", "password"], sender)
        expect(async () => { instance.methods.getPassword.call("newPassword") }).toBeTruthy()
    });
});
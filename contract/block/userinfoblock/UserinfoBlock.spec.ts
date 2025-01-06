import { expect, test, describe } from "bun:test";
import Web3, { Contract } from "web3";
import { ContractBuilder } from "../../../utils/ContractBuilder";

const web3: Web3 = new Web3("http://127.0.0.1:8545")
const contractBuilder: ContractBuilder<[]> = new ContractBuilder("UserinfoBlock")
const sender: string = "0x9816353C1078529c5aE16f0cb044CC0a7BD88D31"

describe("UserInfoBlock", () => {
    test("1. Devera ser instanciavel corretamente", async () => {
        const instance: Contract<any> = await contractBuilder.newInstance(web3, [], sender)
        expect(instance).toBeTruthy()
    });

    test("2. Metodo 'genN()'ser executado corretamente", async () => {
        const instance: Contract<any> = await contractBuilder.newInstance(web3, [], sender)
        const response: string[] =  await instance.methods.genN(3, ["u1", "u2", "u3"], ["p1", "p2", "p3"]).call()
        expect(response).toBeArray()
    });
});
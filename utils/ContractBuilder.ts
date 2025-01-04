import type { Contract, ContractDeploySend, Web3 } from "web3"

export class ContractBuilder<I> {

    private _abi: Promise<any>
    private _bytecode: Promise<string>
    private _contract: Contract<any> | undefined = undefined

    public readonly className: string

    constructor(className: string) {
        this.className = className

        this._bytecode = Bun.file("./contract-deploy/" + this.className + ".bin").text()
        this._abi = Bun.file("./contract-deploy/" + this.className + ".abi").json()
    }

    public async newInstance(web3Provider: Web3, constructorArgs: I, owner: string): Promise<Contract<any>> {
        if (this._contract == null)
            this._contract = new web3Provider.eth.Contract(await this._abi)

        const response: ContractDeploySend<any> = this._contract.deploy({
                data: await this._bytecode,
                arguments: constructorArgs
            }).send({
                from: owner,
                gas: "6000000"
            })

        return response
    }
}
import type { Contract, ContractAbi, ContractDeploySend, Web3 } from "web3"

/**
 * Classe responsavel por abstarir a construcao de um contrato
 * @param C Tipo do contrutor
 */
export class ContractBuilder<C> {

    /**
     * Conteudo do Abi
     */
    private _abi: Promise<ContractAbi>

    /**
     * Conteudo do bytecode
     */
    private _bytecode: Promise<string>

    /**
     * Instancia inicial (Sem dono) do contrato
     */
    private _contract: Contract<any> | undefined = undefined

    /**
     * Classe do contrato referente
     */
    public readonly className: string

    /**
     * Construtor publico da class
     * @param className Nome da classe do contrato
     */
    constructor(className: string) {
        this.className = className

        this._bytecode = Bun.file("./contract-deploy/" + this.className + ".bin").text()
        this._abi = Bun.file("./contract-deploy/" + this.className + ".abi").json()
    }

    /**
     * Metodo responsavel por gerar uma instancia do contrato
     * @param web3Provider Provedor da carteira Web3
     * @param constructorArgs Argumentos do construtor da classe
     * @param owner Carteira dona da instancia
     * @returns Instancia do contrato
     */
    public async newInstance(web3Provider: Web3, constructorArgs: C, owner: string): Promise<Contract<any>> {
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
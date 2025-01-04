import Web3, { Contract } from "web3"
import { ContractBuilder } from "./utils/ContractBuilder"


/**
 Classe inicial do programa
 */
class Start {

    /**
     * Provider web3 - Ganache
     */
    private _web3: Web3 = new Web3("http://127.0.0.1:8545")

    /**
     * Lista de endereco de userinfo
     */
    private _userinfoAddressList: string[] = []

    /**
     * Tamanho de dados a serem gerados
     */
    private _tamanho: number

    /**
     * Metodo de inicializaao do projeto
     * @param args Lista de parametros obtidos via console
     */
    constructor(param: String[]) {
        this._tamanho = this._prepareArgs(param)
    }

    /**
     * Metodo de execusao da simulacao
     * @param sender Endereco da carteira Eth
     */
    public async run(sender: string) {
        // Obtendo saldo inicial
        const balanceStart: bigint = await this._web3.eth.getBalance(sender)

        // Gerando gerador de contrato
        const constractBuilder: ContractBuilder<[]> = new ContractBuilder("UserinfoBlock")

        // Gerando nova instancia
        const newBlockInstance: Contract<any> = await constractBuilder.newInstance(this._web3, [], sender)

        // Calculando baseline
        const baseTime: number = await this._simulateBlock(newBlockInstance, 1)

        // Tamanho de bloco
        const blockSize: number = 100
        const iterationAmmount: number = this._tamanho / blockSize

        let totalTime: number = 0.0
        for(let index: number = 0; index < iterationAmmount; index++) {
            totalTime += await this._simulateBlock(newBlockInstance, blockSize)
        }

        // Removendo tempo de execussao do encapsulamento
        totalTime -= baseTime * iterationAmmount

        // Obtendo saldo final
        const balanceEnd: bigint = await this._web3.eth.getBalance(sender)

        // Calculando diferenca da operacao
        const difference: string = this._web3.utils.fromWei(balanceStart - balanceEnd, 'ether')

        // Escrevendo Json
        let response: string = "[OK]Tamanho: " + this._tamanho + "\n"
        response += "[OK]Eth: " + difference + "\n"
        response += "[OK]Tempo: " + totalTime + " ms"

        console.log("[START] Solidity_" + this._tamanho)
        console.log(response)
        console.log("[END] Solidity_" + this._tamanho)
    }

    /**
     * Metodo responsavel por simular a execussao de um bloco de tamanho fixo
     * @param blockInstance Instancia de bloco
     * @param minSize Tamanho do bloco
     * @returns Benchmark do bloco
     */
    private async _simulateBlock(blockInstance: Contract<any>, minSize: number): Promise<number> {
        // Criando lista de parametros
        const userList: string[] = this._createList(minSize, "username")
        const passwordList: string[] = this._createList(minSize, "password")

        // Tempo inicial
        const antes: number = new Date().getTime()

        // Instanciando bloco de userinfo
        const addressList: string[] = await blockInstance.methods.genN(minSize, userList, passwordList).call()
        this._userinfoAddressList.push(...addressList)
        
        // Tempo final
        const time: number = new Date().getTime() - antes
        return time
    }

    /**
     * Metodo responsavel por criar lista de parametros a serem gerados
     * @param size Tamanho de vetor a ser gerado
     * @param tag Flag de parametro
     * @returns Vetor de de resposta
     */
    private _createList(size: number, tag: string): string[] {
        const response: string[] = []
        for(let index: number = 0; index < size; index++) {
            response.push(tag + index)
        }

        return response
    }

    /**
     * Metodo para captura e tratamento dos parametros obtidos via console
     * @param codes Lista de parametros obtidos via console
     * @return Tamanho de usuarios a serem gerados
     */
    private _prepareArgs(codes: String[]): number {
        // Verificando tamanho de argumentos
        if (codes.length != 3) {
            console.log("Parametros invalidos.")
            return -1
        }

        // Obtendo numero de linhas
        const line: number = Number(codes[2])

        // Validando tamanho de linhas
        if (line <= 0) {
            console.log("Quantidade de linhas menor que 1.")
            return -1
        }

        return line
    }
}

const start: Start = new Start(process.argv)
const sender: string = "0xE08255E9f64AfA9D63c87ac3837dc7A6Ec30210d"
await start.run(sender)

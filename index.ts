import Web3, { Contract } from "web3"
import { ContractBuilder } from "./utils/ContractBuilder"
import { Table } from "./src/model/table/Table"


/**
 Classe inicial do programa
 */
class Start {

    /**
     * Provider web3 - Ganache
     */
    private _web3: Web3 = new Web3("http://127.0.0.1:7545")

    /**
     * Lista de endereco de userinfo
     */
    private _userinfoAddressList: string[] = []

    /**
     * Arquivo de dados
     */
    private _fileName: string

    /**
     * Metodo de inicializaao do projeto
     * @param args Lista de parametros obtidos via console
     */
    public constructor(args: string[]) {
        // Validando parametros de entrada
        this._fileName = this._getParam(args)
    }

    /**
     * Metodo de execusao da simulacao
     * @param sender Endereco da carteira Eth
     */
    public async run(sender: string) {

        // Convertendo arquivo em lista de "UserInfo"
        const table: Table = new Table()
        const linesValue: [string, string, number][] = await table.deserializeFile(this._fileName)

        // Obtendo saldo inicial
        const balanceStart: bigint = await this._web3.eth.getBalance(sender)

        // Gerando gerador de contrato
        const constractBuilder: ContractBuilder<[]> = new ContractBuilder("SimulationBlock")

        // Gerando nova instancia
        const newBlockInstance: Contract<any> = await constractBuilder.newInstance(this._web3, [], sender)

        // Calculando baseline
        const baseTime: {time: number[], values: number[]} = await this._simulateBlock(newBlockInstance, linesValue.slice(0, 1))
        console.log(baseTime)

        // Tamanho de bloco
        const blockSize: number = 5//100
        const tamanho: number = linesValue.length
        const iterationAmmount: number = tamanho / blockSize
        const iterationArray: number[] = Array.from({length: iterationAmmount}, (_, k) => k + 1)

        let totalTime: number[] = Array<number>(3)
        this._simulateBlock(newBlockInstance, linesValue)
        //for(let index: number = 0; index < iterationAmmount; index++) {
        //    totalTime += await this._simulateBlock(newBlockInstance, blockSize, linesValue)
        //}

        // Removendo tempo de execussao do encapsulamento
        //totalTime -= baseTime * iterationAmmount

        // Obtendo saldo final
        //const balanceEnd: bigint = await this._web3.eth.getBalance(sender)

        // Calculando diferenca da operacao
        //const difference: string = this._web3.utils.fromWei(balanceStart - balanceEnd, 'ether')

        // Dados de saida
        console.log("[START] Solidity_" + this._fileName)

        //let response: string = "[OK]Arquivo: " + this._fileName + "\n"
        //response += "[OK]Eth: " + difference + "\n"
        //response += "[OK]TempoLeitura: " + (leituraDepois - leituraAntes) + " ms \n"
        //response += "[OK]TempoAnalise: " + (analiseDepois - analiseAntes) + " ms \n"
        //response += "[OK]Max: " + max + "\n"
        //response += "[OK]Min: " + min + "\n"
        //response += "[OK]Min: " + mean

        //console.log(response)    
        console.log("[END] Solidity_" + this._fileName)
    }

    /**
     * Metodo responsavel por simular a execussao de um bloco de tamanho fixo
     * @param blockInstance Instancia de bloco
     * @param minSize Tamanho do bloco
     * @returns Benchmark do bloco
     */
    private async _simulateBlock(blockInstance: Contract<any>, subLinesValue: [string, string, number][]): Promise<{time: number[], values: number[]}> {
        // Criando lista de parametros
        const minSize: number = subLinesValue.length
        const userList: string[] = subLinesValue.map((value: [string, string, number]) => value[0])
        const passwordList: string[] = subLinesValue.map((value: [string, string, number]) => value[1])
        const creditList: number[] = subLinesValue.map((value: [string, string, number]) => value[2])

        // Tempo inicial leitura
        const antesLeitura: number = new Date().getTime()

        // Instanciando bloco de userinfo
        const addressList: string[] = await blockInstance.methods.genN(userList, passwordList, creditList).call()
        this._userinfoAddressList.push(...addressList)
        
        // Tempo final leitura
        const leitura: number = new Date().getTime() - antesLeitura

        // Tempo inicial analise
        const antesAnalise: number = new Date().getTime()
 
        // Valor maximo
        const maxValues: number = await blockInstance.methods.maxValueAnalysis(addressList).call()
        console.log(maxValues)

        // Valor minimo
        const minValues: number = await blockInstance.methods.minValueAnalysis(addressList).call()

        // Valor medio
        const meanValues: number = await blockInstance.methods.meanAnalysis(addressList).call()
        
        // Tempo final analise
        const analise: number = new Date().getTime() - antesAnalise

        const response: {time: number[], values: number[]} = {
            time: [leitura, analise],
            values: [maxValues, minValues, meanValues]
        }

        return response
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
     * @returns Tamanho de usuÃ¡rios Ã¡ serem gerados
     */
    private _getParam(codes: string[]): string {
        if (codes.length != 3) {
            console.log("Parametros invalidos.")
            process.exit(-1)
        }

        return (codes[2])
    }
}

const start: Start = new Start(process.argv)
const sender: string = "0xCaeB555d4A52Cc0D289A870C977A862B04d68606"//"0xE08255E9f64AfA9D63c87ac3837dc7A6Ec30210d"
await start.run(sender)

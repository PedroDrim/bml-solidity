import { UserInfo } from "./src/model/userinfo/UserInfo.sol"

/**
 Classe inicial do programa
 */
export class Start {

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

    public run(): void {
        // Validando tamanho de entradas
        if (this._tamanho != -1) {
            // Iniciando timer
            const antes: number = new Date().getTime()

            let list: UserInfo[] = []

            // Criando UserInfo
            for (let index: number = 0; index < this._tamanho; index++) {
                const user: string = "user" + index
                const password: string = "password" + index
                list.push(new UserInfo(user, password))
            }

            // Calculando benchmark
            const time: number = new Date().getTime() - antes

            // Escrevendo Json
            let response: string = "[OK]Tamanho: " + this._tamanho + "\n"
            response += "[OK]Tempo: " + time + " ms"
            
            console.log("[START] Typescript_" + this._tamanho)
            console.log(response)
            console.log("[END] Typescript_" + this._tamanho)
        }
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

// Iniciando simulacao
const start: Start = new Start(process.argv)
start.run()

import { type BunFile } from "bun";

/**
 * Classe para gerenciar uma tabela de usuarios
 */
export class Table {

    /**
     * Metodo para conversão do arquivo .csv em uma lista de usuarios
     * @param fileName Nome do arquivo
     * @returns Lista convertida de usuarios 
     */
    public async deserializeFile(fileName: string): Promise<[string, string, number][]> {
        const file: BunFile = Bun.file(fileName)
        const fullFile: string = await file.text()
        const lines: string[] = fullFile.split("\n")

        const list: [string, string, number][] = lines.slice(1).filter((line: string) => line != "").map(this._convertToUserInfo)
        return list
    }

    /**
     * Metodo privado para converter linha em usuario
     * @param line Linha a ser convertida
     * @returns Usuario existente da linha
     */
    private _convertToUserInfo(line: string): [string, string, number] {
        let values: string[] = line.split(",")

        const user: string = values[0].trim()
        const password: string = values[1].trim()
        const credit: number = Number(values[2].trim())

        const response: [string, string, number] = [user, password, credit]
        return response
    } 
}
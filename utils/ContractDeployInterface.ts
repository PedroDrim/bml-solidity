import type { HexString } from "web3"

export interface ContractDeployInterface {

    decodeData(data: HexString): {
        __method__: string, 
        __length__: number
    }

    deployOptions: {
        data?: HexString;
        input?: HexString;
        arguments?: any;
    }

    encodeABI(): string
}
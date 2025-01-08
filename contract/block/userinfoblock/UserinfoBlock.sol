//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contract/model/user-info/Userinfo.sol";

/**
 * Bloco de simulacao
 */
contract UserinfoBlock {

    /**
     * Metodo responsavel por gerar 'N' instancias do contrato 'Userinfo'
     * @param size Tamanho de instancias a serem geradas
     * @param userList Lista de tamanho 'N' contendo o nome dos usuarios do bloco
     * @param passwordList Lista de tamanho 'N' contendo a senha dos usuarios do bloco
     * @return Vetor contendo as 'N' instancias do contrato geradas
     */
    function genN(uint size, string[] memory userList, string[] memory passwordList) public returns (Userinfo[] memory) {
        Userinfo[] memory response = new Userinfo[](size);

        for(uint index = 0; index < size; index++) {
            response[index] = new Userinfo(userList[index], passwordList[index]);
        }

        return response;
    }

}

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contract/model/user-info/Userinfo.sol";
import "contract/provider/max-value-analysis/MaxValueAnalysis.sol";
import "contract/provider/min-value-analysis/MinValueAnalysis.sol";
import "contract/provider/mean-analysis/MeanAnalysis.sol";
import "contract/model/simple-table-analysis/SimpleTableAnalysis.sol";

/**
 * Bloco de simulacao
 */
contract SimulationBlock {

    /**
     * Metodo responsavel por gerar 'N' instancias do contrato 'Userinfo'
     * @param userList Lista de tamanho 'N' contendo o nome dos usuarios do bloco
     * @param passwordList Lista de tamanho 'N' contendo a senha dos usuarios do bloco
     * @param creditList Lista de tamanho 'N' contendo o credito dos usuarios do bloco
     * @return response Vetor contendo as 'N' instancias do contrato geradas
     */
    function genN(string[] calldata userList, string[] calldata passwordList, uint[] calldata creditList) public returns (Userinfo[] memory) {
        uint size = userList.length;
        Userinfo[] memory response = new Userinfo[](size);

        for(uint index = 0; index < size; index++) {
            response[index] = new Userinfo(userList[index], passwordList[index], creditList[index]);
        }

        return response;
    }

    /**
     * Metodo responsavel por obter o valor maximo do vetor de Userinfo
     * @param userInfoList Lista de userinfo
     * @return number Valor maximo de credito do vetor
     */
    function maxValueAnalysis(Userinfo[] calldata userInfoList) public returns (uint) {
        SimpleTableAnalysis simulation = new MaxValueAnalysis();
        return simulation.analysis(userInfoList);
    }

    /**
     * Metodo responsavel por obter o valor minimo do vetor de Userinfo
     * @param userInfoList Lista de userinfo
     * @return number Valor minimo de credito do vetor
     */
    function minValueAnalysis(Userinfo[] calldata userInfoList) public returns (uint) {
        SimpleTableAnalysis simulation = new MinValueAnalysis();
        return simulation.analysis(userInfoList);
    }

    /**
     * Metodo responsavel por obter o valor medio do vetor de Userinfo
     * @param userInfoList Lista de userinfo
     * @return number Valor medio de credito do vetor
     */
    function meanAnalysis(Userinfo[] calldata userInfoList) public returns (uint) {
        SimpleTableAnalysis simulation = new MeanAnalysis();
        return simulation.analysis(userInfoList);
    }
}
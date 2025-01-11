//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contract/model/user-info/Userinfo.sol";
import "contract/model/simple-table-analysis/SimpleTableAnalysis.sol";

/**
 * Contrato de analise que implementa a interface "SimpleTableAnalysis"
 */
contract MinValueAnalysis is SimpleTableAnalysis {
   
    /**
     * Método de interface, responsável por realizar obter o valor minimo de credit em uma lista de usuarios
     * @param userInfoList Lista de usuarios
     * @return Valor maximo de credit 
     */
    function analysis(Userinfo[] calldata userInfoList) external view returns(uint) {
        uint minValue = 1000000;
        for (uint index = 0; index < userInfoList.length; index++) {
            Userinfo userInfo = userInfoList[index];
            uint credit = userInfo.credit();
            if (credit < minValue) {
                minValue = credit;
            }
        }
        return minValue;
    }
}
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contract/model/user-info/Userinfo.sol";
import "contract/model/simple-table-analysis/SimpleTableAnalysis.sol";

/**
 * Contrato de analise que implementa a interface "SimpleTableAnalysis"
 */
contract MeanAnalysis is SimpleTableAnalysis {
   
    /**
     * Método de interface, responsável por realizar obter a media de credit em uma lista de usuarios
     * @param userInfoList Lista de usuarios
     * @return Valor medio de credit 
     */
    function analysis(Userinfo[] memory userInfoList) external view returns(uint) {
        uint media = 0;
        for (uint index = 0; index < userInfoList.length; index++) {
            Userinfo userInfo = userInfoList[index];
            media += userInfo.credit();
        }

        media /= userInfoList.length;
        return media;
    }
}
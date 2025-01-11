//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contract/model/user-info/Userinfo.sol";

/**
 * Interface para analise de uma lista de usuarios
 */
interface SimpleTableAnalysis {

    /**
     * Método de interface, responsável por realizar uma analise em uma lista de usuarios
     * @param userInfoList Lista de usuarios
     * @return Resultado da analise
     */
    function analysis(Userinfo[] calldata userInfoList) external view returns (uint);
}
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * Informacoes do usuario
 */
contract Userinfo {

    /**
     * Nome do usuario
     */
    string public user;
    
    /**
     * Senha do usuario
     */
    string private _password;

    /**
     * Construtor público da classe
     * @param userC Nome do usuario
     * @param passwordC Senha do usuario
     */
    constructor(string memory userC, string memory passwordC)  {
        user = userC;
        _password = passwordC;
    }

    /**
     * Obtem a senha do usuario criptografada
     * @return Senha do usuario criptografada
     */
    function getPassword() public view returns (string memory) {
        return _cryptPassword(_password);
    }

    /**
     * Atualiza a senha do usuario
     * @param password Nova senha do usuario
     */
    function setPassword(string memory password) public {
        _password = password;
    }

    /**
     * Metodo privado para encriptar a senha do usuario
     * @param password Senha a ser encriptada
     * @return Nova senha encriptada
     */
    function _cryptPassword(string memory password) private pure returns (string memory) {
        bytes memory baseBytes = bytes(password);
        string memory tempValue = new string(baseBytes.length);
        bytes memory newValue = bytes(tempValue);


        for(uint i = 0; i < baseBytes.length; i++) {
            newValue[baseBytes.length - i - 1] = baseBytes[i];
        }

        password = string.concat("HASH", string(newValue));
        password = string.concat(password, "000");
        return password;
    }
}
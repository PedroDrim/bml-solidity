// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../../model/userinfo/UserInfo.sol";

contract UserInfoBlock {

    uint private _currentSize;
    uint private _maxSize;
    UserInfo[] private _userInfoList;

    constructor(uint maxSizeC) {
        _currentSize = 0;
        _maxSize = maxSizeC;
        _userInfoList = new UserInfo[](maxSizeC);
    }

    function getRemains() public view returns (uint) {
        return _currentSize - _maxSize;
    }

    function insert(string[] memory userList, string[] memory passwordList) public returns (uint) {
        require(userList.length == passwordList.length, "Parametros desiguais");
        require(_currentSize + _userInfoList.length <= _maxSize, "Bloco minerado");

        uint tamanho = userList.length;
        for(uint index = 0; index < tamanho; index++) {
            _userInfoList[_currentSize + index] = new UserInfo(userList[index], passwordList[index]);
        }
    
        _currentSize += tamanho;
        return _maxSize - _currentSize;
    }
}
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../model/userinfo/Userinfo.sol";

contract UserinfoBlock {

    function genN(uint size, string[] memory userList, string[] memory passwordList) public returns (Userinfo[] memory) {
        Userinfo[] memory response = new Userinfo[](size);

        for(uint index = 0; index < size; index++) {
            response[index] = new Userinfo(userList[index], passwordList[index]);
        }

        return response;
    }

}
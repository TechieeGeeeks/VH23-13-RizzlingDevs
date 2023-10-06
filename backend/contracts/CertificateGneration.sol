// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Certification {
    address public immutable owner;
    constructor(){
        owner=msg.sender;
    }
    uint256 public id =10;
    
    struct Certificate {
        string candidate_name;
        string org_name;
        string course_name;
        uint256 expiration_date; 
    }

    mapping(bytes32 => Certificate) public certificates;

    event certificateGenerated(bytes32 indexed _certificateIdBlockchain);

    function generateCertificate(
        string memory _id,
        string memory _candidate_name,
        string memory _org_name, 
        string memory _course_name, 
        uint256 _expiration_date) public returns (bool){
            
        bytes32 byte_id = encodeStringBytes(_id);
        require(certificates[byte_id].expiration_date < block.timestamp, "Certificate with given id already exists");
        uint256 expiry_date = block.timestamp + (_expiration_date*86400);
        certificates[byte_id] = Certificate(_candidate_name, _org_name, _course_name, expiry_date);
        emit certificateGenerated(byte_id);
        return true;
    }

    function getData(string memory _id) public view returns(string memory, string memory, string memory, uint256) {
        bytes32 byte_id = encodeStringBytes(_id);
        Certificate memory temp = certificates[byte_id];
        require(block.timestamp<temp.expiration_date, "Certificate Has been expired");
        return (temp.candidate_name, temp.org_name, temp.course_name, temp.expiration_date);
    }

    function encodeStringBytes(string memory source) public pure returns (bytes32 ) {
        bytes memory someString = bytes(source);
        if(someString.length==0){
            return 0x0;
        }
        return(keccak256(someString));
    }

    function stringSlot ()public pure returns(bytes32 ){
        bytes32 cool =  keccak256("01");
        return cool;
    }
}


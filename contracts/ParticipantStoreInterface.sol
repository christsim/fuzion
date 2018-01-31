pragma solidity ^0.4.17;

// ParticipantStore
//  - Stores a list of participants
//  - only owner can add / remove participants
//  - only participants or owner can get accounts and details of participants

interface ParticipantStoreInterface {

    function addParticipant(address account, bytes32 name) public;
    function removeParticipant(address account) public;

    function getParticipant(address account) public view returns (address, bytes32);
    function getParticipantAccounts() public view returns (address[]);
    function getParticipantCount() public view returns (uint);

}
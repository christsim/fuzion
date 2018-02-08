pragma solidity ^0.4.19;

import "./ParticipantStoreInterface.sol";

// ParticipantStore
//  - Stores a list of participants
//  - only owner can add / remove participants
//  - only participants or owner can get accounts and details of participants

contract ParticipantStore is ParticipantStoreInterface {

    modifier onlyOwner() { 
        require(msg.sender == _owner);
        _;
    }

    modifier onlyActiveParticipants() {
        require(msg.sender == _owner || 
                accountToParticipant[msg.sender].active);
        _;
    }

    struct Participant {
        bool active;
        address account;
        bytes32 name;
    }

    address private _owner;

    address[] private participants;
    mapping (address => Participant) private accountToParticipant;

    function ParticipantStore() public {
        _owner = msg.sender;
    }

    function addParticipant(address account, bytes32 name) public onlyOwner {
        Participant memory participant = Participant(true, account, name);
        accountToParticipant[account] = participant;
        participants.push(account);
    }

    function removeParticipant(address account) public onlyOwner {
        accountToParticipant[account].active = false;
    }

    // returns account and name
    function getParticipant(address account) public view onlyActiveParticipants returns (address, bytes32) {
        require(accountToParticipant[account].active);
        Participant memory participant = accountToParticipant[account];
        return (participant.account, participant.name);
    }

    function getParticipantAccounts() public view onlyActiveParticipants returns (address[]) {
        address[] memory activeAddresses = new address[](getParticipantCount());

        uint currentCounter = 0;
        for (uint i = 0; i < participants.length; i++) {
            address participantAddress = participants[i];
            Participant memory participant = accountToParticipant[participantAddress];
            if (participant.active) {
                activeAddresses[currentCounter++] = participantAddress;
            }
        }
        return activeAddresses;
    }

    // only active
    function getParticipantCount() public view onlyActiveParticipants returns (uint) {
        uint count = 0;
        for (uint i = 0; i < participants.length; i++) {
            address participantAddress = participants[i];
            Participant memory participant = accountToParticipant[participantAddress];
            if (participant.active) {
                count++;
            }
        }
        return count;
   }

}
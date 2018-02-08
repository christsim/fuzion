const ParticipantStoreAbstraction = artifacts.require('ParticipantStore');

module.exports = function(deployer) {
  deployer.deploy(ParticipantStoreAbstraction);
};

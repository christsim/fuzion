
const ParticipantStoreAbtraction = artifacts.require('ParticipantStore');
let instance;

toAscii = function(hex) {
  var str = '',
      i = 0,
      l = hex.length;
  if (hex.substring(0, 2) === '0x') {
      i = 2;
  }
  for (; i < l; i+=2) {
      var code = parseInt(hex.substr(i, 2), 16);
      if (code === 0) continue; // this is added
      str += String.fromCharCode(code);
  }
  return str;
};

toBytes = function(hex) {
  var i = 0,
      l = hex.length;
  if (hex.substring(0, 2) === '0x') {
      i = 2;
  }
  var bytes = [];
  for (; i < l; i+=2) {
      var code = parseInt(hex.substr(i, 2), 16);
      if (code === 0) continue; // this is added
      bytes.push(code);
  }
  return bytes;
};

contract('ParticipantStore', (accounts) => {
  beforeEach(async() => {
    
  });

  it('can add participants', async() => {
    let instance = await ParticipantStoreAbtraction.new();

    await instance.addParticipant(accounts[1], "Chris");
    await instance.addParticipant(accounts[2], "Badi");
    await instance.addParticipant(accounts[3], "Mandla");
    await instance.addParticipant(accounts[4], "Theo");

    {
      var length = await instance.getParticipantCount();
      assert.strictEqual(length.toNumber(), 4);
    }
  });

  it('can get participant details', async() => {
    let instance = await ParticipantStoreAbtraction.new();

    await instance.addParticipant(accounts[1], "Chris");
    await instance.addParticipant(accounts[2], "Badi");
    await instance.addParticipant(accounts[3], "Mandla");
    await instance.addParticipant(accounts[4], "Theo");

    {
      var participant = await instance.getParticipant(accounts[2]);
      var name = toAscii(participant[1]);
      assert.deepEqual(name, "Badi");
    }

    {
      var participant = await instance.getParticipant(accounts[3]);
      var name = toAscii(participant[1]);
      assert.deepEqual(name, "Mandla");
    }
  });

  it('can get all participant accounts', async() => {
    let instance = await ParticipantStoreAbtraction.new();

    await instance.addParticipant(accounts[1], "Chris");
    await instance.addParticipant(accounts[2], "Badi");
    await instance.addParticipant(accounts[3], "Mandla");
    await instance.addParticipant(accounts[4], "Theo");

    {
      var numberOfActiveAccounts = await instance.getParticipantCount();
      assert.equal(numberOfActiveAccounts, 4);
    }

    {
      var participantAccounts = await instance.getParticipantAccounts();
      assert.equal(participantAccounts.length, 4);
      assert.equal(participantAccounts[0], accounts[1]);
      assert.equal(participantAccounts[1], accounts[2]);
      assert.equal(participantAccounts[2], accounts[3]);
      assert.equal(participantAccounts[3], accounts[4]);
    }
  });

  it('cant get participant details that doesnt exist', async() => {
    let instance = await ParticipantStoreAbtraction.new();

    await instance.addParticipant(accounts[1], "Chris");
    await instance.addParticipant(accounts[2], "Badi");
    await instance.addParticipant(accounts[3], "Mandla");
    await instance.addParticipant(accounts[4], "Theo");

    var participant = await instance.getParticipant(accounts[1]);

    try {
      var participant = await instance.getParticipant(accounts[5]);
      assert.fail("should not be able to get an unknown participant.");
    } catch(err) {
      assert.equal(err.message, "VM Exception while processing transaction: revert");
    }
  });  

  it('only admin can add participants', async() => {
    let instance = await ParticipantStoreAbtraction.new();

    await instance.addParticipant(accounts[1], "Chris");

    try {
      await instance.addParticipant(accounts[2], "Badi", {from: accounts[1]});
      assert.fail("should not be able to add participant.");
    } catch(err) {
      assert.equal(err.message, "VM Exception while processing transaction: revert");
    }
  });

  it('only active participants can get other participant details', async() => {
    let instance = await ParticipantStoreAbtraction.new();

    await instance.addParticipant(accounts[1], "Chris");
    await instance.addParticipant(accounts[2], "Badi");
    await instance.addParticipant(accounts[3], "Mandla");
    await instance.addParticipant(accounts[4], "Theo");

    await instance.removeParticipant(accounts[1]);

    try {
      await instance.getParticipant(accounts[2], {from: accounts[1]});
      assert.fail("should not be able to get participant if participant has been removed.");
    } catch(err) {
      assert.equal(err.message, "VM Exception while processing transaction: revert");
    }
  });

  it('only active participants are returned after a remove', async() => {
    let instance = await ParticipantStoreAbtraction.new();

    await instance.addParticipant(accounts[1], "Chris");
    await instance.addParticipant(accounts[2], "Badi");
    await instance.addParticipant(accounts[3], "Mandla");
    await instance.addParticipant(accounts[4], "Theo");

    await instance.removeParticipant(accounts[2]);

    {
      var numberOfActiveAccounts = await instance.getParticipantCount();
      assert.equal(numberOfActiveAccounts, 3);
    }

    {
      var participantAccounts = await instance.getParticipantAccounts();
      assert.equal(participantAccounts.length, 3);
      assert.equal(participantAccounts[0], accounts[1]);
      assert.equal(participantAccounts[1], accounts[3]);
      assert.equal(participantAccounts[2], accounts[4]);
    }
  });
  
});
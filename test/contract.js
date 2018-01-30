const Contract = artifacts.require('./Contract.sol');

contract('Contract', function(accounts) {

  let contract, num;

  beforeEach(async () => {
    num = 8;
    contract = await Contract.new(num);
  });

  it('Should return getNum as owner', function(done) {
    contract.getNum()
      .then(res => {
        assert.equal(res, num);
        done();
      });
  });

  it("Should fail if calling getNum not as owner", function(done) {
    contract.getNum({ from: accounts[1] })
      .then(assert.fail)
      .catch(err => {
        assert.equal(err.message, 'VM Exception while processing transaction: revert');
        done();
      });
  });

  it('Should log event with correct parameters when calling log', function() {
    contract.log(5);
    return new Promise((resolve, reject) => {
      const eventListener = contract.LogCode({}, (err, res) => {
        assert.equal(res.args.eventCode, 5);
        eventListener.stopWatching();
        resolve();
      });
    });
  });

});

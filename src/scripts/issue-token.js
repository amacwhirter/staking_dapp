const StakingDapp = artifacts.require('Staking_Dapp');

module.exports = async function(callback) {
  let stakingDapp = await StakingDapp.deployed();
  await stakingDapp.issuedummy();

  console.log('dummy token issued');
  callback();
}

const fs = require('fs')
var kip37Token = artifacts.require('KIP37');



module.exports = function(deployer) {
  deployer.deploy(kip37Token, 'KlaytnNFT', 'NFT')
  .then(() => {
    // Record recently deployed contract address to 'deployedAddress' file.
    if (kip37Token._json) {
      fs.mkdir('../frontend/deployed', { recursive: true }, (err) => {
        if (err) throw err;
      });
      // Save abi file to deployedABI.
      fs.writeFile(
        '../frontend/deployed/kip17TokenABI',
        JSON.stringify(kip37Token._json.abi, 2),
        (err) => {
          if (err) throw err
          console.log(`The abi of ${kip37Token._json.contractName} is recorded on deployedABI file`)
        })
      }
      fs.writeFile(
        '../frontend/deployed/kip17TokenAddress',
        kip37Token.address,
        (err) => {
          if (err) throw err
          console.log(`The deployed contract address * ${kip37Token.address} * is recorded on deployedAddress file`)
      })
    })
}


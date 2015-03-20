var allotment = require('ethereum-tests').blockchainTests.basicBlockChain.allotment
var jsonBC = require('ethereum-tests').blockchainTests.basicBlockChain.blockchain
var Block = require('ethereumjs-lib').Block
var Account = require('ethereumjs-lib').Account
var Transaction = require('ethereumjs-lib').Transaction
var ethUtil = require('ethereumjs-util')
var App = require('node-ethereum')

var accountAddress = new Buffer('2a630ddb127c5525c118627a95cff488648b0c15', 'hex')

var app

module.exports = function startRpc() {

  app = new App({ rpc: true, network: false })
  app.start(setupGenesis)

}


function setupGenesis(){

  // setup genesis
  console.log('allotment:',allotment)
  app.vm.generateGenesis(allotment, function(){
    var block = new Block()
    block.header.stateRoot = app.vm.trie.root
    app.blockchain.addBlock(block, addBlocks)
  })

}

function addBlocks() {

  jsonBC.reverse()
  //lets only process 4 blocks
  jsonBC = jsonBC.slice(0, 4)
  console.log(jsonBC)
  var blocks = jsonBC.map(function(json) {
    return new Block(json)
  })
  console.log('processing blocks')
  app.blockProcesser.run(blocks, initialBlocksComplete)

}

function initialBlocksComplete() {
  console.log('creating account')
  var account = new Account()
  account.balance = new Buffer('abcd1234', 'hex')
  app.vm.trie.put(accountAddress, account.serialize(), function() {
    setupContract()
  })
}

function setupContract() {
  var code = new Buffer('60056013565b61014f8061003a6000396000f35b620f42406000600033600160a060020a0316815260200190815260200160002081905550560060e060020a600035048063d0679d3414610020578063e3d670d71461003457005b61002e600435602435610049565b60006000f35b61003f600435610129565b8060005260206000f35b806000600033600160a060020a03168152602001908152602001600020541061007157610076565b610125565b806000600033600160a060020a03168152602001908152602001600020908154039081905550806000600084600160a060020a031681526020019081526020016000209081540190819055508033600160a060020a03167fb52dda022b6c1a1f40905a85f257f689aa5d69d850e49cf939d688fbe5af594660006000a38082600160a060020a03167fb52dda022b6c1a1f40905a85f257f689aa5d69d850e49cf939d688fbe5af594660006000a35b5050565b60006000600083600160a060020a0316815260200190815260200160002054905091905056', 'hex');

  getNonce(function(err, nonce){
    var tx = new Transaction({
      data: code,
      gasLimit: 5000,
      gasPrice: 1,
      nonce: nonce
    })
    tx.sign(new Buffer('b9b32ec346a890e30c998dce24b92fe1c8556bacd9a7cf272bb6c357e67da1de', 'hex'));
    app.xhrRpc.rpc.eth_signedTransact([tx.serialize().toString('hex')], function(err, r){
      console.log('address:', r.toString('hex'))
      done()
    })
  })

  function getNonce(cb) {
    var trie = app.vm.trie
    trie.get(accountAddress, function(err, data) {
      if (err) return cb(err);
      var account = new Account(data);

      cb(null, account.nonce );
    });
  }

}


function done() {
  console.log('ready!')
}
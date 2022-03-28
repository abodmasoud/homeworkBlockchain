const SHA256 = require("crypto-js/sha256");
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }
  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);
  }
}
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock() {
    return new Block(0, "25/12/2020", "Genesis block", "0");
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

//mine
let blockChainCoin = new Blockchain();

console.log("Mining block 1...");
blockChainCoin.addBlock(new Block(1, "18/02/2021", { amount: 4 }));

console.log("Mining block 2...");
blockChainCoin.addBlock(new Block(2, "18/04/2021", { amount: 8 }));

console.log("Mining block 3...");
blockChainCoin.addBlock(new Block(3, "18/04/2021", { amount: 10 }));

console.log(JSON.stringify(blockChainCoin, null, 4));

const file = require("fs");

//Reading
function loadJSON(filename = "") {
  return JSON.parse(
    file.existsSync(filename) ? file.readFileSync(filename).toString() : '""'
  );
}

//Writing
function saveJSON(filename = "") {
  return file.writeFileSync(filename, JSON.stringify(blockChainCoin, null, 2));
}

//Load
const data = loadJSON("data.json");

//Add Block
console.log("Mining block 4...");
blockChainCoin.addBlock(new Block(4, "18/04/2021", { amount: 12 }));

console.log("Mining block 5...");
blockChainCoin.addBlock(new Block(5, "18/04/2021", { amount: 14 }));

console.log("Mining block 6...");
blockChainCoin.addBlock(new Block(6, "18/04/2021", { amount: 8 }));

console.log("Mining block 7...");
blockChainCoin.addBlock(new Block(7, "18/04/2021", { amount: 4 }));

console.log("Mining block 8...");
blockChainCoin.addBlock(new Block(8, "18/04/2021", { amount: 10 }));

console.log("Mining block 9...");
blockChainCoin.addBlock(new Block(9, "18/04/2021", { amount: 25 }));

//data.json عند اضافة اي بلوك جديد تطبع في ملف ال 
// console.log("Mining block 10...");
// blockChainCoin.addBlock(new Block(10, "18/04/2021", { amount: 25 }));

//Save
saveJSON("data.json", data);

//print
console.log(
  loadJSON('data.json')
);

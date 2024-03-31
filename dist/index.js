var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_starknet = require("starknet");

// src/wallet.ts
var walllet = {
  privateKey: "0x05af2d83bb7f69a436b89a0134d56969a50f65b5cf785b3d50caa5f5cbd559a7",
  account: "0x06757EF15b5F149b5C804A13CB2da360DcFa6e91F95E7eAf37Bb0d27a1Ed4156",
  toEthAddress: "0x7b597a25563155bFE3447Ba74b7F99B91cEf284D"
};
var wallet_default = walllet;

// src/index.ts
var import_web3 = __toESM(require("web3"));
var provider = new import_starknet.Provider({ nodeUrl: import_starknet.constants.NetworkName.SN_GOERLI });
async function ethBridgeTest() {
  const ethBridgeAdddress = "0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82";
  const { abi: ethBridgeAbi } = await provider.getClassAt(ethBridgeAdddress);
  if (ethBridgeAbi === void 0) {
    throw new Error("no abi.");
  }
  const ethBridgeContract = new import_starknet.Contract(ethBridgeAbi, ethBridgeAdddress, provider);
  const privateKey0 = wallet_default.privateKey;
  const account0Address = wallet_default.account;
  const account0 = new import_starknet.Account(provider, account0Address, privateKey0);
  ethBridgeContract.connect(account0);
  let l1_recipient = "0x7b597a25563155bFE3447Ba74b7F99B91cEf284D";
  let amount = "10000000000000000";
  const myCall = ethBridgeContract.populate("initiate_withdraw", [l1_recipient, amount]);
  const res = await ethBridgeContract.initiate_withdraw(myCall.calldata);
  console.log("res.transaction_hash:", res.transaction_hash);
}
async function main() {
  await ethBridgeTest();
}
main();
//# sourceMappingURL=index.js.map
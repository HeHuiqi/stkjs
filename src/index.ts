import { Provider, Contract, Account, constants } from 'starknet';
import walllet from './wallet';
import Web3 from 'web3';

const provider = new Provider({ nodeUrl: constants.NetworkName.SN_GOERLI });

async function ethTest() {
    const ethAdddress = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
    const { abi: ethAbi } = await provider.getClassAt(ethAdddress);
    if (ethAbi === undefined) {
        throw new Error('no abi.');
    }
    const ethContract = new Contract(ethAbi, ethAdddress, provider);

    const name = await ethContract.name()
    console.log('name:',Web3.utils.toAscii(name.toString(16)));

    const decimals = await ethContract.decimals();
    console.log('decimals:',decimals)

    let account = walllet.account
    const balance = await ethContract.balance_of(account);
    console.log('balance:',balance)

}
async function ethBridgeTest() {
    const ethBridgeAdddress = '0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82';
    const { abi: ethBridgeAbi } = await provider.getClassAt(ethBridgeAdddress);
    if (ethBridgeAbi === undefined) {
        throw new Error('no abi.');
    }
    const ethBridgeContract = new Contract(ethBridgeAbi, ethBridgeAdddress, provider);

    const privateKey0 = walllet.privateKey;
    const account0Address = walllet.account;
    const account0 = new Account(provider, account0Address, privateKey0);

    ethBridgeContract.connect(account0);

    //  initiate_withdraw(l1_recipient,amount)
    let l1_recipient = walllet.toEthAddress
    let amount = '10000000000000000' // 0.01
    const myCall = ethBridgeContract.populate('initiate_withdraw', [l1_recipient, amount]);
    const res = await ethBridgeContract.initiate_withdraw(myCall.calldata,{ maxFee: 1e15 });
    // https://testnet.starkscan.co/tx/0x3530cc470e3d3df1f2a9718be1345688649b3fcd69490ee4d77c61a8e1c4ea5
    // https://testnet.starkscan.co/tx/0x5d279664aa45ef5a2983b3371442a0c3b3bf6acba903ab93a12b68d93ca2b35
    // res.transaction_hash: 0x3530cc470e3d3df1f2a9718be1345688649b3fcd69490ee4d77c61a8e1c4ea5
    let tx = 'https://testnet.starkscan.co/tx/' + res.transaction_hash
    console.log('res.transaction_hash:',tx)

    //等待交易完成
    // await provider.waitForTransaction(res.transaction_hash)


}

async function main() {
    // await ethTest()
    await ethBridgeTest() 
}

main()
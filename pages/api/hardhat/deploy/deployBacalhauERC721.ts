// What I don't like about the inbuilt deploy script is the inability
// to pass args/params into the function from the terminal.
// This is why I default to a task for deployment
// could MAYBE something like npx hardhat run scripts/deploy.js --network rinkeby --constructor-args arguments/greeter.arguments.js
// but too much hassle for me

import hre from 'hardhat';
import path from 'path';

import type { BacalhauERC721 } from '../typechain-types/contracts/BacalhauERC721';
import type { BacalhauERC721__factory } from '../typechain-types/factories/contracts/BacalhauERC721__factory';

/*
   // ethers.providers.getNetwork('filecoinHyperspace');
    //ethers.providers.getNetwork(chainId).match(/3141/)
    // const netw = ethers.providers.getNetwork(hre.network.name);
    // console.log('netw', typeof netw, netw);
    const nw = networkMap[hre.network.name as keyof typeof networkMap].rpc;
    // const owner = await ethers.getSigners();
    // console.log('owner', owner);
    // const owner = new ethers.Wallet(
    //   process.env.WALLET_PRIVATE_KEY || 'undefined',
    //   ethers.provider
    // );
*/

async function main() {
  console.log('Bacalhau721 deploying....');
  // const owner = await hre.ethers.getSigners();
  const owner = new hre.ethers.Wallet(
    process.env.WALLET_PRIVATE_KEY || 'undefined',
    hre.ethers.provider
  );
  const bacalhauERC721Factory: BacalhauERC721__factory = <
    BacalhauERC721__factory
  >await hre.ethers.getContractFactory('BacalhauERC721', owner);

  // const priorityFee = await hre.run('callRPC', {
  //   method: 'eth_maxPriorityFeePerGas',
  //   params: [],
  // });

  const bacalhauERC721: BacalhauERC721 = <BacalhauERC721>(
    await bacalhauERC721Factory
      .deploy
      //   {
      // timeout: 180000
      //   maxPriorityFeePerGas: priorityFee,
      // }
      ()
  );
  await bacalhauERC721.deployed();
  console.log('bacalhauERC721 deployed to ', bacalhauERC721.address);

  //Optional: Log to a file for reference
  // await hre.run('logToFile', {
  //   filePath: path.resolve(__dirname, 'log.txt'),
  //   data: {
  //     network: 'hyperspace',
  //     chainId: bacalhauERC721.deployTransaction.chainId,
  //     owner: bacalhauERC721.deployTransaction.from,
  //     address: bacalhauERC721.address,
  //     tx: bacalhauERC721.deployTransaction.hash,
  //     explorerUrl: `https://hyperspace.filscan.io/address/general?address=${bacalhauERC721.address}`,
  //   },
  // });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

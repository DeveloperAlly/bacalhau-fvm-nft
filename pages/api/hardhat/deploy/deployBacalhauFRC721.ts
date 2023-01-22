// What I don't like about the inbuilt deploy script is the inability
// to pass args/params into the function from the terminal.
// This is why I default to a task for deployment
// could MAYBE something like npx hardhat run scripts/deploy.js --network rinkeby --constructor-args arguments/greeter.arguments.js
// but too much hassle for me

import hre from 'hardhat';
import path from 'path';

import type { BacalhauFRC721 } from '../typechain-types/contracts/BacalhauFRC721';
import type { BacalhauFRC721__factory } from '../typechain-types/factories/contracts/BacalhauFRC721__factory';

async function main() {
  console.log('Bacalhau721 deploying....');

  const owner = new hre.ethers.Wallet(
    process.env.WALLET_PRIVATE_KEY || 'undefined',
    hre.ethers.provider
  );
  const bacalhauFRC721Factory: BacalhauFRC721__factory = <
    BacalhauFRC721__factory
  >await hre.ethers.getContractFactory('BacalhauFRC721', owner);

  const bacalhauFRC721: BacalhauFRC721 = <BacalhauFRC721>(
    await bacalhauFRC721Factory.deploy()
  );
  await bacalhauFRC721.deployed();
  console.log('bacalhauFRC721 deployed to ', bacalhauFRC721.address);

  //Optional: Log to a file for reference
  // await hre.run('logToFile', {
  //   filePath: path.resolve(__dirname, 'log.txt'),
  //   data: {
  //     network: 'hyperspace',
  //     chainId: bacalhauFRC721.deployTransaction.chainId,
  //     owner: bacalhauFRC721.deployTransaction.from,
  //     address: bacalhauFRC721.address,
  //     tx: bacalhauFRC721.deployTransaction.hash,
  //     explorerUrl: `https://hyperspace.filscan.io/address/general?address=${bacalhauFRC721.address}`,
  //   },
  // });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

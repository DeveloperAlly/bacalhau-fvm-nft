import { task } from 'hardhat/config';
import path from 'path';

import type { BacalhauERC721 } from '../../typechain-types/contracts/BacalhauERC721';
import type { BacalhauERC721__factory } from '../../typechain-types/factories/contracts/BacalhauERC721__factory';

task('deploy:BacalhauERC721').setAction(async function (hre) {
  console.log('Bacalhau721 deploying....');
  const bacalhauERC721Factory: BacalhauERC721__factory = <
    BacalhauERC721__factory
  >await hre.ethers.getContractFactory('BacalhauERC721');

  const priorityFee = await hre.run('callRPC', {
    method: 'eth_maxPriorityFeePerGas',
    params: [],
  });

  const bacalhauERC721: BacalhauERC721 = <BacalhauERC721>(
    await bacalhauERC721Factory.deploy({
      maxPriorityFeePerGas: priorityFee,
    })
  );
  await bacalhauERC721.deployed();
  console.log('bacalhauERC721 deployed to ', bacalhauERC721.address);

  //Optional: Log to a file for reference
  await hre.run('logToFile', {
    filePath: path.resolve(__dirname, 'log.txt'),
    data: {
      network: 'wallaby',
      chainId: bacalhauERC721.deployTransaction.chainId,
      owner: bacalhauERC721.deployTransaction.from,
      address: bacalhauERC721.address,
      tx: bacalhauERC721.deployTransaction.hash,
      explorerUrl: `https://explorer.glif.io/address/${bacalhauERC721.address}`,
    },
  });
});

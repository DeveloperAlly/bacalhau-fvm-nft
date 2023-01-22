import { ethers } from 'hardhat';
import { task, types } from 'hardhat/config';
import { TaskArguments } from 'hardhat/types';
import path from 'path';

import type { BacalhauERC721 } from '../typechain-types/contracts/BacalhauERC721';
import type { BacalhauERC721__factory } from '../typechain-types/factories/contracts/BacalhauERC721__factory';

interface networkData {
  rpc: string;
  blkexp: string;
}

const networkMap = {
  filecoinWallaby: <networkData>{
    rpc: 'https://wallaby.node.glif.io/rpc/v0',
    blkexp: 'https://fvm.starboard.ventures/contracts/',
  },
  filecoinHyperspace: <networkData>{
    rpc: 'https://api.hyperspace.node.glif.io/rpc/v1', //'https://hyperspace.filfox.info/rpc/v0',
    blkexp: 'https://explorer.glif.io/address/', // /?network=hyperspace
  },
};

// you can also use the --network tag to specify the network to deploy on
// otherwise this will use the default network
task('deploy:BacalhauERC721').setAction(
  async (taskArgs: TaskArguments, hre) => {
    console.log('Greetings Fil-der! BacalhauERC721 deploying....', hre.ethers);
    console.log(
      'To Network (chainId): ',
      hre.network.name,
      hre.network.config.chainId
    );
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

    const factory: BacalhauERC721__factory = <BacalhauERC721__factory>(
      await hre.ethers.getContractFactory('BacalhauERC721')
    );

    // NEED TO MAP THE NETWORK TO PASS THE RPC URL
    // const priorityFee = await hre.run('callRPC', {
    //   rpcUrl: nw,
    //   method: 'eth_maxPriorityFeePerGas',
    //   params: [],
    // });

    const bacalhauERC721: BacalhauERC721 = <BacalhauERC721>await factory
      .deploy
      // {
      //   maxPriorityFeePerGas: priorityFee,
      // }
      ();
    await bacalhauERC721.deployed();
    console.log('Success! BacalhauERC721 deployed to ', bacalhauERC721.address);

    //Optional: Log to a file for reference
    await hre.run('logToFile', {
      filePath: path.resolve(__dirname, 'log.txt'),
      data: bacalhauERC721,
    });
  }
);

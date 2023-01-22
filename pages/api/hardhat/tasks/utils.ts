import { task, types } from 'hardhat/config';
import type { TaskArguments } from 'hardhat/types';
import fs from 'fs';
import path from 'path';
import util from 'util';
//ethers.providers.getNetwork('name)
//ethers.providers.getNetwork(chainId)
const request = util.promisify(require('request'));
const appendFile = util.promisify(fs.appendFile);

const defaultRPC = 'https://wallaby.node.glif.io/rpc/v0';
const defaultNetworkName = 'Wallaby';
const defaultExplorerUrl = 'https://fvm.starboard.ventures/contracts/'; // alt: https://explorer.glif.io/address/{address}/wallaby

// TODO: update params, fix options method, errorchecking
task('callRPC', 'callsWallabyRPC')
  .addParam('method', 'http method', 'POST', types.string)
  .addOptionalVariadicPositionalParam('params', 'http body params', [])
  .addOptionalParam(
    'rpcUrl',
    'rpc url (wallaby default)',
    defaultRPC,
    types.string
  )
  .setAction(async ({ rpcUrl, method, params }: TaskArguments) => {
    console.log('callRPC', { rpcUrl, method, params });
    var options = {
      method: 'POST',
      url: rpcUrl,
      headers: {
        'Content-Type': 'application/json', //addParam('content-type)
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: 1,
      }),
    };
    const res = await request(options);
    console.log('callRPC res', res.statusMessage);
    return JSON.parse(res.body).result;
  });

task('formatData', 'create json data from contract deploy')
  .addParam('data', 'contract data', {}, types.json) // is there a better type to describe a contract in general?
  .addParam('contract', 'contract name', '', types.string)
  .addOptionalParam(
    'explorerUrl',
    'block explorer base url',
    defaultExplorerUrl,
    types.string
  )
  .addOptionalParam(
    'networkName',
    'network common name',
    defaultNetworkName,
    types.string
  )
  .setAction(
    async ({ data, contract, networkName, explorerUrl }: TaskArguments) => {
      const jsonObj = {
        contract,
        network: networkName,
        chainId: data.deployTransaction.chainId,
        owner: data.deployTransaction.from,
        address: data.address,
        tx: data.deployTransaction.hash,
        explorerUrl: `${explorerUrl}${data.address}`,
      };
      return jsonObj;
    }
  );

// TODO: error checks
// won't worry about optimising with createWriteStream here since it's only a small about of data
task('logToFile', 'writes outputs to a file')
  .addOptionalParam('filePath', 'relative file path', './log.txt', types.string)
  .addParam('data', 'contract data', {}, types.json)
  .addParam('contract', 'contract name', '', types.string)
  .setAction(async ({ filePath, data, contract }: TaskArguments, hre) => {
    const json = await hre.run('formatData', {
      data: data,
      contract: contract,
    });

    console.log('writing to file', json);
    //addFileSync stops anything else that is executing while this runs
    //won't create the file if it does not exist though so using addFile
    await appendFile(
      path.resolve(__dirname, filePath),
      `${JSON.stringify(json)}\n`,
      'utf-8'
    );
  });

task('getNetworkInfo', 'returns network object').setAction(
  async (taskArgs: TaskArguments, hre) => {
    console.log('config', hre.userConfig);
    return hre.userConfig;
  }
);

/**
 * curl -X POST -H "Content-Type: application/json"
 * --data '{"jsonrpc": "2.0", "method": "Filecoin.EthGetTransactionHashByCid",
 * "params": [{"/":"bafy2bzaceawy5ezs2jslo4e7qqh33vzwcpcn4xjcrgwlvo3kkn3lp3jjxfoww"}],
 * "id": 1}' https://api.hyperspace.node.glif.io/rpc/v0
 */

import { task, types } from 'hardhat/config';
import type { TaskArguments } from 'hardhat/types';
import fs from 'fs';
import path from 'path';
import util from 'util';
// import { network } from 'hardhat';
const request = util.promisify(require('request'));
const appendFile = util.promisify(fs.appendFile);

const defaultRPC = 'https://wallaby.node.glif.io/rpc/v0';

// console.log('what defaultNetwork', hre.userConfig.networks);
// TODO: change default to read the hardhat default variable (ha! needs a task on its own)
task('callRPC', 'callsRPCEndpoint')
  .addParam('method', 'http method', 'POST', types.string)
  .addOptionalParam(
    'rpcUrl',
    'rpc url (wallaby default)',
    defaultRPC,
    types.string
  )
  .addOptionalVariadicPositionalParam('params', 'http body params', [])
  .setAction(async ({ rpcUrl, method, params }: TaskArguments) => {
    console.log('callRPC', rpcUrl, method, params);
    var options = {
      method: 'POST',
      url: rpcUrl, //addParam('rpc')
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

// TODO: type safety and error checks
// won't worry about optimising with createWriteStream here since it's only a small about of data
task('logToFile', 'writes outputs to a file')
  .addParam('filePath', 'relative file path', './log.txt', types.string)
  .addParam('data', '{json obj data}', {}, types.json)
  .setAction(async (taskArguments: TaskArguments) => {
    console.log('writing to file', taskArguments.data);
    //addFileSync stops anything else that is executing while this runs
    //won't create the file if it does not exist though so using addFile
    await appendFile(
      path.resolve(__dirname, taskArguments.filePath),
      `${JSON.stringify(taskArguments.data)}\n`,
      'utf-8'
    );
  });

task(
  'getDefaultNetwork',
  'gets the default network RPC url from config or sets to hardhat'
).setAction(async (hre) => {
  return hre.userConfig.networks[hre.userConfig.defaultNetwork].url;
  //TODO
});

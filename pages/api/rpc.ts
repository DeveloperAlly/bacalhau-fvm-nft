import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' });
}

/**
 * curl -X POST -H "Content-Type: application/json"
 * --data '{"jsonrpc": "2.0", "method": "Filecoin.EthGetTransactionHashByCid",
 * "params": [{"/":"bafy2bzaceawy5ezs2jslo4e7qqh33vzwcpcn4xjcrgwlvo3kkn3lp3jjxfoww"}],
 * "id": 1}' https://api.hyperspace.node.glif.io/rpc/v0
 */

/*
  const callRPC = async (method: string, params: any[]) => {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://cors-anywhere.herokuapp.com/${process.env.NEXT_PUBLIC_RPC_FILECOIN_HYPERSPACE}`
    );
    console.log('provder', provider);
    const res = await provider.send(method, [{mode:'no-cors'}
      '0xe25AB0A901c8A0148e05b662330674205453509C',
    ]);
    console.log('return', res);
    // const request = util.promisify(require('request'));
    // const rpcUrl = process.env.NEXT_PUBLIC_RPC_FILECOIN_HYPERSPACE;
    // console.log('callRPC', { rpcUrl, method, params });
    // var options = {
    //   method: 'POST',
    //   url: rpcUrl,
    //   headers: {
    //     'Content-Type': 'application/json', //addParam('content-type)
    //   },
    //   body: JSON.stringify({
    //     jsonrpc: '2.0',
    //     method: 'GET', //'GET'
    //     params: params, //CID - check docs
    //     id: 1,
    //   }),
    // };
    // const res = await request(options);
    // console.log('callRPC res', res.statusMessage);
    // return JSON.parse(res.body).result;
  };
*/

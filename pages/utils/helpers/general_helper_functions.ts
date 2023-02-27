import { Status } from '../definitions/interfaces';
import { errorMsg } from '../messages';
import { CID } from 'multiformats/cid';
import { create } from 'ipfs-http-client';

const ipfsHttpGatewayLink = `.ipfs.w3s.link/`;

export const callBacalhauJob = async (promptInput: string) => {
  //Bacalahau HTTP Stable Diffusion Endpoint
  console.log('making call to bacalhau');
  const url = 'https://dashboard.bacalhau.org/api/v1/stablediffusion';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const data = {
    prompt: promptInput, //The user text prompt!
  };
  /* FETCH FROM BACALHAU ENDPOINT */
  const cid = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: headers,
    // mode: 'no-cors',
  })
    .then(async (res) => {
      console.log('res', res);
      let body = await res.json();
      console.log('body', body);
      if (body.cid) {
        console.log(
          'Bacalhau V0 CID',
          `https://${body.cid}${ipfsHttpGatewayLink}`
        );
        // Bacalhau returns a V0 CID which we want to convert to a V1 CID
        // for easier usage with http gateways (ie. displaying the image on-screen)
        const cid = body.cid; // CID.parse(body.cid).toV1().toString();
        console.log('Bacalhau V1 CID', `https://${cid}${ipfsHttpGatewayLink}`);
        return cid;
      }
    })
    .catch((err) => {
      console.log('error in bac job', err);
      return;
      // return { status: 'ERR' };
    });
  return cid;
};

export const getLinks = async (ipfsPath: string) => {
  console.log('ipfslinkpath', ipfsPath);
  const links = await fetch(`https://ipfs.io/api/v0/ls?arg=${ipfsPath}`);
  // const url = 'https://w3s.link/ipfs/';
  // const ipfs = create({ url });
  // console.log('ipfs', ipfs);

  // const links = [];
  // for await (const link of ipfs.ls(ipfsPath)) {
  //   links.push(link);
  // }
  const alllinks = await links.json();
  console.log('links', alllinks, typeof alllinks);
  console.log('links', alllinks.Objects[0].Links[1].Hash);
  const imgLinkv0 = alllinks.Objects[0].Links[1].Hash;
  const imageLink = CID.parse(imgLinkv0).toV1().toString();
  return imageLink;
};

export const getImageBlob = async (
  status: Status,
  setStatus: Function,
  imageHTTPURL: string // this is the imageHTTPURL will just be ipfs://cid for normal image
) => {
  const r = await fetch(imageHTTPURL);
  // , {
  //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //   mode: 'no-cors',
  // }); // no-cors, *cors, same-origin);
  console.log('fetching image', imageHTTPURL);
  console.log('responseblob', r);
  if (!r.ok) {
    // throw new Error(`error fetching image: [${r.statusText}]: ${r.status}`);
    setStatus({
      ...status,
      loading: '',
      error: errorMsg(r.statusText, 'Error fetching message'),
    });
    return r;
  }
  return r.blob();
};

//timeouts for long delays from the server
export const withTimeout = (millis: number, promise: Promise<any>) => {
  const timeout = new Promise((resolve, reject) =>
    setTimeout(() => {
      reject({ err: { message: `Timed out after ${millis} ms.` } });
      console.log('timed out');
    }, millis)
  );
  return Promise.race([promise, timeout]);
};

export const getExampleImage = async (status: Status, setStatus: Function) => {
  const imageOriginUrl =
    'https://bafkreic7fpje6mhilvneyigzxbrvl4h3qkxioov4wziqg42fhuccesvzcq.ipfs.nftstorage.link/';
  const r = await fetch(imageOriginUrl);
  if (!r.ok) {
    // throw new Error(`error fetching image: [${r.statusText}]: ${r.status}`);
    setStatus({
      ...status,
      loading: '',
      error: errorMsg(r.statusText, 'Error fetching message'),
    });
  }
  return r.blob();
};

//tx return example

// {
//   "to": "0xe25AB0A901c8A0148e05b662330674205453509C",
//   "from": "0x230115404c551Fcd0B6d447DE1DaD3afca230E07",
//   "contractAddress": null,
//   "transactionIndex": 0,
//   "root": "0x0000000000000000000000000000000000000000000000000000000000000000",
//   "gasUsed": {
//       "type": "BigNumber",
//       "hex": "0x014e82da"
//   },
//   "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
//   "blockHash": "0xd1511a0150ef231ff2115dd353181fec61e94fdcb4e12ee0e6654a8430b2ee06",
//   "transactionHash": "0x5cdf4c43cc68d962d4bcd628ac5a1abecbfe6bfd9fd0ba3ed323bfb0cde37ee6",
//   "logs": [
//       {
//           "transactionIndex": 0,
//           "blockNumber": 8525,
//           "transactionHash": "0x5cdf4c43cc68d962d4bcd628ac5a1abecbfe6bfd9fd0ba3ed323bfb0cde37ee6",
//           "address": "0xe25AB0A901c8A0148e05b662330674205453509C",
//           "topics": [
//               "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//               "0x0000000000000000000000000000000000000000000000000000000000000000",
//               "0x000000000000000000000000230115404c551fcd0b6d447de1dad3afca230e07",
//               "0x0000000000000000000000000000000000000000000000000000000000000017"
//           ],
//           "data": "0x",
//           "logIndex": 0,
//           "blockHash": "0xd1511a0150ef231ff2115dd353181fec61e94fdcb4e12ee0e6654a8430b2ee06"
//       },
//       {
//           "transactionIndex": 0,
//           "blockNumber": 8525,
//           "transactionHash": "0x5cdf4c43cc68d962d4bcd628ac5a1abecbfe6bfd9fd0ba3ed323bfb0cde37ee6",
//           "address": "0xe25AB0A901c8A0148e05b662330674205453509C",
//           "topics": [
//               "0x4efb475a051e7b4cd572331018e6887b5e3503c5d75b765d806cdab175ff31e6",
//               "0x000000000000000000000000230115404c551fcd0b6d447de1dad3afca230e07",
//               "0x0000000000000000000000000000000000000000000000000000000000000017"
//           ],
//           "data": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000050697066733a2f2f62616679726569627578783333787175686e61333435676e6137697667696c6b376e666f64376f646e78366a6237786662736c79686476336d33792f6d657461646174612e6a736f6e00000000000000000000000000000000",
//           "logIndex": 1,
//           "blockHash": "0xd1511a0150ef231ff2115dd353181fec61e94fdcb4e12ee0e6654a8430b2ee06"
//       }
//   ],
//   "blockNumber": 8525,
//   "confirmations": 1,
//   "cumulativeGasUsed": {
//       "type": "BigNumber",
//       "hex": "0x00"
//   },
//   "effectiveGasPrice": {
//       "type": "BigNumber",
//       "hex": "0x03d11f"
//   },
//   "status": 1,
//   "type": 2,
//   "byzantium": true,
//   "events": [
//       {
//           "transactionIndex": 0,
//           "blockNumber": 8525,
//           "transactionHash": "0x5cdf4c43cc68d962d4bcd628ac5a1abecbfe6bfd9fd0ba3ed323bfb0cde37ee6",
//           "address": "0xe25AB0A901c8A0148e05b662330674205453509C",
//           "topics": [
//               "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//               "0x0000000000000000000000000000000000000000000000000000000000000000",
//               "0x000000000000000000000000230115404c551fcd0b6d447de1dad3afca230e07",
//               "0x0000000000000000000000000000000000000000000000000000000000000017"
//           ],
//           "data": "0x",
//           "logIndex": 0,
//           "blockHash": "0xd1511a0150ef231ff2115dd353181fec61e94fdcb4e12ee0e6654a8430b2ee06",
//           "args": [
//               "0x0000000000000000000000000000000000000000",
//               "0x230115404c551Fcd0B6d447DE1DaD3afca230E07",
//               {
//                   "type": "BigNumber",
//                   "hex": "0x17"
//               }
//           ],
//           "event": "Transfer",
//           "eventSignature": "Transfer(address,address,uint256)"
//       },
//       {
//           "transactionIndex": 0,
//           "blockNumber": 8525,
//           "transactionHash": "0x5cdf4c43cc68d962d4bcd628ac5a1abecbfe6bfd9fd0ba3ed323bfb0cde37ee6",
//           "address": "0xe25AB0A901c8A0148e05b662330674205453509C",
//           "topics": [
//               "0x4efb475a051e7b4cd572331018e6887b5e3503c5d75b765d806cdab175ff31e6",
//               "0x000000000000000000000000230115404c551fcd0b6d447de1dad3afca230e07",
//               "0x0000000000000000000000000000000000000000000000000000000000000017"
//           ],
//           "data": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000050697066733a2f2f62616679726569627578783333787175686e61333435676e6137697667696c6b376e666f64376f646e78366a6237786662736c79686476336d33792f6d657461646174612e6a736f6e00000000000000000000000000000000",
//           "logIndex": 1,
//           "blockHash": "0xd1511a0150ef231ff2115dd353181fec61e94fdcb4e12ee0e6654a8430b2ee06",
//           "args": [
//               "0x230115404c551Fcd0B6d447DE1DaD3afca230E07",
//               {
//                   "type": "BigNumber",
//                   "hex": "0x17"
//               },
//               "ipfs://bafyreibuxx33xquhna345gna7ivgilk7nfod7odnx6jb7xfbslyhdv3m3y/metadata.json"
//           ],
//           "event": "NewBacalhauERC721NFTMinted",
//           "eventSignature": "NewBacalhauERC721NFTMinted(address,uint256,string)"
//       }
//   ]
// }

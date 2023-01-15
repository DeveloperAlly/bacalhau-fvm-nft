// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

type BacalhauData = {
  //what is the return type here
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' });
}

export function callBacalhau(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'image files' });
}

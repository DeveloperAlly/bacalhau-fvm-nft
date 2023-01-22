import Head from 'next/head';
import { ReactElement } from 'react';

export const WebHeader: React.FC = (): ReactElement => {
  return (
    <Head>
      <title>Bacalhau Prompt Generated NFT Art</title>
      <meta
        name="description"
        content="Bacalhau Stable Diffusion for Promt Generated NFT Art by @DeveloperAlly"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/Bacalhau-plain.png" />
      {/* <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      /> */}
    </Head>
  );
};

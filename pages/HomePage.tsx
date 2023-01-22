declare let window: any;
import { FC, ReactNode, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { NFTStorage } from 'nft.storage';
import { Typography } from '@mui/material';
import {
  Footer,
  HeaderMenu,
  ImagePreviewContainer,
  InputContainer,
  LayoutContainer,
  WebHeader,
} from '@Layouts';
import { DappHeader } from '@Layouts';
import {
  Logo,
  Title,
  SubTitle,
  PromptInput,
  WalletButton,
  LoadingDisplay,
  StatusDisplay,
  PromptButton,
  // MintButton,
} from '@Common';
import {
  INITIAL_WALLET_STATUS,
  INITIAL_TRANSACTION_STATE,
  NFT_METADATA_ATTRIBUTES,
} from '@Utils/consts';
import {
  loadingMsg,
  successMintingNFTmsg,
  errorMsg,
  genericMsg,
} from '@Utils/messages';
import {
  changeWalletChain,
  checkForWalletConnection,
  isChainIdCorrect,
  setWalletListeners,
} from '@Utils/wallet_helper_functions';
import {
  getContractConnection,
  setContractEventListeners,
} from '@Utils/contracts_helper_functions';
import { formatNFTCollectionForDisplay } from '@Utils/image_functions';
import { getImageBlob } from '@Utils/helper_functions';
import { BacalhauImage, ChainData } from '@Utils/interfaces';

type HomePageProps = {
  children?: ReactNode;
};

const HomePage: FC<HomePageProps> = () => {
  // Wallet interactions (state )
  const [userWallet, setUserWallet] = useState(INITIAL_WALLET_STATUS);
  const [nftCollection, setNftCollection] = useState([]);
  const [ownedNftCollection, setOwnedNftCollection] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);

  // Contract interactions (events, calls etc)
  const [testnet, setTestnet] = useState<string>('hyperspace');

  // Bacalhau interactions
  const [bacalhauImages, setBacalhauImages] = useState<BacalhauImage[]>([]);
  const [prompt, setPrompt] = useState<string>('');

  // NFT.Stroage?

  //Status
  const [status, setStatus] = useState(INITIAL_TRANSACTION_STATE);

  const NFTStorageClient = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY ?? 'undefined',
  });

  //INITIALISATION
  useEffect(() => {
    getDisplayData(); //should work with read only mode
    console.log('Initialising DApp...');
    if (window.ethereum) {
      setUserWallet((prevState: any) => ({
        ...prevState,
        injectedeth: 'true',
      }));
      checkForWalletConnection(setUserWallet);
      setWalletListeners(userWallet, setUserWallet);
      setContractEventListeners(setStatus, getDisplayData, getNFTByOwner);
    } else {
      console.log('No Wallet connection detected!');
    }
  }, []);

  //Handle wallet changes
  useEffect(() => {
    console.log('UserWallet changed', userWallet);
    //do things when this happens ?
    // console.log('hex chainid', ethers.utils.hexlify(3141));
    if (userWallet.chainId !== '0xc45') {
      console.log('wrong chain', userWallet.chainId);
      // display a dialog
    }
  }, [userWallet]);

  useEffect(() => {
    // setOwnedNftCollection([]);
    getNFTByOwner();
  }, [userWallet.accounts[0]]);

  useEffect(() => {
    if (nftCollection && nftCollection[0]) {
      console.log('nftcollection', nftCollection);
      formatNFTCollectionForDisplay(nftCollection, setImageLinks);
    }
  }, [nftCollection]);

  const getDisplayData = async () => {
    console.log('Fetching nft data from contract...');
    const contract: any = await getContractConnection('read');
    await contract
      .getNFTCollection()
      .then(async (nftCollection: any) => {
        console.log('NFT collection', nftCollection);
        setNftCollection(nftCollection);
      })
      .catch((err: any) => {
        console.log('NFT fetching err', err);
        setStatus((prevState) => ({
          ...prevState,
          error: errorMsg(err.message, 'Could not fetch nft collection'),
        }));
      });
  };

  const getNFTByOwner = async () => {
    console.log('Fetching nft data from contract...');
    const contract: any = await getContractConnection('read');
    await contract
      .getNFTCollectionByOwner(userWallet.accounts[0])
      .then(async (nftCollection: any) => {
        console.log('NFT collection by owner', nftCollection);
        formatNFTCollectionForDisplay(nftCollection, setOwnedNftCollection);
        // setOwnedNftCollection(nftCollection);
      })
      .catch((err: any) => {
        console.log('NFT fetching err', err);
        // setStatus((prevState) => ({
        //   ...prevState,
        //   error: errorMsg(err.message, 'Could not fetch owned nft collection'),
        // }));
      });
  };

  const callBacalhauToGenerateImages = async (promptInput: string) => {
    //save to bacalhauImages
    console.log('Calling Bacalhau & Running Stable Diffusion Script.....');
    setStatus((prevState) => ({
      ...prevState,
      loading: loadingMsg(
        'Calling Bacalhau & Running Stable Diffusion Script...'
      ),
    }));
    //call bacalhau here
    // const bacalhauResultCID = await getExampleImage(status, setStatus);
    // const cidStatus = await fetchNFTStoreStatus(
    //   'bafkreic7fpje6mhilvneyigzxbrvl4h3qkxioov4wziqg42fhuccesvzcq'
    // );
    const bacalhauResult = {
      name: 'Bacalhau Hyperspace NFTs 2023',
      ipfsCID: 'bafkreic7fpje6mhilvneyigzxbrvl4h3qkxioov4wziqg42fhuccesvzcq',
      prompt: promptInput,
      minted: false,
    };
    console.log('bac result', bacalhauResult); //this will really be a CID
    setBacalhauImages([bacalhauResult]);
    // setBacalhauImages([...bacalhauImages, bacalhauResult]); // for now only ever display current - TODO: need to abstract components
    setStatus(INITIAL_TRANSACTION_STATE); //TODO: change to success

    ///just display the image as a preview and add a mintNFT button.
    // saveToNFTStorage(bacalhauResult, promptInput);
  };

  const saveToNFTStorage = async (imageCID: string, promptInput: string) => {
    //check wallet connection first
    if (userWallet.accounts.length < 1) {
      setStatus({
        ...status,
        warning: genericMsg(
          'No wallet connection',
          'Connect your wallet to Mint!'
        ),
      });
      return;
    }
    if (userWallet.chainId || userWallet.chainId !== '0xc45') {
      await changeWalletChain('0xc45').catch((err) => {
        setStatus({
          ...INITIAL_TRANSACTION_STATE,
          error: errorMsg(err, 'Couldnt change chain to hyperspace'),
        });
        return;
      });
    }

    setStatus({
      ...status,
      loading: loadingMsg('Saving to NFT.Storage....'),
    });
    // const imageData = await getExampleImage(status, setStatus);
    const imageData = await getImageBlob(status, setStatus, imageCID);

    const nftJSON = {
      name: NFT_METADATA_ATTRIBUTES.name, //hmmm
      description: promptInput,
      image: imageData, // use image Blob as `image` field?
      properties: {
        prompt: promptInput,
        type: 'stable-diffusion-image',
        origins: {
          ipfs: `ipfs://${imageCID}`,
        },
        innovation: 100,
        content: {
          'text/markdown': 'hello, world',
        },
      },
    };

    await NFTStorageClient.store(nftJSON)
      .then((metadata) => {
        console.log('NFT Data Stored!');
        console.log('Metadata URI: ', metadata.url);
        //ipfs://bafyreibuxx33xquhna345gna7ivgilk7nfod7odnx6jb7xfbslyhdv3m3y/metadata.json
        mintNFT(metadata);
      })
      .catch((err) => {
        console.log('error uploading to nft.storage');
        setStatus({
          ...INITIAL_TRANSACTION_STATE,
          error: errorMsg(err, 'Error saving to NFT.Storage'),
        });
      });
  };

  const fetchNFTStoreStatus = async (ipfsCID: string) => {
    const nftStatus = await NFTStorageClient.status(ipfsCID);
    console.log('nftstatus', nftStatus);
    return nftStatus;
  };

  const mintNFT = async (metadata: any) => {
    //wallet checks required here.
    setStatus({
      ...status,
      loading: loadingMsg('Waiting for wallet permission...'),
    });
    const contract = await getContractConnection('write');

    console.log('got connection', contract, userWallet);
    if (contract) {
      await contract
        .mintBacalhauNFT(
          userWallet.accounts[0],
          metadata.url //test ipfs address
        )
        .then(async (data: any) => {
          console.log('CALLED FUNCTION', data);
          setStatus({
            ...status,
            loading: loadingMsg('Minting NFT...'),
          });
          await data
            .wait()
            .then(async (tx: any) => {
              console.log('tx', tx);
              //test only - NEEDS a backend API call.
              // await callRPC('Filecoin.EthGetMessageCidByTransactionHash', [tx]);
              // const txToCID = await callRPC(
              //   'EthGetMessageCidByTransactionHash',
              //   { tx }
              // );
              // console.log(txToCID);
              let tokenId = tx.events[1].args.tokenId.toString();
              console.log('tokenId args', tokenId);
              setStatus({
                ...INITIAL_TRANSACTION_STATE,
                success: successMintingNFTmsg(data),
              });
            })
            .catch((err: any) => {
              console.log('ERROR', err);
              setStatus({
                ...status,
                loading: '',
                error: errorMsg(err.message, 'Error minting NFT'),
              });
            });
        })
        .catch((err: any) => {
          console.log('ERROR1', err);
          setStatus({
            ...status,
            loading: '',
            error: errorMsg(
              err && err.message ? err.message : null,
              'Error minting NFT'
            ),
          });
        });
    }
  };

  return (
    <LayoutContainer>
      <>
        <WebHeader />
        <HeaderMenu>
          <>
            <Logo height={50} />
            <WalletButton
              userWallet={userWallet}
              setUserWallet={setUserWallet}
            />
          </>
        </HeaderMenu>
        <DappHeader>
          <>
            <Logo height={100} />
            <Title />
            <SubTitle />
          </>
        </DappHeader>
        {!status.loading && status !== INITIAL_TRANSACTION_STATE && (
          <StatusDisplay status={status} setStatus={setStatus} />
        )}
        {status.loading && (
          <div>
            <LoadingDisplay status={status} setStatus={setStatus} />
          </div>
        )}
        <InputContainer>
          <>
            {bacalhauImages.length < 1 && (
              <Typography
                gutterBottom
                variant="h6"
                sx={{
                  background:
                    '-webkit-linear-gradient(right,#30ccff 10%,#30ccff,#0055ff 70%)',
                  backgroundClip: 'text',
                }}
              >
                Give a text prompt for our magical machine to paint with...
              </Typography>
            )}
            {bacalhauImages.length > 0 && (
              // really want a mint button under this....
              <>
                <SubTitle text="Bacalhau Result" />
                <ImagePreviewContainer
                  images={bacalhauImages}
                  mode="bacalhau"
                ></ImagePreviewContainer>
                <PromptButton
                  text="Mint NFT!"
                  disabled={Boolean(status.loading)}
                  action={() =>
                    saveToNFTStorage(
                      bacalhauImages[0].ipfsCID,
                      bacalhauImages[0].prompt
                    )
                  }
                />
                <br />
              </>
            )}
            <PromptInput prompt={prompt} setPrompt={setPrompt}>
              {/* If there's bacalhau images - show either wallet button (not connected) or mintNFT button */}
              <PromptButton
                action={() => callBacalhauToGenerateImages(prompt)}
                disabled={Boolean(status.loading) || !Boolean(prompt)}
                text={
                  bacalhauImages.length > 0
                    ? 'Re-generate Image'
                    : 'Generate Images'
                }
              />
            </PromptInput>
          </>
        </InputContainer>
        <br />
        <SubTitle text="Your NFT Collection" />
        {/* TODO: fix this section */}
        {ownedNftCollection && ownedNftCollection.length > 0 ? (
          <ImagePreviewContainer images={ownedNftCollection} mode="nft" />
        ) : userWallet.accounts.length > 0 ? (
          <Typography variant="subtitle1">Mint your first NFT!</Typography>
        ) : (
          <Typography variant="subtitle1">
            Connect your wallet to see your nft's!
          </Typography>
        )}
        <br />
        <SubTitle text="NFTs on this Contract" />
        {imageLinks && imageLinks[0] ? (
          <ImagePreviewContainer images={imageLinks} mode="nft" />
        ) : (
          <Typography variant="subtitle1">No NFTs yet!</Typography>
        )}
        <Footer />
      </>
    </LayoutContainer>
  );
};

export default HomePage;

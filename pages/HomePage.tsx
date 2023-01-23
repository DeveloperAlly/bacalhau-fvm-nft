declare let window: any;
import { FC, ReactNode, useState, useEffect } from 'react';
import { NFTStorage } from 'nft.storage';
import { Typography } from '@mui/material';
import {
  Footer,
  HeaderMenu,
  ImagePreviewContainer,
  InputContainer,
  LayoutContainer,
  WebHeader,
  DappHeader,
} from '@Layouts';
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
} from '@Components';
import {
  INITIAL_WALLET_STATUS,
  INITIAL_TRANSACTION_STATE,
  NFT_METADATA_ATTRIBUTES,
} from '@Utils/definitions/consts';
import {
  loadingMsg,
  successMintingNFTmsg,
  errorMsg,
  genericMsg,
} from '@Utils/messages';
import {
  changeWalletChain,
  checkForWalletConnection,
  setWalletListeners,
} from '@Utils/helpers/wallet_helper_functions';
import {
  getContractConnection,
  setContractEventListeners,
} from '@Utils/helpers/contract_helper_functions';
import { formatNFTCollectionForDisplay } from '@Utils/helpers/image_helper_functions';
import { getImageBlob } from '@Utils/helpers/general_helper_functions';
import { BacalhauImage } from '@Utils/definitions/interfaces';

type HomePageProps = {
  children?: ReactNode;
};

const HomePage: FC<HomePageProps> = () => {
  // Wallet interactions (state )
  const [userWallet, setUserWallet] = useState(INITIAL_WALLET_STATUS);

  // Fetched Data
  const [nftCollection, setNftCollection] = useState([]);
  const [ownedNftCollection, setOwnedNftCollection] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);

  // Contract interactions (events, calls etc) - future work - multi-chain contract
  // const [networkChain, setNetworkChain] = useState<string>('hyperspace');

  // Bacalhau interactions
  const [bacalhauImages, setBacalhauImages] = useState<BacalhauImage[]>([]);
  const [prompt, setPrompt] = useState<string>('');

  //Status
  const [status, setStatus] = useState(INITIAL_TRANSACTION_STATE);

  // NFT.Stroage
  const NFTStorageClient = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY ?? 'undefined',
  });

  // INITIALISATION
  // TODO: clean this up
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
      setContractEventListeners(
        setStatus,
        getDisplayData,
        getNFTByOwner,
        bacalhauImages,
        setBacalhauImages
      );
    } else {
      console.log('No Wallet connection detected!');
    }
  }, []);

  // Handle wallet changes
  // Unnecessary
  useEffect(() => {
    // console.log('UserWallet changed', userWallet);
    //do things when this happens ?
    // console.log('hex chainid', ethers.utils.hexlify(3141));
    if (userWallet.chainId !== '0xc45') {
      console.log('wrong chain', userWallet.chainId);
      // display a dialog
    }
  }, [userWallet]);

  // user changes wallet -> refetch ownedNFTs
  useEffect(() => {
    getNFTByOwner();
  }, [userWallet.accounts[0]]);

  // nftCollection data changes -> create new display links
  // probably should just save it converted.
  useEffect(() => {
    if (nftCollection && nftCollection[0]) {
      formatNFTCollectionForDisplay(nftCollection, setImageLinks);
    }
  }, [nftCollection]);

  // fetch all nft's minted on this contract
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

  // fetch nft's by current address
  const getNFTByOwner = async () => {
    console.log('Fetching nft data by owner from contract...');
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

  // Stable diffusion script call (text to image prompt)
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
    const bacalhauJSON = await createNFTMetadata(
      'bafkreic7fpje6mhilvneyigzxbrvl4h3qkxioov4wziqg42fhuccesvzcq',
      promptInput
    );
    const bacalhauResult = { ...bacalhauJSON, minted: false };

    // const bacalhauResult = {
    //   name: 'Bacalhau Hyperspace NFTs 2023',
    //   ipfsCID: 'bafkreic7fpje6mhilvneyigzxbrvl4h3qkxioov4wziqg42fhuccesvzcq',
    //   prompt: promptInput,
    //   minted: false,
    // };
    console.log('bac result', bacalhauResult); //this will really be a CID
    setBacalhauImages([bacalhauResult]);
    // setBacalhauImages([...bacalhauImages, bacalhauResult]); // for now only ever display current - TODO: need to abstract components
    setStatus(INITIAL_TRANSACTION_STATE); //TODO: change to success
  };

  const createNFTMetadata = async (imageCID: string, promptInput: string) => {
    const imageData = await getImageBlob(status, setStatus, imageCID);

    const nftJSON = {
      name: 'Bacalhau Hyperspace NFTs 2023', //hmmm
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

    return nftJSON;
  };

  // Store NFT Metadata to NFT.Storage
  const saveToNFTStorage = async (nftJson: any) => {
    //check wallet connection first
    // TODO: move these functions to a generic call
    if (userWallet.accounts.length < 1) {
      setStatus({
        ...status,
        warning: genericMsg(
          'No wallet connection',
          'Connect your wallet to Mint an NFT!'
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
      loading: loadingMsg('Saving Metadata to NFT.Storage....'),
    });

    // const nftJSON = await createNFTMetadata(imageCID, promptInput);
    await NFTStorageClient.store(nftJson)
      .then((metadata) => {
        console.log('NFT Data pinned to IPFS & stored on Filecoin!');
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

  // Connect to the contract to mint the NFT!
  const mintNFT = async (metadata: any) => {
    //wallet checks required here.
    setStatus({
      ...status,
      loading: loadingMsg('Waiting for wallet permission...'),
    });
    const contract = await getContractConnection('write');

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
          await data //CURRENTLY NOT RETURNING TX - KNOWN BUG (I use event triggering to know - not ideal)
            .wait()
            .then(async (tx: any) => {
              console.log('tx', tx);
              //test only - NEEDS a backend API call.
              // may be fixed in future update and not needed
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
              <>
                <SubTitle text="Bacalhau Result" />
                <ImagePreviewContainer
                  images={bacalhauImages}
                  mode="bacalhau"
                />
                {!bacalhauImages[0].minted && (
                  <PromptButton
                    text={'Mint NFT!'}
                    disabled={Boolean(status.loading)}
                    action={() => saveToNFTStorage(bacalhauImages[0])}
                  />
                )}
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

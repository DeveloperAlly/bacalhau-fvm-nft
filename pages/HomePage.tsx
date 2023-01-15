import { FC, ReactNode } from 'react';
import {
  Footer,
  HeaderMenu,
  ImageLayout,
  ImagePreviewContainer,
  InputContainer,
  LayoutContainer,
  WebHeader,
} from '@Layouts';
import { Wallet, Logo } from '@Components';
import { DappHeader } from '@Layouts';
import { Title, SubTitle, PromptInput, PromptButton } from '@Common';
import { Typography } from '@mui/material';

type HomePageProps = {
  children?: ReactNode;
};

const HomePage: FC<HomePageProps> = () => {
  return (
    <LayoutContainer>
      <>
        <WebHeader />
        <HeaderMenu>
          <>
            <Logo height={50} />
            <Wallet />
          </>
        </HeaderMenu>
        <DappHeader>
          <>
            <Logo height={100} />
            <Title />
            <SubTitle />
          </>
        </DappHeader>
        <InputContainer>
          <>
            <Typography>Give a text prompt to make the artwork</Typography>
            <PromptInput></PromptInput>
          </>
        </InputContainer>
        <ImagePreviewContainer>
          <>
            multiple
            <ImageLayout />
          </>
        </ImagePreviewContainer>
        <Footer />
        <main>
          <Wallet />
          hello again
        </main>
      </>
    </LayoutContainer>
  );
};

export default HomePage;

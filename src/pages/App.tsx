import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
// import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
// import { ApplicationModal } from '../state/application/actions'
// import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import MintNFT from '../components/MintNFT'
import NFTs from './NFTs'
import { LandingPage } from 'components/LandingPage'
import Nftproduct from 'components/NFTproduct/Nftproduct'
import MintingCongrats from 'components/MintingCongrats/mintingCongrats'
import NFTConfirm from 'components/NFTConfirm'


const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  width: 100%;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {

  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <URLWarning />
        <BodyWrapper>
          <Popups />
          <Polling />
          <Web3ReactManager>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/nfts" component={NFTs} />
              <Route exact path="/nft/:id" component={Nftproduct} />
              <Route path="/nftconfirm" component={NFTConfirm} />
              <Route exact path="/mintnft" component={MintNFT} />
              <Route exact path="/mintednft" component={MintingCongrats} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  )
}

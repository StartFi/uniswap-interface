import React, { useState } from 'react'
import { DropDownSort } from 'components/DropDown'
import NTFCard from '../components/NFTcard/nftcard'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'

import { useGetNFTs, useLoadTime, useMarketplace, useMarketplaceLoading } from 'state/marketplace/hooks'

import { AuctionNFT } from 'services/models/AuctionNFT'
import StartfiLoader from '../components/Loader/startfi'
import Pagination from 'components/Pagination'
import Gallery from '../assets/images/Group 62.png'
import TabList from '../assets/images/Group 63.png'

import { Padding, Results, NFTList, Nft, Header, DropDownContainer, DropDownImgIcons } from './styles'

// const SORTBY = ['With Bids', 'Lowest price', 'Highest price']
const NetWorks = ['all Network', 'Ropsten']
const Status = ['All Status', 'Status 1']

const NFTs: React.FC = () => {
  const history = useHistory()

  // const [sort, setSort] = useState(SORTBY[0])
  const [netWork, setNetWork] = useState(NetWorks[0])
  const [status, setStatus] = useState(Status[0])

  const { t } = useTranslation()

  const onMarket = useMarketplace()

  const loadtime = useLoadTime()

  const getNFTs = useGetNFTs()

  const loading = useMarketplaceLoading()

  if (loading)
    return (
      <div>
        <StartfiLoader></StartfiLoader>
      </div>
    )

    console.log("market place length  " + onMarket.length);
    if(onMarket.length==0){
      return <div>
        <h3>No Result Found</h3>
      </div>
    }

  return (
    <Padding>
      <Header>
        <Results>
          {onMarket.length} {t('NFTSResults')} {loadtime}ms
        </Results>
        <DropDownContainer>

          <DropDownSort
            itemsWidth='12vw'
            LabelWidth="11.8vw"
            marginRight="40px"
            showLabel={true}
            name='network'
            selectIcon={true}
            options={NetWorks}
            value={netWork}
            onChange={(e: any) => {
              setNetWork(e.target.value)
            }}
          />
          <DropDownSort
            itemsWidth='12vw'
            LabelWidth="11.8vw"
            marginRight="40px"
            showLabel={true}
            name='sort'
            selectIcon={true}
            options={Status}
            value={status}
            onChange={(e: any) => {
              setStatus(e.target.value)
            }}
          />
          <DropDownImgIcons src={Gallery}></DropDownImgIcons>
          <DropDownImgIcons src={TabList}></DropDownImgIcons>
        </DropDownContainer>
      </Header>

      <NFTList>
        {
          onMarket.map((auctionNFT: AuctionNFT) => (
            <Nft key={auctionNFT.nft.id}>
              <NTFCard
                auctionNFT={auctionNFT}
                navigateToCard={(auctionNFT: AuctionNFT) =>
                  history.push(`/marketplace/nft/${auctionNFT.nft.id}/${auctionNFT.auction.id}`)
                }
                placeBid={(auctionNFT: AuctionNFT) =>
                  history.push(`/marketplace/nft/${auctionNFT.nft.id}/${auctionNFT.auction.id}`)
                }
              ></NTFCard>
            </Nft>
          ))}
      </NFTList>
      <Pagination />
    </Padding>
  )
}

export default NFTs

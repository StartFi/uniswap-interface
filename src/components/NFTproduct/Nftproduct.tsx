import React, { useState } from 'react'
import Text from '../Text'
import {
  Grid,
  LeftGrid,
  RightGrid,
  ImgCard,
  LeftTextCard,
  CreatedTitle,
  CreatedText,
  RightTitle,
  RightSubTitle,
  PublisherCard,
  BuyCard,
  PlaceBid,
  BuyButtons,
  LastBiddingContainer,
  BuyNow,
  DescriptionCard,
  DescriptionTitle,
  DescriptionText,
  OwnerText,
  NoStakes,
  GetNow,
  Name,
  Stakes,
  TagContainer,
  TimerContainer
} from './Nftproduct.styles'
import ReadMore from '../ReadMore/readmore'
import { useTranslation } from 'react-i18next'
import BidOrBuy from 'components/BidOrBuy'
import ButtonWishlist from 'components/Button/ButtonWishlist'
import { usePopup } from 'state/application/hooks'
import { useHistory, useParams } from 'react-router-dom'
import { useAuctionNFT, useGetAuctionNFT } from 'state/marketplace/hooks'
import uriToHttp from 'utils/uriToHttp'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { useUserBalance } from 'state/user/hooks'
import Timer from 'components/Timer/Timer'
import Amount from 'components/NFTSummary/Amount'

interface NFTParams {
  nft: string
  auction: string
}

const Nftproduct = () => {
  const { t } = useTranslation()

  const [isReadMore, setIsReadMore] = useState('')

  const [isOpen, setIsOpen] = useState(false)

  const [bidOrBuy, setBidOrBuy] = useState(false)

  const { nft, auction }: NFTParams = useParams()

  useGetAuctionNFT(nft, auction)

  const auctionNFT: AuctionNFT | null = useAuctionNFT()
  console.log('AuctionNft', auctionNFT)

  const popup = usePopup()

  const history = useHistory()

  const balance = useUserBalance()

  if (!nft || !auction) {
    popup({ success: false, message: 'noNFT' })
    history.goBack()
    return null
  }

  const nftId = parseInt(nft)

  const imgUrl = uriToHttp(`${auctionNFT?.nft?.dataHash}`)[1]

  const noStakes =
    balance &&
    auctionNFT &&
    (parseFloat(balance) < auctionNFT.auction.listingPrice ||
      (auctionNFT.auction.minBid && parseFloat(balance) < auctionNFT.auction.minBid))

  const showScroll = (readMore: boolean) => {
    readMore ? setIsReadMore('scroll') : setIsReadMore('')
  }

  const LastBidding = auctionNFT ? parseInt(auctionNFT?.auction?.bids[auctionNFT?.auction?.bids.length - 1]) : null

  return (
    <Grid>
      <BidOrBuy bidOrBuy={bidOrBuy} isOpen={isOpen} close={() => setIsOpen(false)} />
      <LeftGrid>
        <ImgCard>
          <img src={imgUrl} alt='NFT' />
          {/* <p><img/>Views</p> */}
        </ImgCard>
        <LeftTextCard>
          <CreatedTitle>
            <p>
              <span>About {auctionNFT?.nft.name}</span>
            </p>
          </CreatedTitle>
          <CreatedText>
            <ReadMore showScroll={showScroll}>
              <p>{auctionNFT?.nft?.description}</p>
            </ReadMore>

            {/* <TagContainer marginLeft="6.8rem">
                  {auctionNFT?.nft?.tags?.map(e => (
                    <div key={e}>{e}</div>
                  ))}
                </TagContainer> */}
          </CreatedText>
        </LeftTextCard>
      </LeftGrid>
      <RightGrid>
        <RightTitle>
          {/* text created by user */}

          <Name>
            <p>{auctionNFT?.nft.name}</p>
            {noStakes && (
              <Stakes>
                <NoStakes>{t('needsMoreStakes')}</NoStakes>
                <GetNow onClick={() => history.push('/')}>{t('getNow')}</GetNow>
              </Stakes>
            )}
          </Name>
        </RightTitle>
        <RightSubTitle>{t('prediction')}: Round 11 (Bronze) - Only 100 Available</RightSubTitle>

        <TagContainer>
          {auctionNFT?.nft?.tags?.map(e => (
            <div key={e}>
              <p>{e}</p>
            </div>
          ))}
        </TagContainer>

        {auctionNFT ? (
          <TimerContainer>
            <Text fontFamily='Roboto' fontSize='1rem' color='#323232' margin='0 23px 0px 0px'>
              Auction Ends in :
            </Text>
            <Timer timeStamp={auctionNFT.auction.expireTimestamp} helperString='Auction'></Timer>
          </TimerContainer>
        ) : null}

        {/* <PublisherCard height='60px'>
          <OwnerText>
            <p>{t('owner')} :</p>
            <span>{auctionNFT?.nft?.owner}</span>
          </OwnerText>
        </PublisherCard> */}
        <BuyCard>
          {LastBidding ? (
            <LastBiddingContainer>
              <Text fontFamily='Roboto' FontWeight="bold" fontSize='0.875rem' color='#323232' margin='0 23px 0px 0px'>{t('lastBidding')} :</Text>
              <Amount amount={LastBidding}></Amount>{' '}
            </LastBiddingContainer >
          ) : (
            <LastBiddingContainer>
            <Text fontFamily='Roboto' FontWeight="bold" fontSize='1rem' color='#323232' margin='15px auto'>{t('noBidding')} </Text>
            </LastBiddingContainer >
          )}

          <BuyButtons >
            <ButtonWishlist nftId={nftId} type='NFTProduct' width="70%" borderRadius="4px" fontSize="1rem"/>
            <PlaceBid >
            < button
              onClick={() => {
                setBidOrBuy(true)
                setIsOpen(true)
              }}
            >
              {t('offer')}
            </button>
            </PlaceBid>

          </BuyButtons>
          <BuyNow>
            <button
              onClick={() => {
                history.push('/marketplace/buyorbid')
                // setBidOrBuy(false)
                // setIsOpen(true)
              }}
            >
              {t('buy')}
            </button>
          </BuyNow>
        </BuyCard>
        <DescriptionCard overflowY={isReadMore}>
          <DescriptionTitle>
            <p> {auctionNFT?.nft.name}</p>
          </DescriptionTitle>
          <DescriptionText></DescriptionText>
        </DescriptionCard>
      </RightGrid>
    </Grid>
  )
}

export default Nftproduct

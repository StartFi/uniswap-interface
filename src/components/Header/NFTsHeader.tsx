/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react'
import Wallet from 'components/Wallet'
import Logo from '../../assets/icons/logo.svg'
import Heart from '../../assets/icons/heart.svg'
import { ButtonSearch } from 'components/Button'
import { LinkCreateNFT } from 'components/Link'
import { InputSearch } from 'components/Input'
import { Box, Grid, Link, styled } from '@material-ui/core'
import { TabCategory, TabsCategory } from 'components/Tabs'
import Books from '../../assets/icons/bookstab.svg'
import Videos from '../../assets/icons/videostab.svg'
import Art from '../../assets/icons/arttab.svg'
import Games from '../../assets/icons/gamestab.svg'
import All from '../../assets/icons/alltab.svg'
import Music from '../../assets/icons/musictab.svg'
import Images from '../../assets/icons/imagestab.svg'
import { useGetNFTs } from 'state/nfts/hooks'
import { useHistory } from 'react-router'
import { CATEGORIES, Dictionary } from './../../constants'
/* Begin example never merge to the main  branch*/
import { address as STARTFI_MARKET_PLACE_ADDRESS } from '../../constants/abis/StartFiMarketPlace.json'
import { address as STARTFI_STAKES_ADDRESS } from '../../constants/abis/StartfiStakes.json'
import { address as STARTFI_NFT_ADDRESS } from '../../constants/abis/StartfiRoyaltyNFT.json'
import { address as STARTFI_NFT_PAYMENT_ADDRESS } from '../../constants/abis/StartFiNFTPayment.json'
import {
  useMint,
  useNftInfo,
  useGetTokenURI,
  useGetNftOwner,
  useNftBalance,
  useGetApproverAddress,
  useRoyaltyInfo,
  useApproveNft,
  useChangeFeesNftPayment,
  useChangeNftContractNftPayment,
  useNftPaymentInfo,
  useGrantRoleNft
} from 'hooks/startfiNft'
import {
  useTokenBalance,
  useTokenInfo,
  useTransfer,
  useApproveToken,
  useGetAllowance,
  useIncreaseAllowance,
  useDecreaseAllowance
} from 'hooks/startfiToken'
import {
  useBid,
  useBuyNow,
  useCreateAuction,
  useDeList,
  useDisputeAuction,
  useFreeReserves,
  useFullfilBid,
  useGetAuctionBidDetails,
  useGetListingDetails,
  useGetServiceFee,
  useGetUserReserved,
  useListOnMarketplace,
  useWinnerBid
} from 'hooks/startfiMarketPlace'

import { useActiveWeb3React } from 'hooks'
import { useDeposit } from 'hooks/startfiStakes'
/* End example never merge to the main  branch*/

const Categories = ['All', ...CATEGORIES]

const TabIcons: Dictionary = {
  Books: Books,
  Videos: Videos,
  Art: Art,
  Games: Games,
  All: All,
  Music: Music,
  Images: Images
}

const FullWidth = styled(Box)({
  width: '100%'
})

const NFTsHeader: React.FC = () => {
  const history = useHistory()
  /* Beign example never merge to the main  branch*/
  const { account } = useActiveWeb3React() // get user address from metamask wallet
  /*Start Token tests */
  const transfer = useTransfer()
  const getTokenInfo = useTokenInfo()
  const getTokenBalance = useTokenBalance()
  const approveToken = useApproveToken()
  const getAllowance = useGetAllowance()
  const increaseAllowance = useIncreaseAllowance()
  const decreaseAllowance = useDecreaseAllowance()
  /*end Token tests */
  /*Start NFT tests */
  const approveNft = useApproveNft()
  const mint = useMint()
  const nftInfo = useNftInfo()
  const getTokenUri = useGetTokenURI()
  const getNftOwner = useGetNftOwner()
  const getNftBalance = useNftBalance()
  const getApproverAddress = useGetApproverAddress()
  const getRoyaltyInfo = useRoyaltyInfo()
  const changeFees = useChangeFeesNftPayment()
  const changeNftContract = useChangeNftContractNftPayment()
  const getNftPaymentInfo = useNftPaymentInfo()
  const grantRole = useGrantRoleNft()
  const changePaymentContract = useChangeNftContractNftPayment()
  /*End NFT tests */

  /*end Token tests */
  /*Start Marketplace tests */
  const listMarketplace = useListOnMarketplace()
  const createAuction = useCreateAuction()
  const bid = useBid()
  const fullfilBid = useFullfilBid()
  const delist = useDeList()
  const buyNow = useBuyNow()
  const disputeAuction = useDisputeAuction()
  const freeReserves = useFreeReserves()
  const winnerBid = useWinnerBid()
  const serviceFee = useGetServiceFee()
  const getuserReserved = useGetUserReserved()
  const getListingDetails = useGetListingDetails()
  const getAuctionBidDetails = useGetAuctionBidDetails()

  /*End Marketplace tests */
  /*Start Staking tests */
  const depositStfiToken = useDeposit()
  /*End Staking tests */

  /* End example never merge to the main  branch*/

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(0)
  const getNFTs = useGetNFTs()
  return (
    <FullWidth>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <img src={Logo} alt="Logo" onClick={() => history.push('/')} />
        <Grid>
          <InputSearch value={search} onChange={(e: any) => setSearch(e.target.value)} />
          <ButtonSearch onClick={() => getNFTs({ search })}>Search</ButtonSearch>
        </Grid>
        <Link onClick={() => history.push('whitelist')} underline="none">
          <img src={Heart} alt="Whitelist" />
        </Link>
        <LinkCreateNFT to="mintnft">Start Earning</LinkCreateNFT>
        <Wallet />
      </Grid>
      <TabsCategory
        value={category}
        onChange={async (e, category) => {
          /* Begin example never merge to the main  branch*/

          /*=======================MARKETPLACE=======================*/
          const stfiToken = await getTokenInfo()
          console.log('stfi token is', stfiToken)
          const balance = await getTokenBalance(account as string)
          if (balance === '0x00') {
            new Error('User need some STFI token')
          }
          const marketPlaceServiceFee = await serviceFee()
          console.log('marketPlaceServiceFee', marketPlaceServiceFee)

          // check if user allowed the smart contract to spend token
          const allowedAmountOfToken = await getAllowance(account as string, STARTFI_STAKES_ADDRESS)
          if (allowedAmountOfToken === '0x00') {
            await approveToken(STARTFI_STAKES_ADDRESS, 9000000000)
          }
          console.log('deposit some token for staking, you need to stack token for Listing nft to marketplace')
          const deposit = await depositStfiToken(account as string, 1000)
          console.log('deposit', deposit)

          const approver_first = await getApproverAddress(0) // return '0x0000000000000000000000000000000000000000' mean empty
          console.log('approver', approver_first)
          if (STARTFI_MARKET_PLACE_ADDRESS !== approver_first) {
            approveNft(STARTFI_MARKET_PLACE_ADDRESS, 0)
          }
          const approver_second = await getApproverAddress(1) // return '0x0000000000000000000000000000000000000000' mean empty
          console.log('approver', approver_second)
          if (STARTFI_MARKET_PLACE_ADDRESS !== approver_second) {
            approveNft(STARTFI_MARKET_PLACE_ADDRESS, 1)
          }
          const approver_third = await getApproverAddress(2) // return '0x0000000000000000000000000000000000000000' mean empty
          console.log('approver', approver_third)
          if (STARTFI_MARKET_PLACE_ADDRESS !== approver_third) {
            approveNft(STARTFI_MARKET_PLACE_ADDRESS, 0)
          }
          const listOnMarketplace_first = await listMarketplace(STARTFI_NFT_ADDRESS, 0, 100)
          const listOnMarketplace_second = await listMarketplace(STARTFI_NFT_ADDRESS, 1, 100)
          const listOnMarketplace_third = await listMarketplace(STARTFI_NFT_ADDRESS, 2, 100)

          console.log(
            'listed item to the marketplace',
            listOnMarketplace_first,
            listOnMarketplace_second,
            listOnMarketplace_third
          )

          const auction_first = await createAuction(STARTFI_NFT_ADDRESS, 0, 1, 11, true, 1, 10000000000000)
          const auction_second = await createAuction(STARTFI_NFT_ADDRESS, 1, 1, 11, true, 1, 10000000000000)
          const auction_third = await createAuction(STARTFI_NFT_ADDRESS, 2, 1, 11, true, 1, 10000000000000)

          console.log('auction', auction_first, auction_second, auction_third)

          const bidOnItem = await bid(0, STARTFI_STAKES_ADDRESS, 0, 1)
          await bid(1, STARTFI_STAKES_ADDRESS, 1, 1) // will not fullfil that bid
          console.log('bid on item', bidOnItem)
          const fullfilBidOnItem = await fullfilBid(0)
          console.log('fullfil bid on item', fullfilBidOnItem)

          console.log('auction,marketplace and user info')
          const userReserved = await getuserReserved(account as string)
          console.log('user', userReserved)
          const listingDetails = await getListingDetails(0)
          console.log('listingDetails', listingDetails)
          const auctionDetails = await getAuctionBidDetails(0, account as string)
          console.log('auctionDetails', auctionDetails)
          const bidWinner = await winnerBid(0)
          console.log('bid winner', bidWinner)

          console.log("if user didn't fullfil a bid")
          const disputeAuctionOnBider = await disputeAuction(1)
          console.log('dispute auction on bider', disputeAuctionOnBider)

          console.log('remove item from marketplace')
          const delistNft = await delist(2)
          console.log('delist item from marketplace', delistNft)

          console.log('Buy item')
          const buyNft = buyNow(1, 1)
          console.log('buy now', buyNft)

          const freeReserve = await freeReserves(1)
          console.log('freeReserve', freeReserve)
          /* End example never merge to the main  branch*/
          getNFTs({ category: Categories[category] })
          setCategory(category)
        }}
      >
        {Categories.map(category => (
          <TabCategory
            key={category}
            label={
              <Grid container direction="row" justify="center" alignItems="center">
                <img src={TabIcons[category]} style={{ marginRight: '1vw' }} alt={category} />
                {category}
              </Grid>
            }
          />
        ))}
      </TabsCategory>
    </FullWidth>
  )
}
export default NFTsHeader

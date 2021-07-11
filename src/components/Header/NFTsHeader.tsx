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
import { address as STARTFI_NFT_PAYMENT_ADDRESS } from '../../constants/abis/StartFiNFTPayment.json'
import { address as STARTFI_NFT_ADDRESS } from '../../constants/abis/StartfiRoyaltyNFT.json'

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
import { useActiveWeb3React } from 'hooks'
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
  /*Start NFT tests */
  const mint = useMint()
  const nftInfo = useNftInfo()
  const getTokenUri = useGetTokenURI()
  const getNftOwner = useGetNftOwner()
  const getNftBalance = useNftBalance()
  const getApproverAddress = useGetApproverAddress()
  const getRoyalityInfo = useRoyaltyInfo()
  const approveNft = useApproveNft()
  const changeFees = useChangeFeesNftPayment()
  const changeNftContract = useChangeNftContractNftPayment()
  const getNftPaymentInfo = useNftPaymentInfo()
  const grantRole = useGrantRoleNft()
  const changePaymentContract = useChangeNftContractNftPayment()

  /*End NFT tests */
  /*Start Token tests */
  const transfer = useTransfer()
  const getTokenInfo = useTokenInfo()
  const getTokenBalance = useTokenBalance()
  const approveToken = useApproveToken()
  const getAllowance = useGetAllowance()
  const increaseAllowance = useIncreaseAllowance()
  const decreaseAllowance = useDecreaseAllowance()
  /*end Token tests */
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
        onChange={(e, category) => {
          /* Beign example never merge to the main  branch*/
          //==================Token==================
          approveToken(STARTFI_NFT_PAYMENT_ADDRESS, '9000000000').then((result: any) => {
            console.log('approve token', result)
          })
          getAllowance(account as string, STARTFI_NFT_PAYMENT_ADDRESS).then((result: any) => {
            console.log('get allowance', result)
          })
          increaseAllowance(STARTFI_NFT_PAYMENT_ADDRESS, '3000000').then((result: any) => {
            console.log('increase token allowance', result)
          })
          decreaseAllowance(STARTFI_NFT_PAYMENT_ADDRESS, '10').then((result: any) => {
            console.log('increase token allowance', result)
          })
          transfer(account as string, '1').then(transferTransaction => {
            console.log('transferTransaction', transferTransaction)
          })
          getTokenInfo().then(result => {
            console.log('token info', result)
          })
          getTokenBalance(account as string).then((result: any) => {
            console.log('token balance', result)
          })
          //==================NFT==================
          getNftPaymentInfo().then((result: any) => {
            console.log('nft paymentinfo', result)
          })
          mint(account as string, 'ipfsHash').then(mintTransaction => {
            console.log('mint without royalty', mintTransaction)
          })
          mint(account as string, 'ipfsHash', '1', '10').then(mintTransaction => {
            console.log('mint with royalty', mintTransaction)
          })

          getTokenBalance(account as string).then((result: any) => {
            console.log('token balance', result)
          })
          changeFees('2').then((result: any) => {
            console.log('change fees', result)
          })

          changeNftContract('0xdC0AC0d84358E43d4cB6D1201f359D5BDb5293E4').then((result: any) => {
            console.log('change NFT', result)
          })
          changePaymentContract('0xC80423A1C434b7EE5cF4a31B2Da2DB15D4844Da2').then((result: any) => {
            console.log('change payment', result)
          })

          getNftPaymentInfo().then((result: any) => {
            console.log('nft paymentinfo', result)
          })

          nftInfo().then(info => {
            console.log('info', info)
          })
          getTokenUri('001').then((result: any) => {
            console.log('nft uri', result)
          })
          getNftOwner('001').then((result: any) => {
            console.log('nft owner', result)
          })
          getNftBalance(account as string).then((result: any) => {
            console.log('nft balance', result)
          })
          getApproverAddress('001').then((result: any) => {
            console.log('nft addrress', result)
          })
          getRoyalityInfo('001', '1').then((result: any) => {
            console.log('royality info', result)
          })
          approveNft(STARTFI_NFT_PAYMENT_ADDRESS, '0').then((result: any) => {
            console.log('approve nft', result)
          })

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

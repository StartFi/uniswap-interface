import { checkSuccess } from 'utils'
import { getOwnerNFTs } from './database/NFT'
import { Auction } from './models/Auction'
import { Draft } from './models/Draft'
import { NFT } from './models/NFT'
import { getNFTAuctions } from './database/Auction'
import { addDraft, getDraft } from './database/Draft'
import { getOwnerNFTs } from './database/NFT'
import { addNFTToWishlist, addUser, getUser } from './database/User'
import { Draft } from './models/Draft'
import { NFT } from './models/NFT'

import { User } from './models/User'

export const login = async (ethAddress: string): Promise<User> => {
  const user = await getUser(ethAddress)
  if (user) return user
  const newUser: User = {
    ethAddress,
    wishlist: []
  }
  await addUser(newUser)
  return getUser(ethAddress)
}

interface AddToWishList {
  userId: string
  nftId: number
}

export const addToWishlist = async ({ userId, nftId }: AddToWishList) => {
  const addedToWishlist = await addNFTToWishlist(userId, nftId)
  return { addedToWishlist }
}


export const saveDraft = async (draft: Draft) => {
  const draftAdded = await addDraft(draft)
  const status = checkSuccess({ draftAdded })
  return { status, draftAdded }
}

export const getDrafts = async (user: string) => {
  const drafts = (await getDraft(user)).drafts
  return { drafts }
}


// export const getUserNFTs = async (user: string) => {
// const userNFTs = await getOwnerNFTs(user)
// console.log('user NFT', userNFTs)
//  const onMarket: NFT[] = []
//   const offMarket: NFT[] = []

// for (var i in userNFTs) {
// console.log('i=>', i)
// const auctions = await getNFTAuctions(user)
// console.log('auctions=>', auctions)
// if (auctions.filter(auction => auction.status === 'open').length > 0) onMarket = onMarket.concat(userNFTs[i])
// else offMarket.push(userNFTs[i])
// console.log('onMarket=>', onMarket)
// }

// return { onMarket, offMarket }
// }

// get onMarket offMarket NFT
export const getUserNFTs = async (user: string) => {
  const userNFTs = await getOwnerNFTs(user)
  const NftArray: NFT[] = [...Object.values(userNFTs)]
  const auctions: any = []
  let onMarket: NFT[] = []
  let offMarket: NFT[] = [...NftArray]
  NftArray.forEach(async e => {
    await auctions.push(getNFTAuctions(e.id))
  })

  const userAuctions = await Promise.all(Object.values(auctions))
  const trueUserAuctions = userAuctions.filter(e => e) as Auction[]
  let modifiedUserAuctions = [] as Auction[]
  trueUserAuctions.forEach((e: any) => {
    let auctionItem = Object.values(e) as Auction[]
    modifiedUserAuctions.push(auctionItem[0])
  })

  modifiedUserAuctions.forEach(e => {
    const NftID = e.nft
    const status = e.status
    if (status === 'open') {
      const auctionNft = NftArray.filter(nft => nft.id === NftID)
      onMarket.push(auctionNft[0])
      offMarket = [...offMarket.filter(nft => nft.id !== NftID)]
    }
  })



  return { onMarket, offMarket }
}

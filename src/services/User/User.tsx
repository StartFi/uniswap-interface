import { add, get, update } from 'services/firebase/Firebase'

// import { NFT } from "state/nfts/reducer"
export type UserDoc = {
  ethAddress: string | null | undefined
  name?: string
  email?: string
  // NFT hash array belong to user
  NFTs?: Array<string>
  // NFT hash array belong to any
  wishlist?: Array<number>
}

// add user for first time
export const addUser = async (user: UserDoc) => {
  if (!user.ethAddress || (await get('users', user.ethAddress))) return
  return await add('users', user.ethAddress, user)
}

// update user
export const updateUser = async (user: UserDoc) => {
  if (!user.ethAddress) return
  const userData = await get('users', user.ethAddress)
  if (!userData) return
  const userUpdate = { ...userData, ...user }
  return await update('users', user.ethAddress, userUpdate)
}

// get user data
export const getUserData = async (account: any): Promise<UserDoc> => {
  const userData = await get('users', account)
  return userData
}

// update user whiteList
export const updateWhishList = async ({ accountId, nftId }: any) => {



  if (!accountId) throw Error('You are not connected')
  let user = await getUserData(accountId)
  if (!user) throw Error('Not user')
  let nftsWishList: Array<number>
  if (user?.wishlist) {
    nftsWishList = [...user.wishlist]
    nftsWishList.includes(nftId) ? (nftsWishList = nftsWishList) : (nftsWishList = nftsWishList.concat(nftId))
  } else {
    nftsWishList = [nftId]
  }

  const updatedUserData = { ...user, wishlist: [...nftsWishList] }
  return await updateUser(updatedUserData)
}

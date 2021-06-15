import { addUser, updateUser,getUserData, updateWhishList,} from './../../services/User/User';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { saveDraft } from 'services/User'

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
}

export interface SerializedPair {
  token0: SerializedToken
  token1: SerializedToken
}

export const updateMatchesDarkMode = createAction<{ matchesDarkMode: boolean }>('user/updateMatchesDarkMode')
export const updateUserDarkMode = createAction<{ userDarkMode: boolean }>('user/updateUserDarkMode')
export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>('user/updateUserExpertMode')
export const updateUserSingleHopOnly = createAction<{ userSingleHopOnly: boolean }>('user/updateUserSingleHopOnly')
export const updateUserSlippageTolerance = createAction<{ userSlippageTolerance: number }>(
  'user/updateUserSlippageTolerance'
)
export const updateUserDeadline = createAction<{ userDeadline: number }>('user/updateUserDeadline')
export const addSerializedToken = createAction<{ serializedToken: SerializedToken }>('user/addSerializedToken')
export const removeSerializedToken = createAction<{ chainId: number; address: string }>('user/removeSerializedToken')
export const addSerializedPair = createAction<{ serializedPair: SerializedPair }>('user/addSerializedPair')
export const removeSerializedPair = createAction<{ chainId: number; tokenAAddress: string; tokenBAddress: string }>(
  'user/removeSerializedPair'
)
export const toggleURLWarning = createAction<void>('app/toggleURLWarning')

export const clearError =createAction<void>('user/clearError')
export const clearSuccess =createAction<void>('user/clearSuccess')

// export const whitelistNFT = createAsyncThunk('nfts/getNFTs', addToWhitelist)

// ADD USER DOCS
export const addUserDocs =createAsyncThunk('user/addDocs', addUser)


// UPDATE USER DOCS
export const updateUserDocs =createAsyncThunk('user/updateDocs',updateUser)

// get user Docs
export const getUserDocs =createAsyncThunk('user/getDocs',getUserData )

// get user Docs
export const updateUserWishList =createAsyncThunk('user/updateWhiteList',updateWhishList  )



export const saveDraftAction = createAsyncThunk('user/saveDraftAction', saveDraft)

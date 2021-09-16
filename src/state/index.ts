import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'

import marketplace from './marketplace/reducer'
import inventory from './inventory/reducer'
import application from './application/reducer'
import { updateVersion } from './global/actions'
import user from './user/reducer'
import transactions from './transactions/reducer'
import multicall from './multicall/reducer'
import ipfs from './ipfs/reducer'
import bcEvent from './blockchainEvents/reducer'
import nft from './Nft/reducer'
import _inventory from './_Inventory/reducer'
import _marketplace from './_Marketplace/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists', 'inventory']

const store = configureStore({
  reducer: {
    marketplace,
    application,
    user,
    inventory,
    transactions,
    multicall,
    ipfs,
    bcEvent,
    nft,
    _inventory,
    _marketplace
  },

  middleware: [
    ...getDefaultMiddleware({
      thunk: true,
      logger: false,
      serializableCheck: false
    }),
    save({ states: PERSISTED_KEYS })
  ],

  preloadedState: load({ states: PERSISTED_KEYS })
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

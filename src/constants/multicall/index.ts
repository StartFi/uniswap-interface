import { ChainId } from '../supportedChains'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.BSC]: '0x1ee38d535d541c55c9dae27b12edf090c608e6fb',
  [ChainId.GÖRLI]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
  [ChainId.BSCT]: '0x67ADCB4dF3931b0C5Da724058ADC2174a9844412',
  [ChainId.POLYGON]: '0x67ADCB4dF3931b0C5Da724058ADC2174a9844412',
  [ChainId.AURORA]: '0x67ADCB4dF3931b0C5Da724058ADC2174a9844412',
  [ChainId.StartFi]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821'
}
// 56: '0x1ee38d535d541c55c9dae27b12edf090c608e6fb',
// 97: '0x67ADCB4dF3931b0C5Da724058ADC2174a9844412',

export { MULTICALL_ABI, MULTICALL_NETWORKS }

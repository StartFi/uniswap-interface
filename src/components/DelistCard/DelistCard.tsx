
import { Divider } from 'components/InMarketAsset/InMarket.styles'
import React from 'react'
import { NFT } from 'services/models/NFT'
// import { useTranslation } from 'react-i18next'
import { PaymentModal, Container,Shadow, DelistCardHeader} from './DelistCard.style'
import Text from '../Text'

interface PaymentCardProps {
    isOpen: boolean
    close: () => void
    nft:NFT
  }


const DelistCard: React.FC<PaymentCardProps> = ({isOpen,close,nft}) => {


  if (!isOpen) return null
  return (
    <React.Fragment>
    <Shadow onClick={close} />
    <PaymentModal>
    <Container minHeight='70vh'>

      <DelistCardHeader>
        <Text  fontFamily='Roboto' fontSize='1.2rem' color='#000000'  font-weight="500" margin="5px 0px 15px 0px">Delisting Asset "{nft?.name}"</Text>
        <Divider left="-7.8%" width="115.5%" backgroundColor="#D1D1D1"></Divider>
      </DelistCardHeader>
      <Text fontFamily='Roboto' fontSize='1.0rem' color='#444444'  font-weight="400">
          Delisting the asset from the market place right now Will cost you stakes if it’s didn’t Exceed the minimaum duration of delisting
      </Text>
       <Text textTransform ="upperCase" fontFamily='Roboto' fontSize='0.875rem' color='#000000'  font-weight="400" margin="5px 0px 5px 0px">
       minimum delisting duration Left
      </Text>
      </Container>
    </PaymentModal>
    </React.Fragment>
  )
}

export default DelistCard;

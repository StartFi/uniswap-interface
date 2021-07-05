import React from 'react'
import { NFT } from 'services/models/NFT'
import uriToHttp from 'utils/uriToHttp'
import Text from '../Text'
import { CardContent, MiniInvCard, TagContainer, TextContainer, Image } from './InvHome.styles'

interface MiniCardContent {
  cardContent: NFT
  navigate: () => void
}
const MiniCard: React.FC<MiniCardContent> = ({ cardContent, navigate }) => {
  let tags: string[] = []
  if (cardContent?.tags) tags = [...cardContent?.tags].splice(0, 2)
  const imgUrl = uriToHttp(`${cardContent.image}`)[0]
  return (
    <MiniInvCard onClick={navigate}>
      <CardContent>
        <Image src={imgUrl}></Image>
        <TextContainer>
          <Text fontFamily='Roboto' fontSize='1rem' color='#000000' margin='-1px 0'>
            {cardContent?.name ? cardContent.name : 'No Data Available'}
          </Text>
          <Text fontFamily='Roboto' fontSize='0.75rem' color='#000000' margin='-1px 0'>
            {cardContent?.description ? cardContent.description : 'No Data Available'}
          </Text>
          <TagContainer lastChildWidth='69px'>
            {tags?.map(e => (
              <div key={e}>{e}</div>
            ))}
          </TagContainer>
        </TextContainer>
      </CardContent>
    </MiniInvCard>
  )
}

export default MiniCard

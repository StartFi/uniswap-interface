import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import Header from './Header'

const Container = styled.div`
  width: 100%;
  background-color: #FAFAFA;
  padding: 4vh 3.2vw;
`

const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-top: 5vh;
`

const CardBase = styled.div`
  min-height: 86vh;
  padding: 5vh 3vw;
  background: #ffffff;
  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(239, 239, 239, 0.25);
  border-radius: 8px 8px 0px 0px;
`

const Left = styled(CardBase)`
  width: 37%;
`

const Right = styled(CardBase)`
  width: 60%;
`

const MintNFT: React.FC = () => {
  return (
    <Container>
      <Header />
      <Body>
        <Left>Need help?</Left>
        <Right>
          <Card />
        </Right>
      </Body>
    </Container>
  )
}

export default MintNFT

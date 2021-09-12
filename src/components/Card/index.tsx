import React from 'react'
import styled from 'styled-components'
import { CardProps, Text } from 'rebass'
import { Box } from 'rebass/styled-components'

const Card = styled(Box)<{
  width?: string
  height?: string
  padding?: string
  border?: string
  borderRadius?: string
  background?: string
  marginTop?: string
  margin?: string
  alignItems?: string
  flexDirection?: string
}>`
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height};
  border-radius: 16px;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ background }) => background};
  margin-top: ${({ marginTop }) => marginTop};
  margin: ${({ margin }) => margin};
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: center;
  align-items: ${({ alignItems }) => alignItems};
`
export default Card

export const LightCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

export const LightGreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg2};
`

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg3};
`

export const OutlineCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.bg3};
`

export const YellowCard = styled(Card)`
  background-color: rgba(243, 132, 30, 0.05);
  color: ${({ theme }) => theme.yellow2};
  font-weight: 500;
`

export const PinkCard = styled(Card)`
  background-color: rgba(255, 0, 122, 0.03);
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
`

const BlueCardStyled = styled(Card)`
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primary1};
  border-radius: 12px;
  width: fit-content;
`

export const BlueCard = ({ children, ...rest }: CardProps) => {
  return (
    <BlueCardStyled {...rest}>
      <Text fontWeight={500} color="#2172E5">
        {children}
      </Text>
    </BlueCardStyled>
  )
}

export const ContainerCard = styled('div')<{
  borderRadius?: string
  marginTop?: string
  height?: string
  width: string
}>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin: 0px auto 0px auto;
  background-color: #ffffff;
  border: 1px solid #e3e3e3;
  box-shadow: 0px 0px 20px rgba(239, 239, 239, 0.25);
  overflow-y: auto;
  border-radius: ${({ borderRadius }) => borderRadius};
  margin-top: ${({ marginTop }) => marginTop};
  &::-webkit-scrollbar {
    width: 15px;
    border: 1px solid #e3e3e3;
    background-color: #efefef;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: #b5b5b5;
  }
`

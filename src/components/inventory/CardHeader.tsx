import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 92%;
  margin: 38px auto 0px auto;
  height: 94px;
  background-color: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 8px 8px 0px 0px;
`

const TabsCategory = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-left: -40px;
`

interface TabProps {
  readonly selected: boolean
}

const Tab = styled.div<TabProps>`
  margin-left: 80px;
  padding-bottom: 1vh;
  cursor: pointer;
  border-bottom: ${props => (props.selected ? '2px solid #000000;' : 'none;')};
  color: ${props => (props.selected ? ' #000000;' : '#919191;')};
  transition: ease-in-out 0.3s all;
`

const inventoryTypes: Array<string> = ['Draft', 'In marketplace', 'off market place']

const CardHeader = () => {
  const [inventoryType, setInventoryType] = useState(inventoryTypes[0])
  const { t } = useTranslation()

  return (
    <Container>
      <TabsCategory>
        {inventoryTypes.map(type => (
          <Tab
            key={type}
            selected={inventoryType === type}
            onClick={() => {
              setInventoryType(type)
            }}
          >
            {t(type)}
          </Tab>
        ))}
      </TabsCategory>
    </Container>
  )
}

export default CardHeader

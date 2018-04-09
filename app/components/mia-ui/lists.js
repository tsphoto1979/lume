import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Flex, Box} from 'grid-styled'
import {gray60, blue} from './colors'
import {H2} from './text'
import Link from 'next/link'

const GridFlex = styled(Flex)`
  position: relative;
  min-height: 300px;
`

export const GridList = (props) => (
  <GridFlex
    {...props}
  >
    {props.children}
  </GridFlex>
)

GridList.defaultProps = {
  flexWrap: 'wrap'
}

const TileText = styled.div`
  position: absolute;
  background-color: ${gray60};
  width: 100%;
  height: 40%;
  bottom: 0;
  padding: 10px;
  opacity: 0;
  transform: translateY(100%);
  transition: all .2s;
`

const TileContainer = styled.a`
  position: relative;
  display: block;
  width: 100%;
  height: ${({height}) => height};
  cursor: pointer;
  overflow: hidden;
  &:hover {
    ${TileText}{
      opacity: 1;
      transform: translateY(0);
    }
  }
  ${({selected, theme})=> selected ? `
    box-shadow: 0 0 10px 3px ${theme.color.green};
  ` : null}

`

TileContainer.propTypes = {
  height: PropTypes.string,
}

TileContainer.defaultProps = {
  height: '180px'
}

const TileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

TileImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
}

export const Tile = (props) => (
  <Box
    {...props}
  >
    {props.link ? (
      <Link
        href={props.href}
        as={props.as}
      >
        <TileContainer
          height={props.height}
          selected={props.selected}
        >
          <TileImage
            src={props.src}
            alt={props.alt}
          />
          <TileText>
            <H2
              color={"white"}
            >
              {props.text}
            </H2>
          </TileText>
        </TileContainer>
      </Link>
    ): (
      <TileContainer
        height={props.height}
        selected={props.selected}
      >
        <TileImage
          src={props.src}
          alt={props.alt}
        />
        <TileText>
          <H2
            color={"white"}
          >
            {props.text}
          </H2>
        </TileText>
      </TileContainer>

    )}

  </Box>

)

Tile.defaultProps = {
  p: 1,
  width: [1, 1/2, 1/2]
}

Tile.propTypes = {
  href: PropTypes.shape({
    pathname: PropTypes.string,
    query: PropTypes.object
  }),
  as: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  text: PropTypes.string,
  height: PropTypes.string,
  link: PropTypes.bool
}
import React from 'react'

/* This must be in the header
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
  */
import PropTypes from 'prop-types'

import styled from 'styled-components'

const I = styled.i`
  font-size: ${({ size }) => size};
  color: ${({ color, theme }) => theme.color[color]};
  text-decoration: none;
`

export const Icon = props => (
  <I {...props} children={props.icon}>
    {props.icon}
  </I>
)

Icon.displayName = 'Icon'

Icon.defaultProps = {
  icon: 'face',
  color: 'black',
  className: 'material-icons'
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string
}

export const ContentIcon = ({ type, selected }) => {
  let icon = ''
  let color = selected ? 'blue' : 'white'
  switch (type) {
    case 'comparison': {
      icon = 'compare'
      break
    }
    case 'detail': {
      icon = 'crop'
      break
    }
    case 'movie': {
      icon = 'movie'
      break
    }
    case 'obj': {
      icon = 'beach_access'
      break
    }
    default:
    case 'picture': {
      icon = 'panorama'
      break
    }
  }

  return <Icon color={color} icon={icon} />
}

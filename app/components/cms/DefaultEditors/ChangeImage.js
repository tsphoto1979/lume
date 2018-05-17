import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from '../../mia-ui/buttons'
import { Label } from '../../mia-ui/forms'
import { Modal } from '../../mia-ui/modals'
import ImageManager from '../ImageManager'
import router from 'next/router'
import { Flex, Box } from 'grid-styled'
import imgSrcProvider from '../../shared/ImgSrcProvider'

const ImgEl = styled.img`
  height: auto;
  width: 100%;
  object-fit: cover;
  transition: 0.2s all;

  &:hover {
    transform: scale(1.05);
  }
`

const Img = imgSrcProvider(ImgEl)

export default class ChangeImage extends Component {
  state = {
    modal: false,
    subdomain: 'local'
  }

  render() {
    const {
      handleModalOpen,
      handleModalClose,
      props: { image, label, id },
      handleChange,
      state: { modal, subdomain }
    } = this

    return (
      <Flex flexWrap={'wrap'}>
        <Box w={1}>
          <Label>{label}</Label>
        </Box>
        <ImageBox w={1} onClick={handleModalOpen}>
          {image ? <Img image={image} /> : null}
          <ChangeButton onClick={handleModalOpen} id={this.props.id}>
            Change
          </ChangeButton>
        </ImageBox>

        <Modal open={modal} onClose={handleModalClose}>
          {modal ? (
            <ImageManager subdomain={subdomain} onImageSave={handleChange} />
          ) : null}
        </Modal>
      </Flex>
    )
  }

  componentDidMount() {
    this.setState({ subdomain: router.router.query.subdomain })
  }

  handleModalOpen = () => {
    this.setState({
      modal: true
    })
  }

  handleModalClose = () => {
    this.setState({
      modal: false
    })
  }

  handleChange = imageId => {
    const { onChange, name } = this.props

    onChange({
      target: {
        value: imageId,
        name
      }
    })
    this.setState({ modal: false })
  }
}

const ImageBox = styled(Flex)`
  height: 130px;
  width: 130px;
  position: relative;
`
const ChangeButton = styled(Button)`
  position: absolute;
  height: 40px;
  display: flex;
  align-self: flex-end;
  width: 100%;
  justify-content: center;
  margin: 0;
  border: 0;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100px;
`

import React, {Component} from 'react'
import styled from 'styled-components'
import Template from '../Template/Template'
import {H1, H2, H3, H4} from '../../ui/h'
import Zoomer from '../Zoomer'
import {Column, Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import AppPage from '../AppPage'

export default class extends Component {

  state = {
    pageIndex: 0
  }


  render() {

    if (this.props.data.loading) return null

    const {
      props: {
        data: {
          book: {
            title,
            pages
          }
        }
      },
      state: {
        pageIndex
      },
      changePage
    } = this

    let page = pages.find( page => page.index === pageIndex)

    return (
      <Template
        drawer={false}
      >
        <PageButtonContainer>
          {(pageIndex !== 0) ? (
            <Button
            onClick={()=>changePage(-1)}
            >
              Back
            </Button>
          ): <div/>}
          {(pageIndex < pages.length - 1) ? (
            <Button
              onClick={()=>changePage(1)}
            >
              Forward
            </Button>
          ): <div/>}

        </PageButtonContainer>
        <Container>
          <BookHeaderFooter>
            <H3>
              {title}
            </H3>
          </BookHeaderFooter>
          <AppPage
            pageId={page.id}
          />
          <BookHeaderFooter>
            <H3>
              Page {pageIndex + 1} of {pages.length}
            </H3>
          </BookHeaderFooter>
        </Container>


      </Template>
    )
  }

  changePage = (change) => {
    const {
      state: {
        pageIndex
      },
      props: {
        data: {
          book: {
            pages
          }
        }
      }
    } = this

    let newPageIndex = pageIndex + change

    let maxIndex = pages.length - 1
    let minIndex = 0

    if (newPageIndex > maxIndex || newPageIndex < minIndex) {
      return
    }

    this.setState({
      pageIndex: newPageIndex
    })

  }


}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const BookHeaderFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${({theme}) => theme.colors.black};
  color: ${({theme}) => theme.colors.white};
`


const PageButtonContainer = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  transform: translateY(%50);
  width: 100%;
  justify-content: space-between;
  z-index: 1001;
`

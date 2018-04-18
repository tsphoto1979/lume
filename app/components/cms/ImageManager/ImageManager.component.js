import React from 'react'
import {Component} from 'react'
import {TabContainer, TabHeader, Tab, TabBody} from '../../mia-ui/tabs'
import {Button} from '../../mia-ui/buttons'
import {Search} from '../../mia-ui/forms'
import ImageUploader from './ImageUploader'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Zoomer from '../../shared/Zoomer'
import {GridList, Tile} from '../../mia-ui/lists'
import getImageSrc from '../../../utils/getImageSrc'
import {Flex, Box} from 'grid-styled'
import {H3} from '../../mia-ui/text'
import imgSrcProvider from '../../shared/ImgSrcProvider'


let Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`
Image = imgSrcProvider(Image)

export default class ImageManager extends Component {


  state = {
    selectedTab: "select",
    search: ""
  }

  render() {

    if (!this.props.images) return null

    const {
      state: {
        selectedTab,
        selectedImageId,
        search
      },
      props: {
        images,
        router: {
          query: {
            subdomain
          }
        },
        organization
      },
      handleLoadMore,
      handleImageSave,
      handleChange,
      handleSearch,
      handleRefetch
    } = this

    console.log(this.props)

    return (
      <Container>

        <TabContainer
          selectedTab={selectedTab}
        >
          <TabHeader>
            <Tab
              name={"select"}
              onClick={()=>this.setState({selectedTab: "select"})}
            >
              Select
            </Tab>
            <Tab
              name={"upload"}
              onClick={()=>this.setState({selectedTab: "upload"})}
            >
              Upload
            </Tab>
          </TabHeader>

          <TabBody
            name={"select"}
          >
            <Flex
              p={1}
            >
                <Flex
                  width={1/2}
                  flexDirection={'column'}
                >
                  <Box
                    width={1}
                  >
                    <Search
                      value={search}
                      name={"search"}
                      onChange={handleChange}
                    />


                  </Box>


                  <ImageList
                    w={1}
                    flexWrap={'wrap'}
                  >
                    {images.map(image => (
                      <ImageBox
                        key={image.id}
                        width={[1/3]}
                        p={2}
                        onClick={()=>this.setState({selectedImageId: image.id})}
                      >
                        <Image
                          image={image}
                          quality={"s"}
                        />

                      </ImageBox>
                    ))}
                    <Box
                      width={1}
                    >
                      {(images.length < 1) ? (
                        <p>You don't have any images yet</p>
                      ):null}
                      {(images.length % 10 === 0) ? (
                        <Button
                          onClick={handleLoadMore}
                          color={'white'}
                        >
                          Load More
                        </Button>
                      ): null}
                    </Box>
                  </ImageList>

                {/* <GridList>

                  {images.map( (image) => (
                    <Tile
                      w={[1/2,1/3, 1/4]}
                      height={'120px'}
                      key={image.id}
                      onClick={()=>this.setState({selectedImageId: image.id})}
                      selected={(selectedImageId === image.id)}
                      src={getImageSrc({
                        image,
                        organization,
                        quality: 's'
                      })}
                      alt={image.title}
                      text={image.title}
                    />
                  ))}

                </GridList> */}





            </Flex>




              <Flex
                width={1/2}
                p={2}
              >
                {(selectedImageId) ? (
                  <Zoomer
                    imageId={selectedImageId}
                  />
                ): (
                  <H3>
                    Choose an image from the left
                  </H3>
                )}
              </Flex>
            </Flex>




            <Button
              onClick={handleImageSave}
            >
              Select
            </Button>
          </TabBody>
          <TabBody
            name={"upload"}
          >
            <ImageUploader
              subdomain={subdomain}
              refetch={handleRefetch}
            />
          </TabBody>
        </TabContainer>
      </Container>
    )
  }


  handleImageSave = () => {
    console.log(this.state)
    this.props.onImageSave(this.state.selectedImageId)
  }

  handleLoadMore = () => {
    this.props.fetchMore({
      variables: {
        filter: {
          limit: 10,
          organizationId: this.props.organization.id,
          offset: this.props.images.length
        }
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult }

        return Object.assign({}, previousResult, {
          images: [...previousResult.images, ...fetchMoreResult.images]
        })
      },
    })
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  handleSearch = () => {
    this.props.refetch({
      filter: {
        ...this.props.variables.filter,
        search: this.state.search
      }
    })
  }

handleRefetch = async () => {
  try {
    await this.props.refetch()
    this.setState({selectedTab: "select"})
  } catch (ex) {
    console.error(ex)
  }
}


}


const Container = styled(Flex)`
  width: 80vw;
  height: 80vh;
`

const ImageList = styled(Flex)`
  overflow-y: scroll;
`

const ImageBox = styled(Box)`
  height: 150px;
`


// const SearchRow = styled(Row)`
//   height: auto;
// `
//
// const ImageSearch = styled(Search)`
//   width: 100px;
// `
//
// export const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: stretch;
//   width: 100%;
//   height: 600px;
// `
//
// const PreviewContainer = styled.div`
//   display: flex;
//   width: 100%;
//   height: 600px;
// `
//
// export const ThumbColumn = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: space-around;
//   align-content: flex-start;
//   flex-wrap: wrap;
//   margin: 10px;
//   width: 40%;
//   border: 1px solid black;
//   overflow-y: scroll;
//   box-sizing: border-box;
//
// `
//
// export const Right = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: stretch;
//   margin: 10px;
//   width: 60%;
//   border: 1px solid black;
// `

import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3} from '../../mia-ui/text'
import {Waiting} from '../../mia-ui/loading'
import {Button} from '../../mia-ui/buttons'
// import Image from '../../shared/Image'
import {Title, Description, Label, Select, Option, MultiSelect} from '../../mia-ui/forms'
import {ChangeImage} from '../DefaultEditors'
import ImageManager from '../ImageManager'
import DeleteStoryButton from '../DeleteStoryButton'
import StoryAssociator from '../StoryAssociator'
import StoryGroupSelector from '../StoryGroupSelector'
import {ToolTip} from '../../mia-ui/tooltips'
import {Flex, Box} from 'grid-styled'
import {Modal} from '../../mia-ui/modals'
import getImageSrc from '../../../utils/getImageSrc'
import {Expander} from '../../mia-ui/expanders'

export default class StoryEditor extends Component {

  static defaultProps = {
    storyId: PropTypes.string.isRequired,
  }

  initialValues = {
    title: "",
    description: "",
    previewImageId: undefined,
    template: "original",
    visibility: "draft"
  }

  state = {
    ...this.initialValues,
    sync: true
  }

  render() {

    if (!this.props.story) return null

    const {
      state: {
        title,
        description,
        previewImageId,
        template,
        visibility
      },
      handleChange,
      handleSave,
      handleGroupSelectionSave,
      props: {
        storyId,
        router,
        story: {
          groups,
          previewImage
        },
        organization
      }
    } = this

    let selections = [
      {
        name: 'Delta',
        value: 'd'
      },
      {
        name: 'Echo',
        value: 'e'
      },
    ]

    let options = [
      {
        name: 'Alpha',
        value: 'a'
      },
      {
        name: 'Bravo',
        value: 'b'
      },
      {
        name: 'Charlie',
        value: 'c'
      },
      {
        name: 'Echo',
        value: 'e'
      },
    ]

    return (
      <Flex
        width={1}
        p={3}
      >
        <Flex
          width={1/2}
          flexDirection={'column'}
        >




          <Title
            name={'title'}
            value={title}
            onChange={handleChange}
            label={'Title'}
          />
          <Description
            name={'description'}
            value={description}
            onChange={handleChange}
            label={'Description'}
          />


          <ChangeImage
            label={"Image"}
            name={"previewImageId"}
            src={getImageSrc({
              organization,
              image: previewImage,
              quality: 'm'
            })}
            onChange={handleChange}
          />

          <MultiSelect
            selections={selections}
            options={options}
            onSearchChange={(search) => {console.log("search", search)}}
          />
        </Flex>
        <Flex
          width={1/2}
          flexDirection={'column'}
        >
          <Label>
            Template
          </Label>
          <Select
            name={"template"}
            onChange={handleChange}
            value={template || 'original'}
          >
            <Option
              value={"original"}
            >
              Original
            </Option>
            <Option
              value={"slider"}
            >
              Slider
            </Option>
          </Select>

          <Label>
            Visibility
          </Label>
          <Select
            name={"visibility"}
            onChange={handleChange}
            value={visibility || 'draft'}
          >

            <Option
              value={"draft"}
            >
              Draft
            </Option>
            <Option
              value={"published"}
            >
              Published
            </Option>
          </Select>

          <StoryGroupSelector
            onGroupSelectionSave={handleGroupSelectionSave}
            selectedGroupIds={groups.map(group => group.id)}
          />


            <StoryAssociator
              storyId={storyId}
            />
            {/* <DeleteStoryButton
              storyId={storyId}
            /> */}

        </Flex>






      </Flex>
    )
  }

  bounce = true

  debounce = (func) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(
        func,
        2000
      )
    }
  }

  componentWillReceiveProps(nextProps){
    this.mapPropsToState(nextProps)
  }

  mapPropsToState = (nextProps) => {
    if (
      nextProps.story ||
      nextProps.storyId !== this.state.id
    ) {
      let {
        story,
        story: {
          previewImage
        }
      } = nextProps

      this.setState({
        ...story,
        previewImageId: previewImage ? previewImage.id : ""
      })
    }
  }

  handleGroupSelectionSave = (selectedGroupIds) => {

    this.props.setSaveStatus({
      saving: true,
    })

    this.props.editStory({
      setGroupsIds: selectedGroupIds
    })

    this.props.setSaveStatus({
      synced: true,
      saving: false,
      lastSave: Date.now()
    })

  }

  handleChange = ({target: {value, name}}) => {
    this.setState(
      ()=>({
        [name]: value,
      }),
      ()=>{
        this.props.setSaveStatus({
          synced: false
        })
        this.debounce(this.handleSave)
      }
    )
  }

  handleSave = async () => {
    try {

      this.props.setSaveStatus({
        saving: true,
      })

      await this.props.editStory({
        ...this.state,
        previewImageId: this.state.previewImageId || undefined
      })

      this.props.setSaveStatus({
        synced: true,
        saving: false,
        lastSave: Date.now()
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  componentWillUnmount(){
    this.handleSave()
  }

}

// const Top = styled.div`
//   display: flex;
//   justify-content:space-between;
//   min-height: 70px;
//   width: 100%;
// `
//
// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
//   padding: 20px;
//   box-sizing:border-box;
//   overflow-y:scroll;
// `
//
//
//
// const Column = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
//   height: 100%;
//   width: 50%;
// `
//
// const Row = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   height: 100%;
//   min-height: 400px;
// `

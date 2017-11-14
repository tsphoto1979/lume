

import gql from 'graphql-tag'

const mutation = gql`
  mutation editOrCreatePage (
    $pageId: ID
    $title: String
    $text: String
    $comparisonImage0: ID
    $comparisonImage1: ID
    $mainImageId: ID
    $type: String
    $video: String
    $index: Int
  ) {
    editOrCreatePage (
      id: $pageId
      title: $title
      text: $text
      comparisonImage0: $comparisonImage0
      comparisonImage1: $comparisonImage1
      mainImageId: $mainImageId
      type: $type
      video: $video
      index: $index
    ) {
      id
      title
      text
      type
      index
      mainImage {
        id
      }
      video
    }
  }
`

export default mutation

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'
import {ContentTypeEnum} from '../graphql/types/enums'
import imageType from '../graphql/types/image'

import {
  fields as pictureFields,
  args as pictureArgs
} from './picture/graphql'

import {
  fields as movieFields,
  args as movieArgs
} from './movie/graphql'

import {
  fields as comparisonFields,
  args as comparisonArgs
} from './comparison/graphql'



export const contentType = new GraphQLObjectType({
  name: "content",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    type: {
      type: ContentTypeEnum
    },
    index: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    image0: {
      type: imageType,
      async resolve(src){
        try {
          return await src.getImage0()
        } catch (ex) {
          console.error(ex)
        }
      }
    },
    ...pictureFields,
    ...movieFields,
    ...comparisonFields
  })
})


export const args = {
  id: {
    type: GraphQLID
  },
  type: {
    type: ContentTypeEnum
  },
  title: {
    type: GraphQLString
  },
  description: {
    type: GraphQLString
  },
  image0Id: {
    type: GraphQLID
  },
  ...pictureArgs,
  ...movieArgs,
  ...comparisonArgs,
}
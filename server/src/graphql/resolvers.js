//queries
import book from './queries/book'
import detail from './queries/detail'
import group from './queries/group'
import image from './queries/image'
import item from './queries/item'
import organization from './queries/organization'
import page from './queries/page'
import user from './queries/user'
import clip from './queries/clip'


import organizations from './queries/organizations'
import items from './queries/items'
import books from './queries/books'


import Organization from './root/Organization'
import Item from './root/Item'
import User from './root/User'
import Image from './root/Image'
import Detail from './root/Detail'
import Clip from './root/Clip'
import Book from './root/Book'


//mutations
import editOrCreateItem from './mutations/editOrCreateItem'
import editOrCreateOrganization from './mutations/editOrCreateOrganization'
import editOrCreateImage from './mutations/editOrCreateImage'
import editOrCreateDetail from './mutations/editOrCreateDetail'
import editOrCreateClip from './mutations/editOrCreateClip'
import editOrCreateBook from './mutations/editOrCreateBook'
import deleteItem from './mutations/deleteItem'
import deleteDetail from './mutations/deleteDetail'
import deleteClip from './mutations/deleteClip'

const resolvers = {
  Query: {
    book,
    clip,
    detail,
    group,
    image,
    item,
    organization,
    page,
    items,
    books,
    user,
    organizations
  },
  Mutation: {
    editOrCreateItem,
    editOrCreateOrganization,
    editOrCreateImage,
    editOrCreateDetail,
    editOrCreateClip,
    editOrCreateBook,
    deleteItem,
    deleteDetail,
    deleteClip
  },
  Item,
  User,
  Organization,
  Image,
  Detail,
  Clip,
  Book
}

export default resolvers

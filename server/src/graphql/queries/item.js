import itemModel from '../../db/models/item'

export default async function item(src, {id}, ctx){
  try {
    return await itemModel.findById(id)
  } catch (ex) {
    console.error(ex)
  }
}

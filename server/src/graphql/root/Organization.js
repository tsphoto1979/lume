import organizationModel from '../../db/models/organization'
import userOrganizationModel from '../../db/models/userOrganization'
import {getUser} from '../../auth/management'

const Organization = {
  async users(organization){
    try {
      const userOrgs = await userOrganizationModel.findAll({
        where: {
          organizationId: organization.id
        }
      })



      const users = await Promise.all(
        userOrgs.map( ({userId}) => getUser(userId))
      )

      users.forEach( user => {
        user.id = user["user_id"]
      })

      return users
    } catch (ex) {
      console.error(ex)
    }
  },
  async items(organization){
    try {
      const organization = await organizationModel.findById(organization.id)

      return await oranization.getItems()
    } catch (ex) {
      console.error(ex)
    }
  }
}

export default Organization

import React, {Component} from 'react'
import OrgHome from '../../../components/OrgHome'
import withData from '../../../apollo/withData'
import Cookie from 'js-cookie'


class OrgIndex extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")
      const {orgSub} = ctx.query
      return {
        userId,
        orgSub
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <OrgHome
        {...this.props}
      />
    )
  }
}

export default withData(OrgIndex)

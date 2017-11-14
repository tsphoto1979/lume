import gql from 'graphql-tag'

const mutation = gql`
  mutation editOrCreateOrganization (
    $orgId: ID
    $newUserIds: [ID]
    $name: String
    $subdomain: String
    $customItemApiEnabled: Boolean
    $customItemApiEndpoint: String
  ) {
    editOrCreateOrganization (
      id: $orgId
      newUserIds: $newUserIds
      name: $name
      subdomain: $subdomain
      customItemApiEndpoint: $customItemApiEndpoint
      customItemApiEnabled: $customItemApiEnabled
    ) {
      id
      name
      subdomain
      customItemApiEnabled
      customItemApiEndpoint
    }
  }
`

export default mutation

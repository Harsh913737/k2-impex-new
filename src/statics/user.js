import _ from 'lodash'
import { getFileUrl } from '../common/utils'

function detailForAuth(user) {
  user = _.pick(user, ['_id', 'fullName','email', 'subscriptionPlan', 'accountType', 'password'])
  user.avatar = getFileUrl(user.avatar)

  return user
}

export default {
  detailForAuth
}

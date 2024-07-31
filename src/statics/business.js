import _ from 'lodash'
import { getFileUrl } from '../common/utils'

function detailForManager(business) {
  business = _.pick(business, ['_id', 'companyName', 'enable', 'category'])
  return business
}

export default {
  detailForManager
}

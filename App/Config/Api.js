const BASE_URL = 'https://pegasus.moharadev.com/api'

const endpoint = () => ({
  TOKEN: `${BASE_URL}/token/`,
  REFRESH_TOKEN: `${BASE_URL}/token/refresh/`,
  PERSONAL_CARE: `${BASE_URL}/personal-care/`
})

export default {
  PATH: endpoint(),
}

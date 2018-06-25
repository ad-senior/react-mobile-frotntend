const BASE_URL = 'http://localhost:8000/api'
// PATH: "http://pegasus.moharadev.com:7071/api/",

const endpoint = () => ({
  TOKEN: `${BASE_URL}/token/`,
  REFRESH_TOKEN: `${BASE_URL}/token/refresh/`,
  PERSONAL_CARE: `${BASE_URL}/personal-care/`
})

export default {
  PATH: endpoint(),
}

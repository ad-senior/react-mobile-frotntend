const BASE_URL = 'https://pegasus.moharadev.com/api'

const endpoint = () => ({
  TOKEN: `${BASE_URL}/token/`,
  REFRESH_TOKEN: `${BASE_URL}/token/refresh/`,
  SERVICE_USER: `${BASE_URL}/serviceuser/`,
  PERSONAL_CARE: `${BASE_URL}/personal-care/`,
  MEAL: `${BASE_URL}/meal/`,
  MOOD: `${BASE_URL}/mood/`,
  ACCIDENT: `${BASE_URL}/accident/`,
  ACTIVITY: `${BASE_URL}/leisure-activity/`
})

export default {
  PATH: endpoint(),
}

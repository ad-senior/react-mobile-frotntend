const BASE_URL = 'http://localhost:8000/api'
// PATH: "http://pegasus.moharadev.com:7071/api/",

const endpoint = () => ({
  TOKEN: `${BASE_URL}/token/`
})

export default {
  PATH: endpoint(),
}

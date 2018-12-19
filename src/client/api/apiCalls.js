import Axios from 'axios'

async function getProfileInfo() {
  const response = await Axios.post('/api/profile', { withCredentials: true })
  .catch(
    err => {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else if (err.request) {
        // The request was made but no response was received
        throw new Error('Whoops something went wring while POSTing!: ' + err.request)
      } else {
        // Something happened in setting up the request that triggered an err
        throw new Error(
          'Whoops something went wring while POSTing!: ' + err.response
        )
      }
      console.log(err.config)
    }
  )
  console.log(response);
  
  return response
}

async function isLoggedIn() {
  const response = await Axios.post('/api/profile')
    .catch(err => {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else if (err.request) {
        // The request was made but no response was received
        throw new Error('Whoops something went wring while POSTing!: ' + err.request)
      } else {
        // Something happened in setting up the request that triggered an err
        throw new Error(
          'Whoops something went wring while POSTing!: ' + err.response
        )
      }
      console.log(err.config)
    })
    .then(res => {
      // This checks if the user exists in our database. And returns a bool accordingly
      if ('id' in res.data) {
        return true
      } else {
        return false
      }
    })
    console.log("isLoggedIn", response)
  return await response
}

export { getProfileInfo, isLoggedIn }

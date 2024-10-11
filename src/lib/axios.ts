import axios, { AxiosError } from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this function
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.data) {
        console.log('Error message: ', error.response.data)
      }
      console.log('Error status: ', error.response.status)
      // console.log(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('No response received', error.request._options.path)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
  },
)

export default apiClient

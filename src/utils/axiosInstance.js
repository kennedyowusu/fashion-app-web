import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'http://192.168.1.102:8000/api',
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Post Request
export const post = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

// Get Request
export const get = async (url) => {
  try {
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

// Put Request
export const put = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

// Delete Request
export const remove = async (url) => {
  try {
    const response = await axiosInstance.delete(url)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

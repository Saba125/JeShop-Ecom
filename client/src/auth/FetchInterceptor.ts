import axios from "axios"
import store from "@/store/store";
import { toast } from "sonner";
import { API_URL, AUTH_TOKEN,REFRESH_TOKEN } from "@/constants";
// store for active request cancellation tokens
const pendingRequests = new Map()

// Generate a unique key for each request
const generateRequestKey = (config: any) => {
  const { url, method, params, data } = config
  return `${method}-${url}-${JSON.stringify(params)}-${JSON.stringify(data)}`
}

const service = axios.create({
    baseURL: `${API_URL}api`,
  timeout: 600000,
})

// Config
const TOKEN_PAYLOAD_KEY = "authorization"

// Refresh Token Handler
const refreshTokenHandler = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) throw new Error("No refresh token found")

    const response = await axios.post(`${API_URL}api/refreshToken`, {
      refresh_token: refreshToken,
    })
    const newAccessToken = response.data.access_token
    localStorage.setItem(AUTH_TOKEN, newAccessToken)
    return newAccessToken
  } catch (error) {
    console.error("Refresh token failed", error)
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    return null
  }
}

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    // Cancel previous request with same key if it exists
    const requestKey = generateRequestKey(config)
    if (pendingRequests.has(requestKey)) {
      const controller = pendingRequests.get(requestKey)
      controller.abort()
      pendingRequests.delete(requestKey)
    }

    // Create new AbortController for this request
    const controller = new AbortController()
    config.signal = controller.signal
    pendingRequests.set(requestKey, controller)

    const jwtToken = localStorage.getItem(AUTH_TOKEN) || null
    const lang = localStorage.getItem("language") || "ka"

    if (jwtToken) {
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`
    }
    if (lang) {
      config.headers["lang"] = lang
    }

    return config
  },
  (error) => {
    // notification.error({ message: "Request Error" });
    toast.error("Request Error")
    return Promise.reject(error)
  }
)

// API Response interceptor
service.interceptors.response.use(
  (response) => {
    // Remove the request from pending requests after it completes
    const requestKey = generateRequestKey(response.config)
    pendingRequests.delete(requestKey)
    return response.data
  },
  async (error) => {
    // Remove the request from pending requests if it errors
    if (error.config) {
      const requestKey = generateRequestKey(error.config)
      pendingRequests.delete(requestKey)
    }

    // Don't show error notification for cancelled requests
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    let notificationParam = { message: "", description: "" }

    if (error.response) {
      const { status, data, config } = error.response

      if (status === 401) {
        const newToken = await refreshTokenHandler()
        if (newToken) {
          config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${newToken}`
          return service(config)
        } else {
          notificationParam.description = "Please login again"
          localStorage.removeItem(AUTH_TOKEN)
          localStorage.removeItem(REFRESH_TOKEN)
        }
      } else if (status === 400) {
        notificationParam.message = data.message || "Bad Request"
      } else if (status === 404) {
        notificationParam.message = "Not Found"
      } else if (status === 500) {
        notificationParam.message = "Internal Server Error"
      } else if (status === 508) {
        notificationParam.message = "Time Out"
      } else {
        notificationParam.message = data?.message || "An error occurred"
      }
    } else {
      notificationParam.message = "Network Error"
    }
    // notification.error(notificationParam);
    toast.error(notificationParam.message)
    return Promise.reject({error : error.response.data.message})
  }
)

export default service
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { API_URL } from '@/constants'

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: async (credential: string) => {
      const { data } = await axios.post(
        `${API_URL}api/auth/google/callback`,
        { credential }
      )
      return data
    },
  })
}

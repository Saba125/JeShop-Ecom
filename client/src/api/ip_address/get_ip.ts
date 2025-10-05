import { useQuery } from "@tanstack/react-query"
import Api from "@/api/axios"
import axios from "axios"

export const useCurrentIp = () => {
  const query = useQuery({
    queryKey: ["ipAddress"],
    queryFn: async () => {
      const { data } = await axios.get("https://api64.ipify.org?format=json")
      return data
    },
  })

  return query
}

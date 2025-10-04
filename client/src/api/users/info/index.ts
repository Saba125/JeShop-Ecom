import { useQuery } from "@tanstack/react-query"
import Api from "@/api/axios"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/userSlice"

export const useCurrentUser = () => {
  const accessToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch();
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await Api.get("/checkUser")
      return data
    },
    enabled: !!accessToken,
  })
  if (query.isSuccess) {
    dispatch(setUser(query.data))
  }

  return query
}
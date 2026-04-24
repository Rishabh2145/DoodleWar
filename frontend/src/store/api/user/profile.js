import { baseApi } from "../baseApi";

const profileAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        user : builder.query({
            query: () => ({
                url: "/profile/me"
            })
        })
    })
})

export const { useUserQuery } = profileAPI
import { baseApi } from "../baseApi";

const loginAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({email, password}) =>({
                url: "/auth/login",
                method: "POST",
                body: {
                    email, password
                }
            })
        })
    })
})

export const { useLoginMutation } = loginAPI
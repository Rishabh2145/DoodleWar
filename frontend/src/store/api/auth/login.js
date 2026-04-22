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
        }),
        logout : builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method : "POST",
            })
        })
    })
})

export const { useLoginMutation , useLogoutMutation } = loginAPI
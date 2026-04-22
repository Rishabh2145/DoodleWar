import { baseApi } from "../baseApi";

const registerAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register : builder.mutation({
            query: ({name, email, password}) => ({
                url: "/auth/register",
                method : "POST",
                body :{
                    name, 
                    email, 
                    password
                }
            })
        })
    })
})

export const { useRegisterMutation } = registerAPI
import {baseApi} from '../baseApi';

const resetingPassword = baseApi.injectEndpoints({
    endpoints: (builders) => ({
        forgot : builders.mutation({
            query: ({email}) => ({
                url: '/auth/forgot',
                method: "POST",
                body: {
                    email
                }
            })
        }),
        reset : builders.mutation({
            query: ({token, password}) => ({
                url: '/auth/reset',
                method: "POST",
                body: {
                    token,
                    password
                }
            })
        })
    })
})

export const {useForgotMutation, useResetMutation} = resetingPassword
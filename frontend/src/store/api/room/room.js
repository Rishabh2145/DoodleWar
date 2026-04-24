import { baseApi } from '@/store/api/baseApi';

const room = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        roomGenerator : builder.query({
            query: () => ({
                url: '/room/create',
            })
        })
    })
})

export const { useRoomGeneratorQuery } = room
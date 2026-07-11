/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import axios, { type AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/`,
})

export const usePost = <T, P>(endpoint: string) => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const postData = async (postData: P, config?: AxiosRequestConfig) => {
        setData(null)
        setLoading(true)
        setError(null)

        try {
            const response = await axiosInstance({
                url: endpoint,
                method: 'POST',
                data: postData,
                headers: {
                    'Content-Type': 'application/json',
                    ...config?.headers,
                },
                ...config,
            })
            setData(response.data)
        } catch (error: any) {
            setError(error.response.status ?? 500)
        } finally {
            setLoading(false)
        }
    }

    return {
        data,
        loading,
        error,
        postData,
    }
}

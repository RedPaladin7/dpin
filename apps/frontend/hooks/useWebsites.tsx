"use client"

import { API_BACKEND_URL } from "@/config"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"

interface Website {
    id: string;
    url: string;
    ticks: {
        id: string;
        createdAt: string;
        status: string;
        latency: number;
    }[];
}

export function useWebsites() {
    const {getToken} = useAuth()
    const [websites, setWebsites] = useState<Website[]>([])
    // initializes websites as an empty array

    async function refreshWebsites() {
        const token = await getToken()
        // verifies that the request is from an authenticated user
        const response = await axios.get(`${API_BACKEND_URL}/api/v1/websites`, {
            headers: {
                Authorization: token,
            },
        })
        // makes get request to the endpoint with the token in auth token in header
        setWebsites(response.data.websites)
    }

    useEffect(() => {
        refreshWebsites()

        const interval = setInterval(()=>{
            refreshWebsites()
        }, 1000 * 60 * 1)

        return () => clearInterval(interval)
    }, [])

    return {websites, refreshWebsites}
}
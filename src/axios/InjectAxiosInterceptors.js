import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { setupInterceptors } from "./axios"

function InjectAxiosInterceptors () {
    const navigate = useNavigate();

    useEffect(() => {
        setupInterceptors(navigate)
    }, [navigate])

    return null
}

export default InjectAxiosInterceptors;
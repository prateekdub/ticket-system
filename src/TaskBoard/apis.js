import axios from "axios"
import { API_URL } from "./config"

export const getData = () => {
    return axios.get(API_URL)
}

export const add = (ticket) => {
    return axios.post(API_URL, ticket)
}

export const update = (id, updatedFields) => {
    return axios.patch(`${API_URL}/${id}/tasks`, updatedFields)
}
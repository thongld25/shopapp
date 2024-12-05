import axios from "axios";
import API_BASE_URL from "./apiConfig";

export async function login(email, password) {
    try{
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {email, password});
        return response.data.data;
    }catch(err) {
        throw err;
    }
}
export function logout(){
    try {
        localStorage.removeItem('token');
        return true;
    } catch (error) {
        throw err;
    }
}

export function isAuthenticated(){
    const token = localStorage.getItem('token');
    return !!token;
}

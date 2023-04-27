import axios from 'axios'
import ENV from "../config";

axios.defaults.baseURL = ENV.SERVER_ADD;


export async function verifyPassword({username, password}){
    try {
        const { data } = await axios.post('api/login',{username, password});
        return Promise.resolve({data});
    } catch (error) {
        return Promise.reject({ error : "Password doesn't match"})
    }
}

export async function getUser(){
    try{
        const  {data}  = await axios.get('api/getUserInfo');
        console.log(data);
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject({ error : "Not Found"})
    }
}

export async function getQuestion(){
    try {
        const {data} = await axios.get('api/getQuestion');
        // console.log(data);
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject({ error : "Not Found"})

    }
}
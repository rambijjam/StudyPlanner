import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:5000"
})

export const predictStudyPlan = async (data)=>{
    const res = await api.post('/predict',data,{
        headers : {
            'Content-Type': 'application/json'
        }
    });
    return res.data;
}
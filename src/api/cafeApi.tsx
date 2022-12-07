import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const baseURL = ' https://coffee-react-ntv.herokuapp.com/api';


const cafeApi = axios.create({
    baseURL
})

cafeApi.interceptors.request.use(
    async (config) =>{
        const token = await AsyncStorage.getItem('Token')
        if(token){
            config.headers!['x-token'] = token;
        }
        return config
    }
)

export default cafeApi
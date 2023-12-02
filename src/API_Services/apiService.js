import axios from 'axios';
import Path from './Path';
import { Platform, ToastAndroid } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Toast } from 'react-native-toast-message';
import { Config } from '../Config';
import Auth from '../Auth';
export default class ApiService {

    static get GET() {
        return 'get';
    }

    static get POST() {
        return 'post';
    }
    static get DELETE() {
        return 'delete';
    }
    static get TOKEN() {
        return true;
    }
    static get LOGIN() {
        return true;
    }
    async makeGETRequest(path) {
        const req = await axios
            .get(`${path}`)
        return req.data;
    }
    async makeRequest(method, path, data = {}, isSetToken = false, isLogin = false) {

        if (method == "get") {
            const req = await axios
                .get(`${Config.base_URL}/api/${path}`)
            return req.data;
        } else {
            try {
                var token = await Auth.getToken();
                console.log("Token===>", token)
                this.CheckConnectivity()
                const url = `${Config.base_URL}${path}`
                var headers
                if (token == null) {
                    headers = {
                        'Content-Type': 'application/json'
                    }
                } else {
                    headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                var settings = {}
                settings = {
                    method,
                    url,
                    headers,
                    data,
                }
                console.log("settings===>", settings)
                const req = await axios(settings);
                const response = req.data
                console.log("response===>", response)
                if (!response.success) {
                    ToastAndroid.showWithGravity(response.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                    return response
                }
                if (isSetToken) {
                    await Auth.setToken(response.token)
                }
                if (isLogin) {
                    await Auth.setAuth(response.data)
                }
                return response

            } catch (err) {
                ToastAndroid.showWithGravity('Please Check Internet Connection', ToastAndroid.SHORT, ToastAndroid.TOP)
                throw err;
            }
        }
    }

    removeAuth = () => {
        Auth.removeAuth()
    }

    CheckConnectivity = () => {
        if (Platform.OS === "android") {
            NetInfo.fetch().then(isConnected => {
                if (!isConnected) {
                    ToastAndroid.showWithGravity('No Internet Connection', ToastAndroid.SHORT, ToastAndroid.TOP)
                }
            });
        } else {
            NetInfo.addEventListener(
                "connectionChange",
                this.handleFirstConnectivityChange
            );
        }
    };

    handleFirstConnectivityChange = isConnected => {
        NetInfo.removeEventListener(
            "connectionChange",
            this.handleFirstConnectivityChange
        );
        if (isConnected === false) {
            ToastAndroid.showWithGravity('No Internet Connection', ToastAndroid.SHORT, ToastAndroid.TOP)
        }
    };

    // USER
    async login(data) {
        const path = Path.login;
        const res = await this.makeRequest(ApiService.POST, path, JSON.stringify(data), ApiService.TOKEN, ApiService.LOGIN);
        console.log("log in data ==>", res)
        return res
    }
    async signup(data) {
        const path = Path.signup;
        return await this.makeRequest(ApiService.POST, path, JSON.stringify(data), ApiService.TOKEN, ApiService.LOGIN);
    }

    async getUser(data) {
        const path = Path.getUser;
        return await this.makeRequest(ApiService.POST, path, JSON.stringify(data), ApiService.TOKEN);
    }
    async getHostels(data) {
        const path = Path.getHostels;
        return await this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    async addHostel(data) {
        const path = Path.addHostel;
        return await this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    async deleteHostel(data) {
        const path = Path.deleteHostel;
        return await this.makeRequest(ApiService.DELETE, path, JSON.stringify(data));
    }
    async getFloors(data) {
        const path = Path.getFloors;
        return await this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    async deleteFloor(data) {
        const path = Path.deleteFloor;
        return await this.makeRequest(ApiService.DELETE, path, JSON.stringify(data));
    }
    async addFloor(data) {
        const path = Path.addFloor;
        return await this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    async getRooms(data) {
        const path = Path.getRooms;
        return await this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    async deleteRoom(data) {
        const path = Path.deleteRoom;
        return await this.makeRequest(ApiService.DELETE, path, JSON.stringify(data));
    }
    async addRoom(data) {
        const path = Path.addRoom;
        return await this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    async addBed(data) {
        const path = Path.addBed;
        return await this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    async getBeds(data) {
        const path = Path.getBeds;
        return await this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    async deleteBed(data) {
        const path = Path.deleteBed;
        return await this.makeRequest(ApiService.DELETE, path, JSON.stringify(data));
    }
    async getAvailableRoom(data) {
        const path = Path.getAvailableRoom;
        return await this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }


}
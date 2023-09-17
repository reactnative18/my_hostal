import axios from 'axios';
import Path from './Path';
import { Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Toast } from 'react-native-toast-message';
import { Config } from '../Config';
import Auth from '../Auth';
export default class ApiService {

    static get GET() {
        return 'GET';
    }

    static get POST() {
        return 'POST';
    }
    static get DELETE() {
        return 'DELETE';
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

        if (method == "GET") {
            const req = await axios
                .get(`${Config.base_URL}/api/${path}`)
            return req.data;
        } else {
            try {
                var token = await Auth.getToken();
                console.log("Token===>", token)
                this.CheckConnectivity()
                let headers = {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': `Bearer ${token}`
                }
                var settings = {}
                settings = {
                    headers,
                    method,
                    url: `${Config.base_URL}${path}`,
                    data
                }
                console.log('Api Settings==>', settings)
                return axios(settings).then(async (response) => {
                    console.log("Api Response " + path + " ==>", response.status)
                    if (response.status == 403) {
                        await this.removeAuth()
                        return false
                    } else if (response.status == 200) {
                        if (isSetToken) {
                            await Auth.setToken(response.data.token)
                        }
                        if (isLogin) {
                            await Auth.setAuth(response.data.data)
                        }
                        return response.data;
                    } else {
                        return response.data;
                    }
                })
                    .catch((error) => {

                    });

            } catch (err) {
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
                    Toast.show({
                        type: 'info',
                        text1: 'No Internet Connection'
                    });
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
            Toast.show({
                type: 'info',
                text1: 'No Internet Connection'
            });
        }
    };

    // USER
    login(data) {
        const path = Path.login;
        return this.makeRequest(ApiService.POST, path, JSON.stringify(data), ApiService.TOKEN, ApiService.LOGIN);
    }
    signup(data) {
        const path = Path.signup;
        return this.makeRequest(ApiService.POST, path, JSON.stringify(data), ApiService.TOKEN, ApiService.LOGIN);
    }

    getUser(data) {
        const path = Path.getUser;
        return this.makeRequest(ApiService.POST, path, JSON.stringify(data), ApiService.TOKEN);
    }
    getHostels(data) {
        const path = Path.getHostels;
        return this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    addHostel(data) {
        const path = Path.addHostel;
        return this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    deleteHostel(data) {
        const path = Path.deleteHostel;
        return this.makeRequest(ApiService.DELETE, path, JSON.stringify(data));
    }
    getFloors(data) {
        const path = Path.getFloors;
        return this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    deleteFloor(data) {
        const path = Path.deleteFloor;
        return this.makeRequest(ApiService.DELETE, path, JSON.stringify(data));
    }
    addFloor(data) {
        const path = Path.addFloor;
        return this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    getRooms(data) {
        const path = Path.getRooms;
        return this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    deleteRoom(data) {
        const path = Path.deleteRoom;
        return this.makeRequest(ApiService.DELETE, path, JSON.stringify(data));
    }
    addRoom(data) {
        const path = Path.addRoom;
        return this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    addBed(data) {
        const path = Path.addBed;
        return this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    getBeds(data) {
        const path = Path.getBeds;
        return this.makeRequest(ApiService.POST, path, JSON.stringify(data));
    }
    deleteBed(data) {
        const path = Path.deleteBed;
        return this.makeRequest(ApiService.DELETE, path, JSON.stringify(data));
    }

}
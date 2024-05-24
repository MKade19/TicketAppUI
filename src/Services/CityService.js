import axios from "../axios/axios";

class CityService {
    getAll = async () => {
        return await axios.get('cities/');
    }
}

const cityService = new CityService();
export default cityService;
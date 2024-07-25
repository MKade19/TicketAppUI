import axios from "../axios/axios";

class EventService {
    getAll = async () => {
        return await axios.get('events/');
    }

    getById = async id => {
        return await axios.get(`events/${id}/`);
    }

    getByAdmin = async adminId => {
        return await axios.get(`events/admin/?id=${adminId}`);
    }

    getRecentByCity = async city => {
        return await axios.get(`events/recent_by_city/?city=${city}`);
    }

    createOne = async ({ name, date, start, end, price, hall, administrator, images }) => {
        if (images.length !== 0) {
            for (let i = 0; i < images.length; i++) {
                let formData = new FormData();
                formData.append("image_url", images[i], images[i].name);

                const imageResponse = await axios.post('images/', formData, { 
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log(imageResponse);
            } 
        }

        const body = { name, date, start, end, price, hall, administrator };
        return await axios.post('events/', body);
    }

    updateOne = async ({ id, name, date, start, end, price, hall, administrator }) => {
        const body = { name, date, start, end, price, hall, administrator }
        return await axios.put(`events/${id}/`, body);
    }

    deleteById = async id => {
        return await axios.delete(`events/${id}/`);
    }
}

const eventService = new EventService();
export default eventService;
import { useState, useEffect } from "react";
import CityService from "../Services/CityService";

const HomePage = () => {
    const [cities, setCities] = useState([]);
    const [activeCity, setActiveCity] = useState({});

    const changeActiveCity = event => {
        setActiveCity(cities.filter(e => e.name === event.target.value)[0]);
    }

    useEffect(() => {
        const fetchData = async () => {
            const cityResponse = await CityService.getAll();
            setCities(cityResponse.data);
        }

        fetchData();
    }, []);

    const addRolesOptions = () => {
        return cities.map(e => <option key={e.id}>{e.name}</option>);
    }

    return (
        <>
            <h1 className="my-4">Upcoming events</h1>
            <div className="d-flex flex-column justify-content-center align-items-center my-3">
                <div className="d-flex align-items-center form-group">
                    <label className="mx-3" htmlFor="citySelect">Select city</label>
                    <select className="form-select" 
                        id="citySelect"
                        value={ activeCity ? activeCity.name : {} } 
                        onChange={changeActiveCity} 
                        placeholder="Choose city">
                        {addRolesOptions()}
                        <option value={{}}>not selected</option>
                    </select>
                </div>
            </div>
        </>
    );
}

export default HomePage;
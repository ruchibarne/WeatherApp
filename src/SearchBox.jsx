import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import {useState} from "react";

export default function SearchBox({updateInfo}){
    let [city,setCity] = useState("");
    let [error,setError] = useState("false");
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '04b82a0e586bdd675ed182844d2288d7';

    let getWeatherInfo = async() => {
        try{
            let response = await fetch(
                `${API_URL}?q={city}&appid=${API_KEY}&units=metric`
            );
            let jsonResponse = await response.json();
            let result = {
                city:city,
                temp: jsonRespone.main.temp,
                tempMin: jsonRespone.main.temp_min,
                tempMx:jsonRespone.main.temp_max,
                humidity:jsonRespone.main.humidity,
                feelsLike:jsonRespone.main.feels_like,
                weather:jsonRespone.weather[0].description,
            };
            console.log(result);
            return result; 
        }catch(err){
           throw err;
        }
         
    };

    

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
        try{
            evt.preventDefault();
            console.log(city);
            setCity(""); 
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        }
        catch(err){
            setError(true);
        }
        

    };

    return(
        <div>
            <form onSubmit={handleSubmit}> <TextField id="city" label="City Name" variant="outlined" value={city} onChange={handleChange}/></form>
            <br></br>
            <Button variant="contained">Search</Button>
            {/* {error && <p>No such place exits!</p>} */}
        </div>
    );
}
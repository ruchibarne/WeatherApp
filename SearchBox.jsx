import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import {useState} from "react";

export default function SearchBox({updateInfo}){
    let [city,setCity] = useState("");
    let [error,setError] = useState(false);
    const API_KEY = '5ba3c866198511ac4f809b1635f1440f';

    let getWeatherInfo = async() => {
        try{
            let response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            let jsonResponse = await response.json();

            if (!jsonResponse.main || !jsonResponse.weather) {
                throw new Error("Invalid city or API response");
            }

            
            let result = {
                city:jsonResponse.name,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax:jsonResponse.main.temp_max,
                humidity:jsonResponse.main.humidity,
                feelsLike:jsonResponse.main.feels_like,
                weather:jsonResponse.weather[0].description,
            };
            // console.log(result);
            return result; 
        }catch(err){
           throw err;
        }
         
    };
    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        try{
            setError(false); 
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity(""); 
        }
        catch(err){
            setError(true);
        }
        

    };  

    return(
        <div className="SearchBox"> 
            <form onSubmit={handleSubmit}>
                 <TextField id="city" label="City Name" variant="outlined" value={city} onChange={handleChange}/>
            <br/>
            <br/>
            <Button variant="contained" className='btn' type='submit'>Search</Button>
            </form>
            {error && <p>No such place exits!</p>}
        </div>
    );
}






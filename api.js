import { Alert } from "react-native";




export const getWeather = async (city, setWeatherData, setForecastData) => {
    try {
        const apiKey = "86ecfccfc21a432583678761d8148f45"
        const apiUrl = 
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

       
        if (data.cod && data.cod !== 200) {
            throw new Error(data.message || 'Failed to fetch weather data');
        }

        
        const temperatureKelvin = data.main.temp;
        
        
        const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(2); 
        const description = data.weather[0].description;

        setForecastData(null);
        setWeatherData({ temperature: temperatureCelsius, description });
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        Alert.alert('Error', 'Failed to fetch weather data. Please try again.');
    }
};

export const getForecast = async (city, setWeatherData, setForecastData) => {
    try {
        const apiKey =  "86ecfccfc21a432583678761d8148f45"
        const apiUrl = 
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod && data.cod !== '200') {
            throw new Error(data.message || 'Failed to fetch forecast data');
        }

       
        const forecast = data.list.slice(0, 3); 
        setWeatherData(null);
        setForecastData(forecast);
    } catch (error) {
        console.error('Error fetching forecast data:', error.message);
        Alert.alert('Error', 'Failed to fetch forecast data. Please try again.');
    }
};
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, Image } from 'react-native';
import { styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { getWeather, getForecast } from './api';
import Tabs from './TabBottom';

const Weather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [nearbyCitiesVisible, setNearbyCitiesVisible] = useState(true);
    const [nearbyCitiesWeather, setNearbyCitiesWeather] = useState({});
    const [nearbyCities, setNearbyCities] = useState([
        'Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Port Elizabeth',
    ]);

    const GetWeather = async () => {
        try {
            const data = await getWeather(city);
            setWeatherData({
                temperature: (data.main.temp - 273.15).toFixed(2),
                description: data.weather[0].description,
            });
            setNearbyCitiesVisible(false); // Hide nearby cities when fetching weather
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const GetForecast = async () => {
        try {
            const data = await getForecast(city);
            setForecastData(data);
            setNearbyCitiesVisible(false); // Hide nearby cities when fetching forecast
        } catch (error) {
            console.error("Error fetching forecast data:", error);
        }
    };

    const clearScreen = () => {
        setWeatherData(null);
        setForecastData(null);
        setCity("");
        setNearbyCitiesVisible(true); // Show nearby cities again
    };

    const fetchWeatherForNearbyCities = async () => {
        const weatherData = {};
        for (const city of nearbyCities) {
            try {
                const data = await getWeather(city);
                weatherData[city] = {
                    temperature: (data.main.temp - 273.15).toFixed(2),
                    description: data.weather[0].description,
                };
            } catch (error) {
                console.error(`Error fetching weather data for ${city}:`, error);
            }
        }
        setNearbyCitiesWeather(weatherData);
    };

    useEffect(() => {
        if (nearbyCitiesVisible) {
            fetchWeatherForNearbyCities(); 
        }
    }, [nearbyCitiesVisible]);

    return (
        <View style={styles.centeredContext}>
            <StatusBar style="light" />
            <Text style={styles.Title}>Weather App</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter city name"
                value={city}
                onChangeText={setCity}
            />

            <ScrollView horizontal={true}>
                <Pressable
                    onPress={GetWeather}
                    style={({ pressed }) => [
                        styles.button,
                        { backgroundColor: pressed ? '#0d8581' : '#0d5f85' },
                    ]}
                >
                    <Text style={styles.buttonText}>Weather</Text>
                </Pressable>
                <Text> </Text>
                <Pressable
                    onPress={GetForecast}
                    style={({ pressed }) => [
                        styles.button,
                        { backgroundColor: pressed ? '#0d8581' : '#0d5f85' },
                    ]}
                >
                    <Text style={styles.buttonText}>Forecast</Text>
                </Pressable>

                {weatherData && (
                    <Pressable
                        onPress={clearScreen}
                        style={({ pressed }) => [
                            styles.button,
                            { backgroundColor: pressed ? '#e74c3c' : '#c0392b' },
                        ]}
                    >
                        <Text style={styles.buttonText}>Clear</Text>
                    </Pressable>
                )}
            </ScrollView>

            {nearbyCitiesVisible && !weatherData && (
                <View style={styles.nearbyCitiesContainer}>
                    <Text style={styles.heading}>Nearby Cities:</Text>
                    {nearbyCities.map((city, index) => (
                        <View key={index} style={styles.nearbyCityContainer}>
                            <Pressable
                                onPress={() => {
                                    setCity(city);
                                    GetWeather();
                                }}
                                style={styles.nearbyCityButton}
                            >
                                <Text style={styles.nearbyCityText}>{city}</Text>
                            </Pressable>
                            {nearbyCitiesWeather[city] && (
                                <Text style={styles.weatherText}>
                                    Temp: {nearbyCitiesWeather[city].temperature} °C
                                </Text>
                            )}
                        </View>
                    ))}
                </View>
            )}

            {/* Display Weather Data */}
            {weatherData && (
                <View style={styles.WeatherInfo}>
                    <Text style={styles.weatherText}>
                        <Text style={styles.heading}>Temperature:</Text> {weatherData.temperature} °C
                    </Text>
                    <Text style={styles.weatherText}>
                        <Text style={styles.heading}>Description:</Text> {weatherData.description}
                    </Text>
                </View>
            )}

            <ScrollView style={styles.scrollView}>
                {forecastData && (
                    <View style={styles.WeatherInfo}>
                        <Text style={styles.heading}>Forecast for the next few hours: {'\n'}</Text>
                        {forecastData.map((forecastItem, index) => (
                            <Text key={index} style={styles.weatherText}>
                                <Text style={styles.Subheading}>Time:</Text> {new Date(forecastItem.dt * 1000).toLocaleTimeString()},{' '}
                                <Text style={styles.Subheading}>Temperature:</Text> {(forecastItem.main.temp - 273.15).toFixed(2)} °C,{ ' '}
                                <Text style={styles.Subheading}>Description:</Text> {forecastItem.weather[0].description}
                            </Text>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Weather;

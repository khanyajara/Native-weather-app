import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView,  } from 'react-native';
import { styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getWeather, getForecast } from './api';

const  Weather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);

    const GetWeather = () => {
        getWeather(city, setWeatherData, setForecastData);
    };

    const GetForecast = () => {
        getForecast(city, setWeatherData, setForecastData);
    };

    return (
        <View style={styles.centeredContext}>
            <StatusBar style='light' />
          
            <Text style={styles.Title}>Weather App</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter city name"
                value={city}
                onChangeText={setCity}
            />

            <ScrollView 
             horizontal={true}
            >
                <Pressable
                    onPress={GetWeather}
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? '#0d8581' : '#0d5f85',
                        },
                    ]}
                >
                    <Text style={styles.buttonText}>Weather</Text>
                </Pressable>
                <Text> </Text>
                <Pressable
                    onPress={GetForecast}
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? '#0d8581' : '#0d5f85',
                        },
                    ]}
                >
                    <Text style={styles.buttonText}>Forecast</Text>
                </Pressable>

                
                
            </ScrollView>

            {weatherData && (
                <View style={styles.WeatherInfo}>
                    <Text style={styles.weatherText}>
                        <Text style={styles.heading}>
                            Temperature:
                        </Text> {weatherData.temperature} °C
                    </Text>
                    <Text style={styles.weatherText}>
                        <Text style={styles.heading}>
                            Description:
                        </Text> {weatherData.description}
                    </Text>
                </View>
            )}

            <ScrollView style={styles.scrollView}>
                {forecastData && (
                    <View style={styles.WeatherInfo}>
                        <Text style={styles.heading}>
                            Forecast for the next few hours: {'\n'}
                        </Text>
                        {forecastData.map((forecastItem, index) => (
                            <Text key={index} style={styles.weatherText}>
                                <Text style={styles.Subheading}>Time:</Text>{' '}
                                {new Date(forecastItem.dt * 1000).toLocaleTimeString()},{' '}
                                <Text style={styles.Subheading}>Temperature:</Text>{' '}
                                {(forecastItem.main.temp - 273.15).toFixed(2)} °C,{' '}
                                <Text style={styles.Subheading}>Description:</Text>{' '}
                                {forecastItem.weather[0].description}
                            </Text>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Weather;
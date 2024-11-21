import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const HomePage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [dailyForecastData, setDailyForecastData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      const openWeatherApiKey = '86ecfccfc21a432583678761d8148f45';
      const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}`;

      try {
        const weatherResponse = await axios.get(openWeatherUrl);
        const forecastResponse = await axios.get(forecastUrl);

        if (weatherResponse.data && forecastResponse.data) {
          setWeatherData(weatherResponse.data);

          // Get the current time
          const currentTime = new Date().getHours();
          const intervalsRemaining = Math.floor((24 - currentTime) / 3);  // Calculate how many 3-hour intervals are left for the day

          // Slice the forecast for the remaining time intervals
          setForecastData(forecastResponse.data.list.slice(0, intervalsRemaining));

          // Get 5-day forecast (data is in 3-hour intervals, group them by day)
          const dailyData = forecastResponse.data.list.reduce((acc, item) => {
            const day = new Date(item.dt * 1000).getDate(); // Get the day part of the timestamp
            if (!acc[day]) acc[day] = [];
            acc[day].push(item);
            return acc;
          }, {});

          // Get the first 5 days of the forecast (use at most 5 days)
          setDailyForecastData(Object.values(dailyData).slice(0, 5));

          updateBackgroundColor(weatherResponse.data.weather[0].main.toLowerCase());
        } else {
          setError('Failed to fetch weather data');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const getLocationAndFetchWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission not granted');
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        fetchWeatherData(location.coords.latitude, location.coords.longitude);
      } catch (err) {
        setError('Failed to retrieve location');
        setLoading(false);
      }
    };

    getLocationAndFetchWeather();
  }, []);

  const updateBackgroundColor = (weatherCondition) => {
    switch (weatherCondition) {
      case 'clear':
        setBackgroundColor('#87ceeb');
        break;
      case 'clouds':
        setBackgroundColor('#d3d3d3');
        break;
      case 'rain':
      case 'drizzle':
        setBackgroundColor('#a9a9a9');
        break;
      case 'thunderstorm':
        setBackgroundColor('#696969');
        break;
      case 'snow':
        setBackgroundColor('#ffffff');
        break;
      default:
        setBackgroundColor('#add8e6');
    }
  };

  if (loading) {
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#0a0a0a" />
      </View>
    );
  }

  return (
    <View style={[styles.content, { backgroundColor }]}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View style={styles.weatherCard}>
          <Text style={styles.title}>Weather in {weatherData.name}</Text>
          <Text style={styles.info}>
            Temperature: {(weatherData.main.temp - 273.15).toFixed(1)}°C
          </Text>
          <Text style={styles.info}>Condition: {weatherData.weather[0].description}</Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
            }}
          />
        </View>
      )}

      <Text style={styles.subtitle}>3-Hour Forecast for the Rest of the Day</Text>
      <ScrollView horizontal style={styles.forecastContainer}>
        {forecastData.map((item) => {
          const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
            <View style={styles.forecastCard} key={item.dt}>
              <Text style={styles.forecastTime}>{time}</Text>
              <Image
                style={styles.forecastIcon}
                source={{
                  uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                }}
              />
              <Text style={styles.forecastTemp}>
                {(item.main.temp - 273.15).toFixed(1)}°C
              </Text>
              <Text style={styles.forecastCondition}>{item.weather[0].description}</Text>
            </View>
          );
        })}
      </ScrollView>

      <Text style={styles.subtitle}>5-Day Forecast</Text>
      <ScrollView horizontal style={styles.forecastContainer}>
        {dailyForecastData.map((daily, index) => {
          const dayName = new Date(daily[0].dt * 1000).toLocaleDateString([], { weekday: 'short' });
          const temp = daily.reduce((acc, item) => acc + item.main.temp, 0) / daily.length;
          return (
            <View style={styles.forecastCard} key={index}>
              <Text style={styles.forecastTime}>{dayName}</Text>
              <Image
                style={styles.forecastIcon}
                source={{
                  uri: `https://openweathermap.org/img/wn/${daily[0].weather[0].icon}@2x.png`,
                }}
              />
              <Text style={styles.forecastTemp}>
                {(temp - 273.15).toFixed(1)}°C
              </Text>
              <Text style={styles.forecastCondition}>{daily[0].weather[0].description}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a0a0a',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: '#0a0a0a',
    marginBottom: 5,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  weatherCard: {
    backgroundColor: 'rgba(18, 20, 20, 0.1)',
    width: 330,
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0a0a0a',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  forecastContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  forecastCard: {
    backgroundColor: 'rgba(18, 20, 20, 0.1)',
    padding: 10,
    marginRight: 10,
    width: 120,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0a0a0a',
  },
  forecastTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a0a0a',
  },
  forecastTemp: {
    fontSize: 14,
    color: '#0a0a0a',
  },
  forecastCondition: {
    fontSize: 12,
    color: '#0a0a0a',
  },
  forecastIcon: {
    width: 40,
    height: 40,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a0a0a',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default HomePage;

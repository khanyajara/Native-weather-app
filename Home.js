import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

const HomePage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      const openWeatherApiKey = '86ecfccfc21a432583678761d8148f45';
      const weatherbitApiKey = '811df5b68bc44673bde4a8999e683deb';

      const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}`;
      const weatherbitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`;

      try {
        const [weatherResponse, forecastResponse] = await Promise.all([
          fetch(openWeatherUrl),
          fetch(weatherbitUrl),
        ]);

        if (!weatherResponse.ok) throw new Error('Failed to fetch current weather');
        if (!forecastResponse.ok) throw new Error('Failed to fetch 7-day forecast');

        const weather = await weatherResponse.json();
        const forecast = await forecastResponse.json();

        setWeatherData(weather);
        setForecastData(forecast.data.slice(0, 7));
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

  if (loading) {
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#0a0a0a" />
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View>
          <View style={styles.weatherCard}>
            <Text style={styles.title}>Weather in {weatherData.name}</Text>
            <Text style={styles.info}>
              Temperature: {(weatherData.main.temp - 273.15).toFixed(1)}°C
            </Text>
            <Text style={styles.info}>Condition: {weatherData.weather[0].description}</Text>
          </View>

          <TouchableOpacity
            style={styles.forecastButton}
            onPress={() => setShowForecast(!showForecast)}
          >
            <Text style={styles.forecastButtonText}>
              {showForecast ? 'Hide 7-Day Forecast' : 'Show 7-Day Forecast'}
            </Text>
          </TouchableOpacity>

          {showForecast && (
            <View style={styles.forecastContainer}>
              {forecastData.map((day, index) => (
                <View key={index} style={styles.forecastCard}>
                  <Text style={styles.forecastDay}>
                    {new Date(day.ts * 1000).toLocaleDateString('en-US', {
                      weekday: 'long',
                    })}
                  </Text>
                  <Text style={styles.forecastTemp}>
                    Max: {day.max_temp.toFixed(1)}°C, Min: {day.min_temp.toFixed(1)}°C
                  </Text>
                  <Text style={styles.forecastCondition}>{day.weather.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
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
  forecastButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  forecastButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forecastContainer: {
    width: 330,
  },
  forecastCard: {
    backgroundColor: 'rgba(18, 20, 20, 0.1)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0a0a0a',
  },
  forecastDay: {
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
});

export default HomePage;

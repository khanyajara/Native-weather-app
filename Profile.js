import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, TouchableOpacity , ScrollView} from 'react-native';

export default function WeatherProfile({ navigation }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [preferredUnit, setPreferredUnit] = useState('Celsius');
  const [notifications, setNotifications] = useState(false);
  const [cityWeather, setCityWeather] = useState('');

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  return (
    <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>Weather Profile</Text>
        
          <View style={styles.section}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Use Current Location</Text>
            <Switch
              value={useCurrentLocation}
              onValueChange={(value) => setUseCurrentLocation(value)}
            />
          </View>
        
          {!useCurrentLocation && (
            <View style={styles.section}>
              <Text style={styles.label}>Set Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter city or address"
                value={location}
                onChangeText={(text) => setLocation(text)}
              />
            </View>
          )}
          <View style={styles.section}>
            <Text style={styles.label}>Preferred Unit</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.button, preferredUnit === 'Celsius' && styles.activeButton]}
                onPress={() => setPreferredUnit('Celsius')}
              >
                <Text style={styles.buttonText}>Celsius</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, preferredUnit === 'Fahrenheit' && styles.activeButton]}
                onPress={() => setPreferredUnit('Fahrenheit')}
              >
                <Text style={styles.buttonText}>Fahrenheit</Text>
              </TouchableOpacity>
            </View>
          </View>
        
          <View style={styles.section}>
            <Text style={styles.label}>Weather Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={(value) => setNotifications(value)}
            />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
        
        
          <ScrollView>
              <View style={styles.savedInfo}>
                <Text style={styles.savedText}>Name: {name || 'Not Set'}</Text>
                <Text style={styles.savedText}>Location: {useCurrentLocation ? 'Current Location' : location || 'Not Set'}</Text>
                <Text style={styles.savedText}>Preferred Unit: {preferredUnit}</Text>
                <Text style={styles.savedText}>Weather Notifications: {notifications ? 'Enabled' : 'Disabled'}</Text>
              </View>
        
              <View style={styles.navigationButtons}>
                <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.navigationButtonText}>Go to Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.navigationButtonText}>Go to SignUp</Text>
                </TouchableOpacity>
              </View>
        
              <View style={styles.section}>
                <Text style={styles.label}>View Weather from Another City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter city to get weather"
                  value={cityWeather}
                  onChangeText={(text) => setCityWeather(text)}
                />
                <Text style={styles.savedText}>Weather from {cityWeather || 'Unknown City'}</Text>
              </View>
          </ScrollView>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#089dc2',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    width: '45%',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#089dc2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#089dc2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  savedInfo: {
    marginTop: 20,
  },
  savedText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  navigationButtons: {
    marginTop: 20,
  },
  navigationButton: {
    backgroundColor: '#089dc2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  navigationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

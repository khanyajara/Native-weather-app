# Native Weather App

This is a React Native app that provides weather information based on the user's location. The app fetches data from the Weatherbit API and displays the current weather, forecast, and other weather-related information. The app includes a simple and user-friendly interface that allows users to view weather updates for their location or any other city.

## Features

- **Current Weather:**
  - View the current weather, temperature, humidity, and more.
  
- **Weather Forecast:**
  - Get a weather forecast for the upcoming days.
  
- **Location-Based Weather:**
  - Automatically detect and display the weather for the user's current location.
  
- **Search Weather by City:**
  - Search for the weather of any city around the world.

- **Responsive Design:**
  - Optimized for both Android and iOS devices.

## Technologies Used

- React Native (Expo)
- Weatherbit API (for weather data)
- React Navigation (for app navigation)
- Styled-components (for styling)
- Geolocation API (for detecting the user's location)

## Installation

### Prerequisites

Make sure you have the following installed:
- Node.js (version >= 16.x)
- npm or yarn (for package management)
- Expo CLI (for running React Native apps)
- Weatherbit API key (sign up for free at [Weatherbit API](https://weatherbit.io/))

### Steps to Set Up the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/khanyajara/Native-weather-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Native-weather-app
   ```

3. Install the dependencies:
   ```bash
   npm install
   # or if you're using yarn
   yarn install
   ```

4. Set up the Weatherbit API:
   - Create an account at [Weatherbit](https://weatherbit.io/).
   - Get your API key.
   - Create a `.env` file in the root directory and add the following:
     ```bash
     REACT_APP_WEATHER_API_KEY=<your-weatherbit-api-key>
     ```

5. Start the development server:
   ```bash
   expo start
   ```

   This will open a browser window. Scan the QR code with the Expo Go app on your mobile device to run the app, or use an emulator.

## Features Walkthrough

1. **Current Weather:**
   - Displays the current weather, including temperature, humidity, wind speed, and weather description.

2. **Weather Forecast:**
   - View the forecast for the next few days with temperature predictions.

3. **Location-Based Weather:**
   - The app automatically fetches and displays weather information based on the user's current location using geolocation.

4. **Search by City:**
   - Users can search for weather information by entering the name of a city.

5. **Customizable UI:**
   - The UI adapts to different screen sizes and devices, ensuring a smooth experience on all platforms.

## Contributing

We welcome contributions to this project! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weatherbit for providing the weather API.
- Expo for simplifying React Native app development.
- React Native community for creating great libraries and tools.
- All contributors who help improve the project.

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Image,
  ImageBackground
} from 'react-native'
import { Spinner, Container, Content, Item, Input } from 'native-base';
import axios from 'axios';

export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      country: "",
      temp: "",
      name: "",
      sunrise: "",
      sunset: "",
      atmosphere: "",
      lat: "",
      long: "",
      btnClicked: false,
    };
  }

  async getWeather() {
    if (this.state.weather != '') {
      this.setState({ btnClicked: !this.state.btnClicked });
      let city = this.state.weather;
      let apiKey = '12d049a04873aac0d6a2b2325e33a5b6';
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      try {
        const weatherRequest = await axios.post(url)
        this.setState({ btnClicked: !this.state.btnClicked });
        console.log(weatherRequest);
        console.log(this.state.sunset)
        let sunr = new Date(weatherRequest.data.sys.sunrise * 1000)
        let suns = new Date(weatherRequest.data.sys.sunset * 1000)
        let temp = Math.floor(weatherRequest.data.main.temp)
        this.setState(
          {
            name: weatherRequest.data.name,
            temp: temp + 'ºC',
            sunrise: 'sunrise: ' + sunr.getHours() + 'hr:' + sunr.getMinutes() + 'mins',
            sunset: '   |   sunset: ' + suns.getHours() + 'hr:' + suns.getMinutes() + 'mins',
            country: weatherRequest.data.sys.country,
            atmosphere: weatherRequest.data.weather[0].description,
            lat: '  |  lat: ' + weatherRequest.data.coord.lat,
            long: 'long: ' + weatherRequest.data.coord.lon,
            weather: ''
          })
      } catch (e) {
        console.log(e);
        Alert.alert('Failed', 'Network Error, Kindly Connect to internet or City not found');
        this.setState({ btnClicked: !this.state.btnClicked });
      }
    } else {
      ToastAndroid.show('Kindly enter a location fields to proceed', ToastAndroid.SHORT);
    }
  }

  render() {
    return (


      <Container style={{ backgroundColor: "#9FA8DA" }}>
        <StatusBar backgroundColor="#5C6BC0"
          barStyle="light-content" />
        <ImageBackground source={require('./w1.jpg')} style={{ width: null, flex: 1 }}>
          <View style={styles.country}>
            <Text style={styles.textcountry}>{this.state.name}  {this.state.country} </Text>
          </View>

          <View style={styles.bearing}>
            <Text style={styles.textbear}>{this.state.long}{this.state.lat}</Text>
            <Text style={styles.textbear}>{this.state.sunrise}{this.state.sunset}</Text>
          </View>

          <View style={styles.temp}>
            <Text style={styles.texttemp}>{this.state.temp}</Text>
          </View>

          <View style={styles.atmosphere}>
            <Text style={styles.textatm}>{this.state.atmosphere}</Text>
          </View>

          <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
              <TextInput
                style={styles.input}
                underlineColorAndroid='transparent'
                placeholder='Enter a city'
                placeholderTextColor='white'
                onChangeText={(weather) => this.setState({ weather })} value={this.state.weather}
              />
            </KeyboardAvoidingView>

            {this.state.btnClicked
              ?
              <Spinner color="white" />
              : <TouchableOpacity style={styles.btn}
                onPress={() => this.getWeather()}>
                <Text style={styles.btntext}>Get Weather</Text>
              </TouchableOpacity>}
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 300,
    backgroundColor: '#5C6BC0',
    borderRadius: 20,
    marginVertical: 20,
    paddingVertical: 13,
    alignSelf: 'center'
  },
  btntext: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  welcome: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: 300,
    borderBottomWidth: 1,
    textAlign: "center",
    color: "white",
    fontSize: 20,
    borderColor: "white"
  },
  head: {
    justifyContent: "center",
    alignItems: "center",
  },
  country: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 15
  },
  bearing: {
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  atmosphere: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18
  },
  textcountry: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  textbear: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  texttemp: {
    fontSize: 150,
    fontWeight: "bold",
    color: "white",
  },
  textatm: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  }
});

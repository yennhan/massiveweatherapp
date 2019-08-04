import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import moment from "moment";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = require('./homeStyle');
export default class Home extends Component {
    state = {
        isLoading: true,
        countryName: '',
        cityName: '',
        currentTime: '',
        currentTemperature: '',
        currentWeather: '',
        forecastWeather: [],
        checkDate: 0
    }

    async componentDidMount() {
        this.startHeaderHeight = 60
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 60 + StatusBar.currentHeight
        }
        this.getCurrentWeather()
        this.getForecastWeather()
        //console.warn(this.state.currentTime)
    }
    getCurrentWeather = () => {
        const country = 'Singapore,Singapore'
        const apiKey = 'f86993757cb89c83afef1c855614b72a'
        const unitType = 'imperial'
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + country + '&units=' + unitType + '&appid=' + apiKey

        fetch(url, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    isLoading: false,
                    currentTime: responseJSON['dt'],
                    cityName: responseJSON['name'],
                    countryName: responseJSON['sys']['country'],
                    currentTemperature: responseJSON['main']['temp'],
                    currentWeather: responseJSON['weather'][0]['main']

                })

            })
            .catch((error) => {
                console.log(error)
            })

    }
    getForecastWeather = () => { //get all forecast Weather
        const country = 'Singapore,Singapore'
        const apiKey = 'f86993757cb89c83afef1c855614b72a'
        const unitType = 'imperial'
        const theTotalResult = '40'
        const url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + country + '&units=' + unitType + '&cnt=' + theTotalResult + '&appid=' + apiKey
        fetch(url, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    isLoading: false,
                    forecastWeather: responseJSON['list']
                })
            })

            .catch((error) => {
                console.log(error)

            })
    }
    renderForecastWeather = ({ item, index }) => {
        var myTime = moment.unix(item.dt).format('D MMM YYYY, ddd') //converting from timestamp to date
        if (index % 4 == 0) {   //mod to display only 1 single session comparison.
            if (this.state.checkDate == 0) {    //checking if is equal, then display only 1 date
                this.state.checkDate = this.state.checkDate + 1
                var roundedMinTemp = Math.round(item.main.temp_min) //round the lower temperature
                var roundedMaxTemp = Math.round(item.main.temp_max) //round the lower temperature
                return (
                    <TouchableOpacity style={styles.flatlist}>
                        <View style={styles.flatlist_view}>
                            <Text style={styles.flatlist_date}>{myTime}</Text>
                            <Text style={styles.flatlist_temp}>{roundedMinTemp} - {roundedMaxTemp}</Text>
                            <View style={styles.flatlist_secondview}>
                                <FontAwesome name="angle-right" size={30} backgroundColor='white' color='#EC4334' />
                                <Text style={styles.flatlist_weathertype}>{item.weather[0].main}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    //render all future weather
                )
            } else {

                this.state.checkDate = 0
            }
        }

    }


    render() {
        var myTime = moment.unix(this.state.currentTime).format('ddd, MMM Do YYYY h:mm A zz') //convert from timestamp to date
        var roundedTemp = Math.round(this.state.currentTemperature) //round the temperature
        return (
            <SafeAreaView style={ styles.safeview }>
                <StatusBar barStyle="light-content" />
                <View style={ styles.topview }>
                    <Text style={styles.main_font}>{this.state.cityName}, {this.state.countryName}</Text>
                </View>
                <View style={ styles.mid_font}>
                    <Text style={ styles.main_time }>{myTime}SGT</Text>
                    <Text style={ styles.main_temp}>{roundedTemp}</Text>
                    <Text style={ styles.main_weather }>{this.state.currentWeather}</Text>

                </View>
                <View style={ styles.bottom_view}>
                    <FlatList
                        data={this.state.forecastWeather}
                        //extraData={this.state}
                        contentContainerStyle={{ paddingBottom: 70 }}
                        renderItem={this.renderForecastWeather}
                        keyExtractor={(item, index) => index.toString()}

                    //snapToAlignment={'center'}
                    //snapToInterval={Dimensions.get('window').width / 10}
                    />

                </View>
            </SafeAreaView>
        )

    }
}
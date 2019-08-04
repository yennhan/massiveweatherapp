const React = require('react-native');
const { Dimensions, StyleSheet } = React;

module.exports = StyleSheet.create({
  fullSize: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  safeview: {
    flex: 0,
    backgroundColor: '#EC4334'
  },
  topview: {
    flex: 0,
    height: 30,
    backgroundColor: '#EC4334'
  },
  main_font: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 18
  },
  mid_font: {
    flex: 0,
    backgroundColor: 'white'
  },
  main_time: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 15
  },
  main_temp: {
    color: 'black',
    fontWeight: '500',
    fontSize: 60,
    textAlign: 'center'
  },
  main_weather: {
    color: 'gray',
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center'
  },
  bottom_view: {
    flex: 0,
    height: 540,
    backgroundColor: 'white',
    marginBottom: 0
  },
  flatlist: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1, width: '100%'
  },
  flatlist_view: {
    padding: 20,
    width: '100%'
  },
  flatlist_date: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
  flatlist_temp: {
    width: '95%',
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
    paddingTop: 5
  },
  flatlist_weathertype: {
    paddingLeft: 10,
    width: '100%',
    color: 'gray',
    fontWeight: "400",
    fontSize: 16,
    paddingTop: 5
  },
  flatlist_secondview: {
    paddingLeft: 20,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end'
  }
})
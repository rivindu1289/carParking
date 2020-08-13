import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './screens/Map'

export default class App extends React.Component {
  render(){
    return (
      <Map />
    );
  }
}

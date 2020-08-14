import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                </MapView>
                {this.renderParkings()}
            </View>
        );
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <Text>Header</Text>
            </View>
        )
    }

    renderParking(item) {
        return (
            <View key={`parking-${item.id}`} style={styles.parking}>
                <Text>{item.title}</Text>
            </View>
        )
    }

    renderParkings() {
        return (
            <ScrollView horizontal contentContainerStyle={styles.parkings}>
                {parkingsSpots.map(parking => this.renderParking(parking))}
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 3,
        width: '100%'
    },
    header: {
        flex: .5,
        justifyContent: 'center',
    },
    parkings: {
        flex: 1,
        //position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
    },
    parking: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 12,
        marginHorizontal: 24
    }
});


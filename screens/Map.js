import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default class Map extends React.Component {
    state = {
        hours: {},
    }

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
        const { hours } = this.state;
        return (
            <View key={`parking-${item.id}`} style={styles.parking}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 16 }}>x {item.spots} {item.title}</Text>
                    <View style={{ width: 100, borderRadius: 6, borderColor: 'grey', borderWidth: 0.7, padding: 4 }}>
                        <Text style={{ fontSize: 16 }}>05:00 hrs</Text>
                    </View>
                </View>
                <View style={{ flex: 1.5, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5, justifyContent: 'center', marginHorizontal: 24 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Ionicons name='ios-pricetag' size={16} color="#70818A" />
                            <Text>${item.price}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Ionicons name='ios-star' size={16} color="#70818A" />
                            <Text>{item.rating}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buy}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 25, color: 'white' }}>${item.price * 2}</Text>
                            <Text style={{ color: 'white' }}>{item.price}x{hours[item.id]} hrs</Text>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, color: 'white' }}>></Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderParkings() {
        return (
            <ScrollView horizontal
                style={styles.parkings}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
            >
                {parkingsSpots.map(parking => this.renderParking(parking))}
            </ScrollView>
        )
    }
}

const w = Dimensions.get('screen').width;

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
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 24
    },
    parking: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 15,
        marginHorizontal: 24,
        width: w - 48
    },
    buy: {
        flex: 1.25,
        flexDirection: 'row',
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#D83C54'
    },
});

const parkingsSpots = [
    {
        id: 1,
        title: 'Parking 1',
        price: 5,
        rating: 4.2,
        spots: 20,
        free: 10
    },
    {
        id: 2,
        title: 'Parking 2',
        price: 7,
        rating: 3.8,
        spots: 25,
        free: 20
    },
    {
        id: 3,
        title: 'Parking 3',
        price: 10,
        rating: 4.9,
        spots: 50,
        free: 25
    },
];




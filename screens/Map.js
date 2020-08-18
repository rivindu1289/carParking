import React from 'react';
import {
    StyleSheet,
    Text, View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import MapView from 'react-native-maps';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as theme from '../theme';

const { Marker } = MapView;

export default class Map extends React.Component {
    state = {
        hours: {},
        active: null
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
                    }}
                >
                    {parkingsSpots.map(parking =>
                        <Marker
                            key={`marker-${parking.id}`}
                            coordinate={parking.coordinate}>
                            <TouchableWithoutFeedback onPress={() => this.setState({ active: parking.id })} >
                                <View style={[
                                    styles.marker,
                                    styles.shadow,
                                    this.state.active === parking.id ? styles.active : null
                                ]}>
                                    <Text style={styles.markerPrice}>${parking.price}</Text>
                                    <Text style={styles.markerStatus}> ({parking.free}/{parking.spots})</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </Marker>
                    )}
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
            <TouchableWithoutFeedback key={`parking-${item.id}`} onPress={() => this.setState({ active: item.id })} >
                <View style={[styles.parking, styles.shadow]}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 16 }}>x {item.spots} {item.title}</Text>
                        <View style={{ width: 100, borderRadius: 6, borderColor: theme.COLORS.gray, borderWidth: 0.7, padding: 4 }}>
                            <Text style={{ fontSize: 16 }}>05:00 hrs</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1.5, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5, justifyContent: 'center', marginHorizontal: 24 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Ionicons name='ios-pricetag' size={16} color={theme.COLORS.gray} />
                                <Text>${item.price}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Ionicons name='ios-star' size={16} color={theme.COLORS.gray} />
                                <Text>{item.rating}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.buy}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 25, color: theme.COLORS.white }}>${item.price * 2}</Text>
                                <Text style={{ color: theme.COLORS.white }}>{item.price}x{hours[item.id]} hrs</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 25, color: theme.COLORS.white }}>></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    renderParkings() {
        return (
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                style={styles.parkings}
                data={parkingsSpots}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => this.renderParking(item)}
            />
        )
    }

    componentWillMount() {
        const hours = {};
        parkingsSpots.map(parking => { hours[parking.id] = 1 });
        this.setState({ hours });
    }
}

const w = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.white
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
        right: 0,
        left: 0,
        bottom: 24,
        paddingBottom: 24
    },
    parking: {
        flexDirection: 'row',
        backgroundColor: theme.COLORS.white,
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
        backgroundColor: theme.COLORS.red
    },
    marker: {
        flexDirection: 'row',
        backgroundColor: theme.COLORS.white,
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: theme.COLORS.white,
    },
    markerPrice: {
        color: theme.COLORS.red,
        fontWeight: 'bold',
    },
    markerStatus: {
        color: theme.COLORS.gray
    },
    shadow: {
        shadowColor: theme.COLORS.black,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        backgroundColor: theme.COLORS.white,
        elevation: 15
    },
    active: {
        borderColor: theme.COLORS.red,
    },
});

const parkingsSpots = [
    {
        id: 1,
        title: 'Parking 1',
        price: 5,
        rating: 4.2,
        spots: 20,
        free: 10,
        coordinate: {
            latitude: 37.78735,
            longitude: -122.4334,
        }
    },
    {
        id: 2,
        title: 'Parking 2',
        price: 7,
        rating: 3.8,
        spots: 25,
        free: 20,
        coordinate: {
            latitude: 37.78845,
            longitude: -122.4344,
        }
    },
    {
        id: 3,
        title: 'Parking 3',
        price: 10,
        rating: 4.9,
        spots: 50,
        free: 25,
        coordinate: {
            latitude: 37.78615,
            longitude: -122.4314,
        }
    },
];




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
import Modal from 'react-native-modal';

const { Marker } = MapView;

export default class Map extends React.Component {
    state = {
        hours: {},
        active: null,
        activeModal: null
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
                {this.renderModal()}
            </View>
        );
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <View style={styles.headerLocationInfo}>
                    <Text style={styles.headerTitle}>Detected location</Text>
                    <Text style={styles.headerLocation}>San Francisco, US</Text>
                </View>
                <View style={styles.headerIcon}>
                    <TouchableWithoutFeedback>
                        <Ionicons name="ios-menu" size={theme.SIZES.icon * 1.5} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }

    renderParking(item) {
        const { hours } = this.state;
        return (
            <TouchableWithoutFeedback key={`parking-${item.id}`} onPress={() => this.setState({ active: item.id })} >
                <View style={[styles.parking, styles.shadow]}>
                    <View style={styles.hours}>
                        <Text style={theme.SIZES.font}>x {item.spots} {item.title}</Text>
                        <View style={{ width: 100, borderRadius: 6, borderColor: theme.COLORS.gray, borderWidth: 0.7, padding: 4 }}>
                            <Text style={styles.hoursTitle}>05:00 hrs</Text>
                        </View>
                    </View>
                    <View style={styles.parkingInfoContainer}>
                        <View style={styles.parkingInfo}>
                            <View style={styles.parkingIcon}>
                                <Ionicons name='ios-pricetag' size={theme.SIZES.icon} color={theme.COLORS.gray} />
                                <Text>${item.price}</Text>
                            </View>
                            <View style={styles.parkingIcon}>
                                <Ionicons name='ios-star' size={theme.SIZES.icon} color={theme.COLORS.gray} />
                                <Text>{item.rating}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.buy} onPress={() => this.setState({ activeModal: item })}>
                            <View style={styles.buyTotal}>
                                <Text style={styles.buyTotalPrice}>${item.price * 2}</Text>
                                <Text style={{ color: theme.COLORS.white }}>{item.price}x{hours[item.id]} hrs</Text>
                            </View>
                            <View style={styles.buyButton}>
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

    renderModal() {
        const { activeModal } = this.state;
        if (!activeModal) return null;

        return (
            <Modal
                isVisible
                useNativeDriver
                style={styles.modalContainer}
                onBackButtonPress={() => this.setState({ activeModal: null })}
                onBackdropPress={() => this.setState({ activeModal: null })}
                onSwipeComplete={() => this.setState({ activeModal: null })}

            >
                <View style={styles.modal}>
                    <Text>{activeModal.title}</Text>
                </View>
            </Modal>
        )
    }

    componentWillMount() {
        const hours = {};
        parkingsSpots.map(parking => { hours[parking.id] = 1 });
        this.setState({ hours });
    }
}

const {width , height} = Dimensions.get('screen');

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
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: theme.SIZES.base * 2,
        paddingTop: theme.SIZES.base * 2.5,
        paddingBottom: theme.SIZES.base * 1.5,
    },
    headerTitle: {
        color: theme.COLORS.gray,
    },
    headerLocation: {
        fontSize: theme.SIZES.font,
        fontWeight: '500',
        paddingVertical: theme.SIZES.base / 3,
    },
    headerIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    headerLocationInfo: {
        flex: 1,
        justifyContent: 'center'
    },
    parkings: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: theme.SIZES.base * 2,
        paddingBottom: theme.SIZES.base * 2
    },
    parking: {
        flexDirection: 'row',
        backgroundColor: theme.COLORS.white,
        borderRadius: 6,
        padding: 15,
        marginHorizontal: theme.SIZES.base * 2,
        width: width - (theme.SIZES.base * 4)
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
        borderRadius: theme.SIZES.base * 2,
        paddingVertical: 12,
        paddingHorizontal: theme.SIZES.base * 2,
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
    hours: {
        flex: 1,
        flexDirection: 'column'
    },
    hoursTitle: {
        fontSize: theme.SIZES.text,
        fontWeight: '500',
    },
    parkingInfoContainer: {
        flex: 1.5,
        flexDirection: 'row'
    },
    parkingInfo: {
        flex: 0.5,
        justifyContent: 'center',
        marginHorizontal: theme.SIZES.base * 2
    },
    parkingIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buyTotal: {
        flex: 1,
        justifyContent: 'center'
    },
    buyButton: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buyTotalPrice: {
        fontSize: 25,
        color: theme.COLORS.white
    },
    modalContainer: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    modal: {
        height: height * 0.75,
        backgroundColor: theme.COLORS.white,
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




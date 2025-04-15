// src/screens/Home/Home.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, PermissionsAndroid, ScrollView, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import AppWrapper from '../../components/AppWrapper';
import CustomButton from '../../components/CustomButton';
import { apikey } from '../../utils/keys/Keys';
import { myColors } from '../../utils/Themes/Colors';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import HomeTitles from '../../components/HomeTitles';
import ProductList from '../../components/ProductList';
import GridCategory from '../../components/GridCategory';
import { categories, products } from '../../utils/MockData/Groceries';

const Home = () => {
  const [userLocation, setUserLocation] = useState([]);
  const [address, setAddress] = useState('');
  const [isLocationModal, setIsLocationModal] = useState(false);
  const navigation = useNavigation(); // Access the navigation prop

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Zepto App',
          message:
            'Zepto App needs access to your location so you can access location-based products.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        setIsLocationModal(true);
        console.log('Not given');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        if (position) {
          setIsLocationModal(false);
          setUserLocation({
            latitude: position.coords?.latitude,
            longitude: position.coords?.longitude,
          });
          const { data } = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${apikey}`
          );
          setAddress(data.results[0].formatted_address);
        }
      },
      error => {
        setIsLocationModal(true);
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <AppWrapper>
      <AppHeader sLocationModal={isLocationModal} address={address} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <AppBody />
      </ScrollView>
      <AppFooter isLocationModal={isLocationModal} onPress={requestLocationPermission} />
      <WishlistButton />
    </AppWrapper>
  );
};

const AppHeader = ({ address, isLocationModal }) => {
  const navigation = useNavigation();

  return (
    <View style={{ paddingTop: 10, gap: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between' }}>
        <Ionicons name="person-circle-outline" size={40} />
        <View style={{ flex: 0.9 }}>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '800', color: myColors.violet }}>
            Delivery in 10 min
          </Text>
          <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '600', color: myColors.grey }}>
            {isLocationModal
              ? 'No Location Enabled'
              : address
              ? `Home- ${address}`
              : 'Fetching Location...'}
          </Text>
        </View>
        <MaterialCommunityIcons name="note-edit-outline" size={35} />
      </View>

      {/* Search Box */}
      <View
        style={{
          borderWidth: 1.5,
          borderColor: myColors.grey,
          marginHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <Ionicons name="search" size={25} />
        <TextInput placeholder="Search" style={{ padding: 12, flex: 1 }} />
      </View>
    </View>
  );
};

const AppBody = () => {
  const banners = [
    'https://www.brucira.com/assets/img/work/zepto/zepto-banner.webp',
    'https://shyamfuture.com/wp-content/uploads/2022/09/grocery-delivery-app.png',
    'https://gumlet-images.assettype.com/afaqs%2F2021-11%2F00ba47ba-9548-4e01-964f-2d2324f7d7e5%2FZepto_Static.jpg?auto=format%2Ccompress&w=400&dpr=2.6',
    'https://d3l9a8mvoa6cl8.cloudfront.net/wp-content/uploads/sites/3/2023/04/19151115/Banner_What_is_Zepto.jpg',
  ];

  const renderBanners = ({ item }) => {
    return (
      <Image
        resizeMode="contain"
        source={{ uri: item }}
        style={{
          height: 200,
          width: responsiveWidth(80),
          borderRadius: 10,
          backgroundColor: myColors.violet,
          alignSelf: 'stretch',
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 15 }}>
      <FlatList
        pagingEnabled
        horizontal
        data={banners}
        renderItem={renderBanners}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      />
      <HomeTitles title="Your Go-to Items" subtitle="See All" />
      <ProductList data={products} />
      <HomeTitles title="Explore By Categories" subtitle="See All" />
      <GridCategory data={categories} />
    </View>
  );
};

const AppFooter = ({ onPress, isLocationModal }) => {
  return (
    <Modal
      visible={isLocationModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View
          style={{
            flex: 0,
            backgroundColor: myColors.white,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingVertical: 10,
            paddingHorizontal: 15,
            gap: 10,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <MaterialIcons name="pin-drop" size={100} color={myColors.black} />
          </View>
          <Text style={{ fontSize: 20, fontWeight: '600', color: myColors.black, textAlign: 'center' }}>
            Location Permission is off
          </Text>
          <Text style={{ textAlign: 'center', color: myColors.black, opacity: 0.8, top: -5, marginBottom: 10 }}>
            Please enable location permission for better delivery experience
          </Text>
          <CustomButton title="Continue" onPress={onPress} />
        </View>
      </View>
    </Modal>
  );
};

// Wishlist Button as Floating Action Button
const WishlistButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Wishlist')}
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: myColors.violet,
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10, // Ensures the button appears above other content
        zIndex: 1000, // Ensure the button is above other elements
      }}
    >
      <MaterialCommunityIcons name="heart-outline" size={30} color={myColors.white} />
    </TouchableOpacity>
  );
};

export default Home;

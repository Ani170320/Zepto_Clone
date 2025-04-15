import { View, Text, StatusBar, Image, TouchableOpacity, Pressable, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import AppWrapper from '../../components/AppWrapper';
import { myColors } from '../../utils/Themes/Colors';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Login = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  const handleSignUp = () => {
    if (!isChecked) {
      Alert.alert('Attention', 'Please accept the terms & privacy policy first.');
      return;
    }
    navigation.replace('Tabs');
  };

  const handleLogin = () => {
  
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    // Example check for valid email format (basic validation)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    // Assuming valid credentials (you can add your authentication logic here)
    Alert.alert('Login Successful', 'You have logged in successfully!');
    navigation.replace('Home'); // Navigate to Home after successful login
  };

  return (
    <AppWrapper>
      <StatusBar backgroundColor={myColors.violet} />
      <View
        style={{
          flex: 1,
          backgroundColor: myColors.violet,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flex: 0.5 }}>
          <Image
            style={{ width: responsiveWidth(70), height: 100, alignSelf: 'center' }}
            source={{
              uri: 'https://resize.indiatvnews.com/en/centered/newbucket/1200_675/2021/12/zepto-1640066094.jpg',
            }}
          />
          <Text
            style={{
              color: myColors.white,
              fontSize: responsiveFontSize(1.7),
              textAlign: 'center',
              top: -20,
              letterSpacing: 1.4,
            }}
          >
            10 Minutes Delivery
          </Text>
        </View>

        <View style={{ flex: 0.5, justifyContent: 'center' }}>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            placeholderTextColor={myColors.grey}
            style={{
              backgroundColor: myColors.white,
              padding: 15,
              borderRadius: 15,
              marginBottom: 15,
              fontSize: responsiveFontSize(1.5),
            }}
          />

          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            placeholderTextColor={myColors.grey}
            secureTextEntry
            style={{
              backgroundColor: myColors.white,
              padding: 15,
              borderRadius: 15,
              marginBottom: 20,
              fontSize: responsiveFontSize(1.5),
            }}
          />

          <TouchableOpacity
            onPress={handleLogin} // Call handleLogin when button is pressed
            activeOpacity={0.9}
            style={{
              backgroundColor: myColors.white,
              padding: 15,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: myColors.black,
                fontSize: responsiveFontSize(1.7),
                fontWeight: '700',
              }}
            >
              Log In
            </Text>
          </TouchableOpacity>

          <Pressable
            onPress={() => setIsChecked(!isChecked)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <View
              style={{
                width: 18,
                height: 18,
                borderWidth: 1.5,
                borderColor: myColors.white,
                backgroundColor: isChecked ? myColors.white : 'transparent',
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isChecked && <AntDesign name="check" size={12} color={myColors.violet} />}
            </View>
            <Text
              style={{
                color: myColors.white,
                fontSize: responsiveFontSize(1.5),
              }}
            >
              I accept the terms & privacy policy
            </Text>
          </Pressable>
        </View>
      </View>
    </AppWrapper>
  );
};

export default Login;

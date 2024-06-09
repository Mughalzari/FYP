import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import styles from '../styles';
import { useQuery, useMutation } from "@tanstack/react-query";
import apiRequest from "../api/apiRequest";
import urlType from "../constants/UrlConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const SignUpScreen = () => {
  const [customername, setcustomername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const signupMutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequest(urlType.BACKEND, {
        method: "post",
        url: `signup`,
        data,
      });
      // console.log(response);
      return response;
    },
    onSuccess: async (e) => {
      if (e.status === 200) {
        await AsyncStorage.setItem("@user", JSON.stringify(e.data.user));
        await AsyncStorage.setItem("@auth_token", e.data.token);
        navigation.navigate("Homepage");
      } else if (e.response.status === 404) {
        showMessage({
          message: e.response.message,
          type: "danger",
          color: "#fff",
          backgroundColor: "red",
          floating: true,
        });
      } else {
        showMessage({
          message: e.response.message || "An Error occured",
          type: "danger",
          color: "#fff",
          backgroundColor: "red",
          floating: true,
        });
      }
    },
  });

  const handleSignup = async () => {
    var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      email.length > 0 &&
      customername.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    ) {
      if (email.match(emailFormat)) {
        const data = {
          customername: customername,
          email: email,
          password: password,
        };
        await signupMutation.mutate(data);
        // console.log(loginMutation.isLoading);
        // console.log(data);
      } else {
        showMessage({
          message: "Invalid Email Format",
          type: "danger",
          color: "#fff",
          backgroundColor: "red",
          floating: true,
        });
      }
    } else if (password !== confirmPassword) {
      showMessage({
        message: "Password does not match",
        type: "danger",
        color: "#fff",
        backgroundColor: "red",
        floating: true,
      });
    } else {
      showMessage({
        message: "Please fill all the fields",
        type: "danger",
        color: "#fff",
        backgroundColor: "red",
        floating: true,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HTS</Text>
      <Text style={styles.title}>Sign Up</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        onChangeText={setcustomername}
        value={customername}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};


export default SignUpScreen;

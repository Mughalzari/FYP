import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './login';
import { useQuery, useMutation } from "@tanstack/react-query";
import apiRequest from "../api/apiRequest";
import urlType from "../constants/UrlConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const HomeScreen = () => {

  const [userInfo, setUserInfo] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const userString = await AsyncStorage.getItem("@user");
          const user = await JSON.parse(userString);

          if (user) {
            setUserInfo(user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();

      return () => { };
    }, [])
  );
  console.log("ggg", userInfo)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to My App {userInfo?.customername}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>No content</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
  },
  footer: {
    height: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
});

export default HomeScreen;

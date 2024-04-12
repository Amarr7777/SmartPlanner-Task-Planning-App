import React, { useState } from "react";
import styles from "./style";
import img from "../assets/mainlogo.jpg";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { widthPercentageToDP } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(email, password);
    const userData = {
      email: email,
      password,
    };
    axios
      .post("http://10.4.205.62:5001/auth/login-user", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
          // Save token to async storage and navigate to home page
          AsyncStorage.setItem("token", res.data.data)
            .then(() => {
              navigation.navigate("Tab");
            })
            .catch((error) => {
              console.error("Error saving token to async storage:", error);
              Alert.alert(
                "Token saving failed",
                "An error occurred while saving token. Please try again later."
              );
            });
        }
      })
      .catch((error) => {
        console.error("Error during login request:", error);
        Alert.alert(
          "Login failed",
          "An error occurred during login. Please try again later."
        );
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={"always"}
    >
      {/* <View style={{ backgroundColor: 'white' }}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={img} />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Login!!!</Text>
          <View style={styles.action}>
            {<FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />}
            <TextInput placeholder='Email' style={styles.textInput} onChangeText={(e)=>setEmail(e)} />
          </View>
          <View style={styles.action}>
            {<FontAwesome name="lock" color="#420475" style={styles.smallIcon} />}
            <TextInput placeholder='Password' style={styles.textInput} onChangeText={(e)=>setPassword(e)} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 8,
              marginRight: 10,
            }}>
            <Text style={{ color: '#420475', fontWeight: '700' }}>
              Forget Password
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={handleSubmit}>
            <View>
              <Text style={styles.textSign}>Log in</Text>
            </View>
          </TouchableOpacity>
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>
              ---or Continue as---
            </Text>
          </View>
          <View style={styles.bottomButton}>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TouchableOpacity style={styles.inBut2}>
                <FontAwesome name="user-circle-o" color="white" style={styles.smallIcon2} />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Guest</Text>
            </View>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TouchableOpacity style={styles.inBut2} onPress={(e) => navigation.navigate('Register')}>
                <FontAwesome name="user-plus" color="white" style={[styles.smallIcon2, { fontSize: 30 }]} />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Sign Up</Text>
            </View>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TouchableOpacity style={styles.inBut2} onPress={() => alert("Coming Soon")}>
                <FontAwesome name="google" color="white" style={[styles.smallIcon2, { fontSize: 30 }]} />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Google</Text>
            </View>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TouchableOpacity style={styles.inBut2} onPress={() => alert("Coming Soon")}>
                <FontAwesome name="facebook-f" color="white" style={[styles.smallIcon2, { fontSize: 30 }]} />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Facebook</Text>
            </View>
          </View>
        </View>
      </View> */}
      <ImageBackground
        className="flex-1"
        source={require("../assets/loginBG-3.png")}
      >
        <View className=" h-full justify-between">
          <View className="flex flex-1 flex-col  px-10 pt-52 items-start gap-5">
            <Text className=" text-white text-3xl font-bold pb-10">
              Log in to start managing your tasks easily{" "}
            </Text>
            <View className="flex flex-col gap-2 items-start w-full pr-10">
              <Text className=" text-white">Email</Text>
              <TextInput
                onChangeText={(e) => setEmail(e)}
                className="border font-semibold text-white border-white focus:border-[#DDFF94] focus:outline-none focus:ring-2 focus:ring-[#DDFF94] w-full rounded-md px-5 py-3"
              />
            </View>
            <View className="flex flex-col gap-2 items-start w-full pr-10">
              <Text className=" text-white">Password</Text>
              <TextInput
                onChangeText={(e) => setPassword(e)}
                className="border font-semibold text-white border-white focus:border-[#DDFF94] focus:outline-none focus:ring-2 focus:ring-[#DDFF94] w-full rounded-md px-5 py-3"
              />
            </View>
          </View>
          <View
            className="flex flex-col gap-2 mx-10"
            style={{ paddingBottom: widthPercentageToDP("20%") }}
          >
            <View className="flex-row gap-2 items-end">
              <Text className="text-white">Don't have an account?</Text>
              <TouchableWithoutFeedback
                onPress={(e) => navigation.navigate("Register")}
              >
                <Text className="text-[#DDFF94]">SignUp</Text>
              </TouchableWithoutFeedback>
            </View>
            <TouchableOpacity
              // onPress={()=>navigation.navigate("Tab")}
              onPress={handleSubmit}
              className="bg-[#DDFF94] px-5 py-5 flex items-center justify-center rounded-full "
            >
              <Text className="text-black">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default Login;

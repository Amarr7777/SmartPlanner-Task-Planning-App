import React from "react";
import styles from "./style";
import img from "../assets/mainlogo.jpg";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useState } from "react";
import Error from "react-native-vector-icons/MaterialIcons";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Register() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit() {
    const userData = {
      name: name,
      email: email,
      password,
    };
    if (nameVerify && emailVerify && passwordVerify) {
      axios
        .post("http://192.168.114.96:5001/auth/register", userData)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "ok") {
            Alert.alert(
              "Welcome to SmartPlanner!",
              "Your account has been successfully created. Start planning your day with SmartPlanner!",
              [
                {
                  text: "Start Planning",
                  onPress: () => navigation.navigate("Login"),
                },
                {
                  text: "Close",
                  onPress: () => console.log("Registration alert closed"),
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(JSON.stringify(res.data));
          }
        })
        .catch((e) => console.log(e));
    } else {
      Alert.alert(
        "Invalid Information",
        "Please check your information again.",
        [{ text: "OK" }]
      );
    }
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);

    if (/^[a-zA-Z\s]{3,}$/.test(nameVar)) {
      setName(nameVar);
      setNameVerify(true);
    }
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }

  // function handleMobile(e) {
  //   const mobileVar = e.nativeEvent.text;
  //   setMobile(mobileVar);
  //   setMobileVerify(false);
  //   if (/[6-9]{1}[0-9]{9}/.test(mobileVar)) {
  //     setMobile(mobileVar);
  //     setMobileVerify(true);
  //   }
  // }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      {/* <View>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/profile.png')} />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Register!!!</Text>

          <View style={styles.action}>
            {<FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />}
            <TextInput placeholder='Name' style={styles.textInput} onChange={e => handleName(e)}
            />
            {name.length < 1 ? null : nameVerify ? (
              <Feather name='check-circle' color='green' size={20} />
            ) : (
              <Error name='error' color='red' size={20} />
            )}
          </View>
          {name.length < 1 ? null : nameVerify ? null : (
            <Text
              style={{ color: 'red', marginLeft: 20 }}>
              Name should be  more than 2 character
            </Text>
          )}

          <View style={styles.action}>
            {<FontAwesome name="user" color="#420475" size={24} style={{ marginLeft: 0, paddingRight: 5 }} />}
            <TextInput placeholder='Email' style={styles.textInput}
              onChange={(e => handleEmail(e))}
            />
            {email.length < 1 ? null : emailVerify ? (
              <Feather name='check-circle' color='green' size={20} />
            ) : (
              <Error name='error' color='red' size={20} />
            )}
          </View>
          {email.length < 1 ? null : emailVerify ? null : (
            <Text
              style={{ color: 'red', marginLeft: 20 }}>
              Enter Proper Email Address
            </Text>
          )}

          <View style={styles.action}>
            {<FontAwesome name="mobile" color="#420475" size={35} style={{ marginTop: -7, marginLeft: 5, paddingRight: 10 }} />}
            <TextInput placeholder='Mobile' style={styles.textInput}
              onChange={e => handleMobile(e)}
              maxLength={10}
            />
            {mobile.length < 1 ? null : mobileVerify ? (
              <Feather name='check-circle' color='green' size={20} />
            ) : (
              <Error name='error' color='red' size={20} />
            )}
          </View>
          {mobile.length < 1 ? null : mobileVerify ? null : (
            <Text
              style={{ color: 'red', marginLeft: 20 }}>
              Phone number with 6-9 and remaining 9 digits with 0-9
            </Text>
          )}

          <View style={styles.action}>
            {<FontAwesome name="lock" color="#420475" style={styles.smallIcon} />}
            <TextInput placeholder='Password' style={styles.textInput}
              onChange={e => handlePassword(e)}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length < 1 ? null : !showPassword ? (
                <Feather
                  name='eye-off'
                  color={passwordVerify ? 'green' : 'red'}
                  size={23}
                  style={{ marginRight: -10 }}
                />
              ) : (
                <Feather
                  name='eye'
                  color={passwordVerify ? 'green' : 'red'}
                  size={23}
                  style={{ marginRight: -10 }}
                />
              )}

            </TouchableOpacity>
          </View>
          {password.length < 1 ? null : passwordVerify ? null : (
            <Text
              style={{ color: 'red', marginLeft: 20 }}>
              UpperCase, LowerCase  Letters, Numbers and Special Characters are required. Length more than 8.
            </Text>
          )}

        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
            <View>
              <Text style={styles.textSign}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View> */}
      <ImageBackground
        className="flex-1"
        source={require("../assets/loginBG-3.png")}
      >
        <View className=" h-full justify-between">
          <View className="flex flex-1 flex-col px-10 py-20 items-start gap-5">
            <Text className=" text-white text-3xl font-bold pb-10">
              Create an account to take control of your day{" "}
            </Text>
            <View className="flex flex-col gap-2 items-start w-full pr-10">
              <Text className=" text-white">Name</Text>
              <TextInput
                onChange={(e) => handleName(e)}
                className="border font-semibold text-white border-white focus:border-[#DDFF94] focus:outline-none focus:ring-2 focus:ring-[#DDFF94] w-full rounded-md px-5 py-3"
              />
            </View>
            <View className="flex flex-col gap-2 items-start w-full pr-10">
              <Text className=" text-white">Email</Text>
              <TextInput
                onChange={(e) => handleEmail(e)}
                className="border font-semibold text-white border-white focus:border-[#DDFF94] focus:outline-none focus:ring-2 focus:ring-[#DDFF94] w-full rounded-md px-5 py-3"
              />
            </View>
            <View className="flex flex-col gap-2 items-start w-full pr-10">
              <Text className=" text-white">Password</Text>
              <TextInput
                onChange={(e) => handlePassword(e)}
                className="border font-semibold text-white border-white focus:border-[#DDFF94] focus:outline-none focus:ring-2 focus:ring-[#DDFF94] w-full rounded-md px-5 py-3"
              />
            </View>
            <View className="flex flex-col gap-2 items-start w-full pr-10">
              <Text className=" text-white">Password</Text>
              <TextInput className="border font-semibold text-white border-white focus:border-[#DDFF94] focus:outline-none focus:ring-2 focus:ring-[#DDFF94] w-full rounded-md px-5 py-3" />
            </View>
          </View>
          <View className="flex flex-col gap-2 mx-10 mb-10">
            <View className="flex-row gap-2 items-end">
              <Text className="text-white">Already a member?</Text>
              <TouchableWithoutFeedback
                onPress={(e) => navigation.navigate("Login")}
              >
                <Text className="text-[#DDFF94]">Log in</Text>
              </TouchableWithoutFeedback>
            </View>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="bg-[#DDFF94] px-5 py-5 flex items-center justify-center rounded-full "
            >
              <Text className="text-black">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default Register;

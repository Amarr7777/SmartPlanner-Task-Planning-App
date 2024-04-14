import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios"; // Import axios for making HTTP requests
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [categories, setCategories] = useState([]); // State to store task categories data
  const [acdDuration, setAcdDuration] = useState(0); // State to store Academics/Profession category duration
  const [personalDuration, setPersonalDuration] = useState(0); // State to store Personal category duration
  const [socialDuration, setSocialDuration] = useState(0); // State to store Social category duration
  const [generalDuration, setGeneralDuration] = useState(0); // State to store General category duration

  useEffect(() => {
    // Function to fetch task categories data
    const fetchCategories = async () => {
      const token = await AsyncStorage.getItem("token");
      const data = {
        token,
      };

      await axios
        .post("http://192.168.1.5:5001/task/getAllTasks", data)
        .then((response) => {
          const tasks = response.data.data;
          setCategories(tasks);

          // Calculate duration for each category
          let acdDur = 0;
          let perDur = 0;
          let socDur = 0;
          let genDur = 0;

          tasks.forEach((task) => {
            const startTime = new Date(task.startTime).getTime();
            const endTime = new Date(task.endTime).getTime();
            const duration = endTime - startTime;

            switch (task.categoryName) {
              case "Academics/Profession":
                acdDur += duration;
                break;
              case "Personal":
                perDur += duration;
                break;
              case "Social":
                socDur += duration;
                break;
              case "General":
                genDur += duration;
                break;
              default:
                break;
            }
          });

          // Update state with duration for each category
          setAcdDuration(acdDur);
          setPersonalDuration(perDur);
          setSocialDuration(socDur);
          setGeneralDuration(genDur);
        })
        .catch((error) => {
          console.error("Error fetching task categories:", error);
        });
    };

    // Call the fetch function when the component mounts
    fetchCategories();
  }, [categories]);

  // Function to convert milliseconds to time format (HH:MM:SS)
  const millisecondsToTime = (milliseconds) => {
    const totalSeconds = milliseconds / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      {/* Render user information if user data is available */}
      {user && (
        <View style={styles.topContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      )}
      {/* Render task categories if data is available */}
      {categories.length > 0 && (
        <View style={styles.categoriesContainer}>
          <Text style={styles.heading}>Task Categories:</Text>
          <Text style={styles.category}>
            Academics/Profession - Total Duration:{" "}
            {millisecondsToTime(acdDuration)} hours
          </Text>
          <Text style={styles.category}>
            Personal - Total Duration: {millisecondsToTime(personalDuration)}{" "}
            hours
          </Text>
          <Text style={styles.category}>
            Social - Total Duration: {millisecondsToTime(socialDuration)} hours
          </Text>
          <Text style={styles.category}>
            General - Total Duration: {millisecondsToTime(generalDuration)}{" "}
            hours
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  topContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 5, color: "white" },
  email: { fontSize: 18, marginBottom: 10, color: "white" },
  categoriesContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  category: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
});

export default ProfileScreen;

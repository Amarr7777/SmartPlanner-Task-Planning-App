import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios"; // Import axios for making HTTP requests
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [categories, setCategories] = useState([]); // State to store task categories data

  useEffect(() => {
    // Function to fetch task categories data
    const fetchCategories = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios
        .post("http://10.4.205.62:5001/task/getAllTasks", token)
        .then((response) => {
          setCategories(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching task categories:", error);
        });
    };

    // Call the fetch functions when the component mounts
    // fetchUserData();
    fetchCategories();
  }, []);

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
          {categories.map((category, index) => (
            <Text key={index} style={styles.category}>
              {category.categoryName}
            </Text>
          ))}
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

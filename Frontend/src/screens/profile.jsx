import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios"; // Import axios for making HTTP requests
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from "react-native-chart-kit";

const ProfileScreen = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [categories, setCategories] = useState([]); // State to store task categories data
  const [categoryCounts, setCategoryCounts] = useState({}); // State to store category counts

  useEffect(() => {
    // Function to fetch task categories data
    const fetchCategories = async () => {
      const token = await AsyncStorage.getItem("token");
      const data = {
        token,
      };

      await axios
        // .post("http://192.168.1.5:5001/task/getAllTasks", data)
        .post("http://10.0.2.2:5001/task/getAllTasks", data)
        .then((response) => {
          const tasks = response.data.data;
          setCategories(tasks);

          // Calculate count for each category
          const counts = {};
          tasks.forEach((task) => {
            counts[task.categoryName] = (counts[task.categoryName] || 0) + 1;
          });

          // Update state with category counts
          setCategoryCounts(counts);
        })
        .catch((error) => {
          console.error("Error fetching task categories:", error);
        });
    };

    // Call the fetch function when the component mounts
    fetchCategories();
  }, [categories]);

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
          <Text style={styles.heading}>Task Categories Count:</Text>
          <BarChart
            data={{
              labels: Object.keys(categoryCounts),
              datasets: [
                {
                  data: Object.values(categoryCounts),
                },
              ],
            }}
            width={300}
            height={200}
            yAxisLabel="Count"
            chartConfig={{
              backgroundGradientFrom: "#1E2923",
              backgroundGradientTo: "#08130D",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
          />
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
});

export default ProfileScreen;

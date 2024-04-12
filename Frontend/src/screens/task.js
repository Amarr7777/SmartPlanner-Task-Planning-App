import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AddTaskScreen from "./AddTaskScreen";

const Stack = createStackNavigator();

const TaskScreen = ({ navigation }) => {
  // Define categories
  const categories = [
    {
      name: "Academics/Profession",
      color: "#222222",
      image: require("../assets/Academics.png"),
    },
    {
      name: "Personal",
      color: "#222222",
      image: require("../assets/Personal.png"),
    },
    {
      name: "Social",
      color: "#222222",
      image: require("../assets/Social.png"),
    },
    {
      name: "General",
      color: "#222222",
      image: require("../assets/General.png"),
    },
  ];

  // Function to navigate to AddTaskScreen when a category card is pressed
  const handleCategoryPress = (selectedCategory) => {
    navigation.navigate("AddTaskScreen", { selectedCategory });
  };

  // Function to render each category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => handleCategoryPress(item.name)}
    >
      {/* Display image */}
      {item.image && <Image source={item.image} style={styles.image} />}
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TaskList">
        {() => (
          <View style={styles.container}>
            <Text style={styles.heading}>Categories</Text>
            {/* FlatList to display categories */}
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.name}
              numColumns={2}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  heading: {
    fontSize: 25,
    color: "white",
    marginBottom: 20,
  },
  flatListContent: {
    alignItems: "center",
  },
  card: {
    width: "45%",
    height: 180,
    margin: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 18,
    color: "white",
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
});

export default TaskScreen;

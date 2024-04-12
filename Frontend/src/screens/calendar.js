import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const CalendarScreen = () => {
  const [items, setItems] = useState({});

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        "http://10.4.205.62:5001/user/getUser",
        { token }
      );
      const tasks = response.data.data.tasks;
      console.log("TASK", tasks);

      const updatedItems = {};
      tasks.forEach((task) => {
        const startDate = new Date(task.startDate).toISOString().split("T")[0];
        if (!updatedItems[startDate]) {
          updatedItems[startDate] = [];
        }
        updatedItems[startDate].push({
          name: task.taskName,
          startTime: task.startTime,
          endTime: task.endTime,
        });
      });
      setItems(updatedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ position: "absolute", top: 100, left: 40 }}>
        <Text style={{ color: "white", fontSize: 24 }}>Calendar</Text>
      </View>
      <View style={{ flex: 1, marginTop: 150 }}>
        <Agenda
          items={items}
          renderItem={(item, firstItemInDay) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>
                Start Time: {formatTime(item.startTime)}
              </Text>
              <Text style={styles.cardText}>
                End Time: {formatTime(item.endTime)}
              </Text>
            </View>
          )}
          // renderDay={(day, item = []) => {
          //   if (!day) return null; // Check if day is undefined
          //   return (
          //     <View style={styles.dayContainer}>
          //       <Text style={styles.day}>{day.day}</Text>
          //       {items[day.dateString]?.map((task, index) => (
          //         <View key={index}>
          //           <Text style={styles.taskName}>{task.name}</Text>
          //           <Text style={styles.time}>
          //             {formatTime(task.startTime)} - {formatTime(task.endTime)}
          //           </Text>
          //         </View>
          //       ))}
          //     </View>
          //   );
          // }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  dayContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
});

export default CalendarScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icon library
import hardcodedTasks from "./hardcodedTasks"; // Import hardcoded tasks

// Dummy user data for testing
const user = {
  name: "Vishnu PS",
  email: "vis@gmail.com",
  avatar: require("../assets/profile.png"), // Assuming you have an avatar image
  bio: "Previous Month Analytics",
};

const ProfileScreen = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [selectedGraph, setSelectedGraph] = useState("previousMonth");
  const [graphHeading, setGraphHeading] = useState(user.bio);

  useEffect(() => {
    // Update items with hardcoded tasks data
    updateItems(hardcodedTasks);
  }, []); // Empty dependency array to run the effect only once

  // Function to update items state with task data
  const updateItems = (taskData) => {
    const tasks = taskData;

    tasks.forEach((task) => {
      const startDate = new Date(task.startTime);
      const endDate = new Date(task.endTime);

      // Calculate the number of days the task spans
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Use Math.ceil to include the end day

      // Loop through the range of dates and add task data
      for (let i = 0; i < diffDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        // Determine if it's the first or last day of the task
        const isFirstDay = i === 0;
        const isLastDay = i === diffDays - 1;

        // For the first day, use the original start time; for the last day, use the original end time
        const startTime = isFirstDay
          ? task.startTime.toLocaleTimeString()
          : "00:00:00";
        const endTime = isLastDay
          ? task.endTime.toLocaleTimeString()
          : "23:59:59";

        // Add task data for the current date
        const date = currentDate.toISOString().split("T")[0];
        setItems((prevItems) => ({
          ...prevItems,
          [date]: [
            ...(prevItems[date] ? prevItems[date] : []),
            {
              name: task.name,
              startTime: task.startTime,
              endTime: task.endTime,
            },
          ],
        }));
      }
    });
  };

  const handleLeftButtonPress = () => {
    const graphs = [
      "previousMonth",
      "academicsProfession",
      "personal",
      "social",
      "general",
    ];
    const currentIndex = graphs.indexOf(selectedGraph);
    const prevIndex = (currentIndex - 1 + graphs.length) % graphs.length;
    setSelectedGraph(graphs[prevIndex]);

    // Update graph heading based on selected graph
    switch (graphs[prevIndex]) {
      case "previousMonth":
        setGraphHeading(user.bio);
        break;
      case "academicsProfession":
        setGraphHeading("Academics/Profession");
        break;
      case "personal":
        setGraphHeading("Personal");
        break;
      case "social":
        setGraphHeading("Social");
        break;
      case "general":
        setGraphHeading("General");
        break;
      default:
        setGraphHeading(user.bio);
        break;
    }
  };

  const handleRightButtonPress = () => {
    const graphs = [
      "previousMonth",
      "academicsProfession",
      "personal",
      "social",
      "general",
    ];
    const currentIndex = graphs.indexOf(selectedGraph);
    const nextIndex = (currentIndex + 1) % graphs.length;
    setSelectedGraph(graphs[nextIndex]);

    // Update graph heading based on selected graph
    switch (graphs[nextIndex]) {
      case "previousMonth":
        setGraphHeading(user.bio);
        break;
      case "academicsProfession":
        setGraphHeading("Academics/Profession");
        break;
      case "personal":
        setGraphHeading("Personal");
        break;
      case "social":
        setGraphHeading("Social");
        break;
      case "general":
        setGraphHeading("General");
        break;
      default:
        setGraphHeading(user.bio);
        break;
    }
  };

  // Calculate analysis data from calendar items
  const calculateAnalysisData = () => {
    // Initialize analysis data object
    const previousMonthData = {
      "Academics/Profession": 50,
      Personal: 10,
      Social: 50,
      General: 100,
    };

    // Initialize Academics/Profession data
    const academicsProfessionData = {
      "Subject 1": 30,
      "Subject 2": 40,
      "Subject 3": 20,
      "Subject 4": 50,
    };

    // Initialize Personal data
    const personalData = {
      "Personal Activity 1": 20,
      "Personal Activity 2": 30,
      "Personal Activity 3": 40,
      "Personal Activity 4": 50,
    };

    // Initialize Social data
    const socialData = {
      "Social Activity 1": 30,
      "Social Activity 2": 40,
      "Social Activity 3": 25,
      "Social Activity 4": 35,
    };

    // Initialize General data
    const generalData = {
      "General Task 1": 10,
      "General Task 2": 20,
      "General Task 3": 30,
      "General Task 4": 40,
    };

    switch (selectedGraph) {
      case "previousMonth":
        return previousMonthData;
      case "academicsProfession":
        return academicsProfessionData;
      case "personal":
        return personalData;
      case "social":
        return socialData;
      case "general":
        return generalData;
      default:
        return previousMonthData;
    }
  };

  // Get analysis data
  const analysisData = calculateAnalysisData();

  // Automated feedback for each category
  const feedback =
    selectedGraph === "previousMonth"
      ? [
          `Your efficiency in academic or professional tasks appears to be moderate. Consider allocating more time or effort to these areas for improved performance.`,
          `You've dedicated a reasonable amount of time to personal activities. Keep maintaining a healthy balance between personal and other aspects of your life.`,
          `Your social engagement seems to be quite active, reflecting a good level of social interaction. Continue nurturing your social connections.`,
          `A significant portion of your time is spent on general tasks. Consider prioritizing tasks or organizing your activities more efficiently to optimize productivity.`,
        ]
      : selectedGraph === "academicsProfession"
      ? [
          `Your performance in academic subjects seems promising.`,
          `You have shown consistent effort in subject-related activities.`,
          `Continue focusing on your academic pursuits for better results.`,
          `Consider seeking additional resources or support for subjects where you need improvement.`,
        ]
      : selectedGraph === "personal"
      ? [
          `Your performance in personal activities appears satisfactory.`,
          `Dedicate sufficient time to activities that contribute to your personal growth and well-being.`,
          `Maintaining a healthy work-life balance is crucial for overall happiness and productivity.`,
          `Consider exploring new hobbies or interests to enrich your personal life further.`,
        ]
      : selectedGraph === "social"
      ? [
          `Your social interactions seem to be quite active.`,
          `Building and maintaining social connections is important for overall well-being.`,
          `Continue engaging with friends and participating in social activities.`,
          `Consider broadening your social circle by joining clubs or groups with similar interests.`,
        ]
      : [
          `You've been productive in handling various general tasks.`,
          `Efficiently managing general tasks contributes to overall productivity.`,
          `Continue organizing and prioritizing your tasks effectively.`,
          `Consider automating repetitive tasks or delegating when possible to free up time for higher-priority activities.`,
        ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          {/* Left button */}
          <TouchableOpacity onPress={handleLeftButtonPress}>
            <FontAwesome
              name="angle-left"
              size={24}
              color="white"
              style={styles.button}
            />
          </TouchableOpacity>
          {/* Chart heading */}
          <Text style={styles.chartHeading}>{graphHeading}</Text>
          {/* Right button */}
          <TouchableOpacity onPress={handleRightButtonPress}>
            <FontAwesome
              name="angle-right"
              size={24}
              color="white"
              style={styles.button}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.chartBox}>
          <BarChart
            data={{
              labels: Object.keys(analysisData),
              datasets: [
                {
                  data: Object.values(analysisData),
                },
              ],
            }}
            width={350} // Adjust the width to make the chart smaller
            height={250} //
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: "#ffffff", // Set background color to white
              backgroundGradientTo: "#ffffff", // Set background color to white
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Set data color to black
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Set label color to black
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.chart}
          />
        </View>
      </View>

      {/* Feedback for each category */}
      <View style={styles.feedbackContainer}>
        {Object.keys(analysisData).map((category, index) => (
          <Text
            key={index}
            style={styles.feedbackText}
          >{`${category}: ${feedback[index]}`}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  chartContainer: {
    alignItems: "center",
    marginBottom: 20, // Add margin bottom to provide space for the chart
  },
  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Align items along the main axis (horizontal centering)
    marginBottom: 10,
  },
  chartHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    flex: 1, // Take up available space
    textAlign: "center", // Center the text
  },
  button: {
    marginLeft: 10, // Add some spacing between the buttons and the heading
    marginRight: 10, // Add some spacing between the heading and the buttons
  },
  chartBox: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
  },
  chart: {
    borderRadius: 16,
  },
  feedbackContainer: {},
  feedbackText: {
    color: "white",
    marginBottom: 10,
  },
});

export default ProfileScreen;

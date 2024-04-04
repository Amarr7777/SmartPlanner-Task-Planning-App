// import React, { useState } from 'react';
// import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput, Switch, Button, Platform } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const AddTaskScreen = ({ route, navigation }) => {
//   const { categoryName } = route.params || { categoryName: '' };
//   const [tasksByCategory, setTasksByCategory] = useState({
//     'Academics/Profession': ['Homework/Assignments', 'Exams/Tests', 'Study Sessions', 'Projects'],
//     'Personal': ['Fitness/Health', 'Career/Internship', 'Personal Tasks'],
//     'Social': ['Extracurricular Activities', 'Meetings', 'Social Events'],
//     'General': ['Reminders', 'Travel Plans', 'Sleep/Rest'],
//   });
//   const [modalVisible, setModalVisible] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(categoryName);
//   const [selectedTask, setSelectedTask] = useState('');
//   const [isAddingCustomTask, setIsAddingCustomTask] = useState(false);
//   const [customTask, setCustomTask] = useState('');
//   const [taskName, setTaskName] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleTaskSelect = (task) => {
//     setSelectedTask(task);
//     setTaskName(task); // Set task name to the selected task
//     setModalVisible(false);
//   };

//   const handleAddCustomTask = () => {
//     if (customTask.trim() !== '') {
//       const updatedTasks = [...tasksByCategory[selectedCategory]];
//       updatedTasks.push(customTask.trim());
//       setTasksByCategory({
//         ...tasksByCategory,
//         [selectedCategory]: updatedTasks,
//       });
//       setCustomTask('');
//       setIsAddingCustomTask(false);
//     }
//   };

//   const handleSaveTask = () => {
//     // Save the task details and navigate back to the previous screen
//     // You can implement your logic here to save the task to your data source
//     navigation.goBack();
//   };

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(false);
//     setDate(currentDate);
//   };

//   return (
//     <View style={styles.container}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select a Category</Text>
//             <Picker
//               selectedValue={selectedCategory}
//               onValueChange={(itemValue) => setSelectedCategory(itemValue)}
//             >
//               {Object.keys(tasksByCategory).map((category) => (
//                 <Picker.Item key={category} label={category} value={category} />
//               ))}
//             </Picker>
//             <Text style={styles.modalTitle}>Select a Task</Text>
//             {tasksByCategory[selectedCategory] && tasksByCategory[selectedCategory].map((task, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.taskItem}
//                 onPress={() => handleTaskSelect(task)}
//               >
//                 <Text style={styles.taskText}>{task}</Text>
//               </TouchableOpacity>
//             ))}
//             <View style={styles.switchContainer}>
//               <Text>Add Custom Task</Text>
//               <Switch
//                 trackColor={{ false: '#767577', true: '#81b0ff' }}
//                 thumbColor={isAddingCustomTask ? '#f5dd4b' : '#f4f3f4'}
//                 ios_backgroundColor="#3e3e3e"
//                 onValueChange={(value) => setIsAddingCustomTask(value)}
//                 value={isAddingCustomTask}
//               />
//             </View>
//             {isAddingCustomTask && (
//               <View style={styles.customTaskInputContainer}>
//                 <TextInput
//                   style={styles.customTaskInput}
//                   value={customTask}
//                   onChangeText={setCustomTask}
//                   placeholder="Enter custom task"
//                 />
//                 <TouchableOpacity style={styles.addButton} onPress={handleAddCustomTask}>
//                   <Text style={styles.addButtonText}>Add</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//           <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       {/* Task details input */}
//       <View style={styles.taskDetailsContainer}>
//         <Text style={styles.categoryText}>Category: {selectedCategory}</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Task Name"
//           value={taskName}
//           onChangeText={setTaskName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Description"
//           value={description}
//           onChangeText={setDescription}
//         />
//         <View style={styles.buttonContainer}>
//           <Button
//             title="Select Time"
//             onPress={() => setShowDatePicker(true)}
//           />
//           <View style={styles.buttonSpace}></View>
//           {showDatePicker && (
//             <DateTimePicker
//               testID="dateTimePicker"
//               value={date}
//               mode="time"
//               is24Hour={true}
//               display="default"
//               onChange={onChange}
//             />
//           )}
//         </View>
//         <View style={styles.buttonSpace}></View>
//         <Button
//           title="Add Task"
//           onPress={handleSaveTask}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 8,
//     width: '80%',
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   taskItem: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   taskText: {
//     fontSize: 16,
//   },
//   switchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   customTaskInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   customTaskInput: {
//     flex: 1,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginRight: 10,
//     paddingHorizontal: 10,
//   },
//   addButton: {
//     backgroundColor: '#007AFF',
//     padding: 10,
//     borderRadius: 5,
//   },
//   addButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//   },
//   closeButton: {
//     marginTop: 20,
//   },
//   closeButtonText: {
//     fontSize: 18,
//     color: '#007AFF',
//   },
//   taskDetailsContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '80%',
//   },
//   categoryText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   input: {
//     width: '100%', // or specify a fixed width that suits your design
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonSpace: {
//     width: 10, // Adjust width for spacing
//   },
// });

// export default AddTaskScreen;
// AddTaskScreen.js

// Import necessary modules
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from '@react-native-community/datetimepicker';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddTaskScreen = ({ navigation, route }) => {
  // State variables
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [customTaskName, setCustomTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date()); // Default to current date
  const [endDate, setEndDate] = useState(new Date()); // Default to current date for end date
  const [startTime, setStartTime] = useState(new Date()); // Default to current time for start time
  const [endTime, setEndTime] = useState(new Date()); // Default to current time for end time
  const [showStartDatePicker, setShowStartDatePicker] = useState(false); // State to control start date picker visibility
  const [showEndDatePicker, setShowEndDatePicker] = useState(false); // State to control end date picker visibility
  const [showStartTimePicker, setShowStartTimePicker] = useState(false); // State to control start time picker visibility
  const [showEndTimePicker, setShowEndTimePicker] = useState(false); // State to control end time picker visibility

  // Function to handle creating the task
  // Function to handle creating the task
  const handleCreateTask = () => {
    // Ensure that both start and end dates and times are selected
    if (!startDate || !endDate || !startTime || !endTime) {
      Alert.alert('Error', 'Please select start and end dates along with their times.');
      return;
    }

    // Ensure that end date is not before start date
    if (endDate < startDate || (endDate.getTime() === startDate.getTime() && endTime < startTime)) {
      Alert.alert('Error', 'End date and time cannot be before start date and time.');
      return;
    }

    // Create task object
    let taskData;
    if (endDate.getTime() === startDate.getTime()) {
      // If start date and end date are the same, display task only for that date
      taskData = {
        category: selectedCategory,
        name: selectedTask,
        startTime: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes()),
        endTime: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes()),
        description: description
      };
    } else {
      // If start date and end date are different, display task for each date in the range
      taskData = {
        category: selectedCategory,
        name: selectedTask,
        startTime: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes()),
        endTime: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes()),
        description: description
      };
    }
    sendData()
      

    // navigation.navigate('Home', { newTask: taskData });

    // Navigate to CalendarScreen and pass task data
    // navigation.navigate('Calendar', { taskData: taskData });
  };

  const sendData = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token)
    const data = {
      categoryName: selectedCategory,
      taskName: selectedTask,
      description: description,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      token: token, 
    };
  
    axios.post('http://192.168.114.96:5001/task/createTask', data)
      .then((res) => {
        console.log("TASK CREATED");
        navigation.navigate('Home');
        setSelectedCategory("");
        setSelectedTask("");
        setDescription("");
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // Effect hook to update selected category
  useEffect(() => {
    if (route.params && route.params.selectedCategory) {
      setSelectedCategory(route.params.selectedCategory);
    }
  }, [route.params]);

  // Effect hook to update tasks based on selected category
  useEffect(() => {
    switch (selectedCategory) {
      case 'Academics/Profession':
        setTasks(['Homework/Assignments', 'Exams/Tests', 'Study Sessions', 'Projects', 'Custom']);
        break;
      case 'Personal':
        setTasks(['Fitness/Health', 'Career/Internship', 'Personal Tasks', 'Custom']);
        break;
      case 'Social':
        setTasks(['Extracurricular Activities', 'Meetings', 'Social Events', 'Custom']);
        break;
      case 'General':
        setTasks(['Reminders', 'Travel Plans', 'Sleep/Rest', 'Custom']);
        break;
      default:
        setTasks([]);
    }
  }, [selectedCategory]);

  // Function to handle cancel action
  const handleCancel = () => {
    navigation.goBack();
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedTask('');
  };

  // Function to toggle task picker dropdown
  const togglePicker = () => {
    setSelectedTask(selectedTask === '' ? tasks[0] : ''); // Toggle picker dropdown
  };

  // Function to handle custom task input
  const handleCustomTaskInput = () => {
    if (customTaskName.trim() !== '') {
      setTasks([...tasks.filter(task => task !== 'Custom'), customTaskName, 'Custom']);
      setSelectedTask(customTaskName);
    } else {
      Alert.alert('Error', 'Please enter a valid task name');
    }
  };

  // Function to handle start date change
  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to midnight for comparison

    if (currentDate < today) {
      // Date is in the past
      setShowStartDatePicker(false); // Hide the date picker
      Alert.alert(
        'Invalid Date',
        'Please select the current date or a day in the future.'
      );
    } else {
      // Date is today or in the future
      setShowStartDatePicker(false);
      setStartDate(currentDate);
    }
  };

  // Function to handle end date change
  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to midnight for comparison

    if (currentDate < today) {
      // Date is in the past
      setShowEndDatePicker(false); // Hide the date picker
      Alert.alert(
        'Invalid Date',
        'Please select the current date or a day in the future.'
      );
    } else {
      // Date is today or in the future
      setShowEndDatePicker(false);
      setEndDate(currentDate);
    }
  };

  // Utility function to format date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Function to handle start time change
  const handleStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    const currentDate = new Date(); // Current date
    const selectedDate = startDate; // Selected start date

    // Check if the selected date is today
    if (
      currentDate.getDate() === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    ) {
      // If the selected time is in the past, set it to the current time
      if (currentTime < currentDate) {
        setShowStartTimePicker(false);
        setStartTime(currentDate);
      } else {
        setShowStartTimePicker(false);
        setStartTime(currentTime);
      }
    } else {
      // If the selected date is in the future, allow any time
      setShowStartTimePicker(false);
      setStartTime(currentTime);
    }
  };

  // Function to handle end time change
  const handleEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    const currentDate = new Date();

    if (
      startDate.getDate() === endDate.getDate() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear()
    ) {
      if (currentTime >= startTime) {
        setShowEndTimePicker(false);
        setEndTime(currentTime);
      } else {
        setShowEndTimePicker(false);
        setEndTime(new Date(startTime));
      }
    } else {
      setShowEndTimePicker(false);
      setEndTime(currentTime);
    }
  };



  return (
    

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Add Task</Text>
        </View>

        {/* Category selection */}
        <Text style={styles.subHeading}>Category</Text>
        <View style={styles.filterContainer}>
          {['Academics/Profession', 'Personal', 'Social', 'General'].map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filter,
                selectedCategory === category && styles.selectedFilter,
                index === tasks.length - 1 && { marginBottom: 20 }
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={[styles.filterText, selectedCategory === category && styles.selectedFilterText]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Task selection */}
        <Text style={styles.taskHeading}>Task</Text>
        <TouchableOpacity style={styles.pickerContainer} onPress={togglePicker}>
          <Picker
            selectedValue={selectedTask}
            onValueChange={(itemValue) => setSelectedTask(itemValue)}
            style={styles.picker}
            enabled={selectedTask !== ''} // Disable picker when selectedTask is empty
          >
            {tasks.map((task, index) => (
              <Picker.Item key={index} label={task} value={task} />
            ))}
          </Picker>
          <Icon name="angle-down" size={20} color="white" style={styles.dropdownIcon} />
        </TouchableOpacity>

        {/* Custom task input */}
        {selectedTask === 'Custom' && (
          <View style={styles.customInputContainer}>
            <TextInput
              style={styles.customInput}
              placeholder="Enter custom task name"
              value={customTaskName}
              onChangeText={(text) => setCustomTaskName(text)}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleCustomTaskInput}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Description input */}
        <Text style={styles.descriptionHeading}>Description</Text>
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Enter task description"
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
        </View>

        {/* Date picker */}
        <View style={styles.subHeadingContainer}>
          <Text style={styles.dueDateHeading}>Select Date</Text>
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.startDateContainer}>
            <Text style={styles.cardText}>{startDate ? formatDate(startDate) : 'Select Start Date'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.endDateContainer}>
            <Text style={styles.cardText}>{endDate ? formatDate(endDate) : 'Select End Date'}</Text>
          </TouchableOpacity>
        </View>
        {showStartDatePicker && (
          <DatePicker
            value={startDate}
            mode="date"
            display="default"
            minimumDate={new Date()} // Prevent selection of past dates
            onChange={handleStartDateChange}
          />
        )}
        {showEndDatePicker && (
          <DatePicker
            value={endDate}
            mode="date"
            display="default"
            minimumDate={startDate} // Set minimum date to start date
            onChange={handleEndDateChange}
          />
        )}

        {/* Sub-heading for Select Time */}
        <View style={styles.subHeadingContainer}>
          <Text style={styles.dueDateHeading}>Select Time</Text>
        </View>

        {/* Time pickers */}
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.startDateContainer}>
            <Text style={styles.cardText}>{startTime ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Start Time'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.endDateContainer}>
            <Text style={styles.cardText}>{endTime ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select End Time'}</Text>
          </TouchableOpacity>
        </View>
        {showStartTimePicker && (
          <DatePicker
            value={startTime}
            mode="time"
            display="default"
            onChange={handleStartTimeChange}
          />
        )}
        {showEndTimePicker && (
          <DatePicker
            value={endTime}
            mode="time"
            display="default"
            onChange={handleEndTimeChange}
          />
        )}
        {/* Button to create task */}
        <TouchableOpacity style={styles.createTaskButton} onPress={handleCreateTask}>
          <Text style={styles.createTaskButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  createTaskButton: {
    backgroundColor: '#DDFF94',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  createTaskButtonText: {
    color: 'black',
    fontSize: 18,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 25,
    color: 'white',
    marginLeft: 80,
  },
  cancel: {
    fontSize: 18,
    color: '#A9A9A9',
    marginRight: 10,
  },
  subHeading: {
    fontSize: 20,
    color: 'white',
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginRight: 20,
  },
  filter: {
    backgroundColor: '#333333',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    marginBottom: 20,
  },
  selectedFilter: {
    backgroundColor: '#DDFF94',
  },
  selectedFilterText: {
    color: 'black',
  },
  filterText: {
    color: 'white',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    color: 'white',
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  customInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  customInput: {
    flex: 1,
    backgroundColor: '#333333',
    borderRadius: 20,
    color: 'white',
    paddingHorizontal: 20,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#DDFF94',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: 'black',
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  descriptionInput: {
    backgroundColor: '#333333',
    borderRadius: 20,
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  taskHeading: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
  },
  descriptionHeading: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
  },
  subHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 20,
    marginTop: 20,
  },
  dueDateHeading: {
    fontSize: 20,
    color: 'white',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  startDateContainer: {
    backgroundColor: '#333333',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  endDateContainer: {
    backgroundColor: '#333333',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  cardText: {
    color: 'white',
  },
});


export default AddTaskScreen;




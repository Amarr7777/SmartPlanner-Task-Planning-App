import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from 'react-native-circular-progress';
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setToken } from '../slices/AuthSlice';

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [recentTask, setRecentTask] = useState(undefined);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterDone, setFilterDone] = useState(false);
  const [name, setName] = useState("")
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [taskCategories, setTaskCategories] = useState([
    { name: "Total Tasks", count: 0 },
    { name: "Academics/Profession", count: 0 },
    { name: "Personal", count: 0 },
    { name: "Social", count: 0 },
    { name: "General", count: 0 }
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params && route.params.newTask) {
      // Convert startTime to a serializable format (string representation of the date)
      const newTask = {
        ...route.params.newTask,
        startTime: route.params.newTask.startTime.getTime() // Convert Date to milliseconds since Unix epoch
      };


      // setTasks(prevTasks => [newTask, ...prevTasks]);
      setRecentTask(newTask);

      // Update total tasks count
      setTaskCategories(categories => {
        const newCategories = [...categories];
        newCategories[0].count++;
        return newCategories;
      });

      // Update category-specific tasks count
      const categoryIndex = taskCategories.findIndex(category => category.name === newTask.category);
      if (categoryIndex !== -1) {
        setTaskCategories(categories => {
          const newCategories = [...categories];
          newCategories[categoryIndex].count++;
          return newCategories;
        });
      }
    }
  }, [route.params]);

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    const taskToMove = { ...updatedTasks[index] }; // Create a copy of the task

    // Toggle the completion status of the task
    taskToMove.completed = !taskToMove.completed;

    // Update the task in the array
    updatedTasks[index] = taskToMove;

    // Recalculate the completion percentage
    const completedTaskCount = updatedTasks.filter(task => task.completed).length;
    const totalTaskCount = updatedTasks.length;
    const newCompletionPercentage = totalTaskCount === 0 ? 0 : (completedTaskCount / totalTaskCount) * 100;

    // Update the state with the new task list and completion percentage
    setTasks(updatedTasks);
    setCompletionPercentage(newCompletionPercentage);
  };

  const handleTaskPress = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  const deleteTask = () => {
    const updatedTasks = tasks.filter(task => task !== selectedTask);
    setTasks(updatedTasks);
    closeModal();
  };

  const applyFilter = () => {
    setFilterDone(!filterDone);
    // Toggle the sorting order based on completion status
    setTasks(prevTasks => {
      return [...prevTasks].sort((a, b) => {
        if (a.completed !== b.completed) {
          // If completion status is different, sort by completion status
          return filterDone ? (a.completed ? -1 : 1) : (a.completed ? 1 : -1);
        } else {
          // If completion status is same, maintain the existing order
          return 0;
        }
      });
    });
  };

  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    await axios.post("http://10.4.202.224:5001/user/getUser", { token }).then(res => {
      console.log("GET DATA", res.data.data.tasks)
      dispatch(setToken({ data: res.data.data }));
      setName(res.data.data.name)
      setTasks(res.data.data.tasks);
    })
  }

  useEffect(() => {
    getData()
  }, [])

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handlePandoraPress = () => {
    navigation.navigate('Pandora'); 
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', borderTopWidth: 0, paddingHorizontal: 30, paddingTop: 80 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <View>
          <Text style={{ color: 'white', fontSize: 24 }}>Hey {name} 🙋‍♂️</Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Notification bell icon pressed")} style={{ paddingHorizontal: 8, paddingTop: 30 }}>
          <FontAwesomeIcon icon={faBell} size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ borderWidth: 1, borderColor: 'black', marginBottom: 20 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 10, marginBottom: 20 }}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: '#DDFF94', width: 150, height: 170, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>My Tasks</Text>
            <CircularProgress
              size={50}
              width={6}
              fill={completionPercentage}
              tintColor="blue" // Color when progress is filled
              backgroundColor="white" // Color when progress is not filled
            >
              {() => (
                <Text style={{ color: 'black', fontSize: 15 }}>{Math.round(completionPercentage)}%</Text>
              )}
            </CircularProgress>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#9F7AF9', width: 150, height: 170, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Review Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#FB83F7', width: 150, height: 170, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }} onPress={handlePandoraPress}>
            <Text style={{ color: 'white', fontSize: 18 }}>Pandora</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>Recent Tasks</Text>
        <TouchableOpacity onPress={applyFilter} style={{ paddingHorizontal: 8, marginTop: 10 }}>
          <FontAwesomeIcon icon={faSort} size={20} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {tasks.map((task, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: '#292929',
              width: '97%',
              height: 100,
              borderRadius: 10,
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginBottom: 10,
              marginTop: 10,
              marginHorizontal: 5,
              borderColor: '#DDFF94', borderWidth: 1,
              margin: 10, padding: 10
            }}
            onPress={() => console.log(task.endDate)}
          >
            <View style={{ flexDirection: 'row-reverse' }}>
              <View>

                <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', textDecorationLine: task.completed ? 'line-through' : 'none' }}>{task.description}</Text>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: '200', textDecorationLine: task.completed ? 'line-through' : 'none' }}>{task.categoryName}</Text>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: '200', textDecorationLine: task.completed ? 'line-through' : 'none' }}>{task.taskName}</Text>
                {/* <View style={{ backgroundColor: '#FFD700', padding: 5, borderRadius: 5 }}>
                  <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{formatDate(task.endDate)}</Text>
                </View> */}
              </View>
              <TouchableOpacity onPress={() => toggleTaskCompletion(index)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <View style={[styles.radioButton, { backgroundColor: task.completed ? '#DDFF94' : '#292929' }]} />
                {/* <Text style={{ color: 'white', marginLeft: 5 }}>{task.completed ? 'Mark as Undone' : 'Mark as Done'}</Text> */}
              </TouchableOpacity>
            </View>

          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {taskCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={styles.modalText}>{category.name} ({category.count})</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  categoryItem: {
    padding: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;

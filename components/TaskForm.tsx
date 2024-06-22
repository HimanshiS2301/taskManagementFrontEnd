import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  TaskForm: { taskId?: string };
  TaskList: undefined;
};

type TaskFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TaskForm'
>;
type TaskFormRouteProp = RouteProp<RootStackParamList, 'TaskForm'>;

const TaskForm = ({
  route,
  navigation,
}: {
  route: TaskFormRouteProp;
  navigation: TaskFormNavigationProp;
}) => {
  const { taskId } = route.params ?? {};
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(
            `http://192.168.1.4:5000/tasks/${taskId}`,
          );
          const { title, description } = response.data;
          setTitle(title);
          setDescription(description);
        } catch (error) {
          console.error('Error fetching task details:', error);
        }
      };

      fetchTask();
    }
  }, [taskId]);

  const handleSubmit = async () => {
    try {
      if (taskId) {
        // Update existing task
        await axios.put(`http://192.168.1.4:5000/tasks/${taskId}`, {
          title,
          description,
        });
      } else {
        // Create new task
        await axios.post('http://192.168.1.4:5000/tasks', { title, description });
      }
      navigation.navigate('TaskList');
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default TaskForm;

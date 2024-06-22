import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import TaskItem from './TaskItem';
import axios from 'axios';

type RootStackParamList = {
  TaskForm: { taskId: string };
};

type TaskListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TaskForm'
>;

const TaskList = ({ navigation }: { navigation: TaskListNavigationProp }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://192.168.1.4:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [tasks]);

  const handleEditTask = (taskId: string) => {
    navigation.navigate('TaskForm', { taskId });
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://192.168.1.4:5000/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleCompletion = async (taskId: string) => {
    try {
      const updatedTasks = tasks.map(task =>
        task._id === taskId ? { ...task, completed: !task.completed } : task,
      );
      setTasks(updatedTasks);

      await axios.put(`http://192.168.1.4:5000/tasks/${taskId}`, {
        completed: !tasks.find(task => task._id === taskId)?.completed,
      });
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <FlatList
        data={tasks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onDelete={() => handleDeleteTask(item._id)}
            onEdit={() => handleEditTask(item._id)}
            onToggleCompletion={() => handleToggleCompletion(item._id)}
          />
        )}
      />
    </View>
  );
};

export default TaskList;

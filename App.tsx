import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

export type RootStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList" component={TaskList} />
        <Stack.Screen name="TaskForm" component={TaskForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
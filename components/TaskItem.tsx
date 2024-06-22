import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

type TaskItemProps = {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
  onToggleCompletion: () => void;
};

const TaskItem = ({
  task,
  onDelete,
  onEdit,
  onToggleCompletion,
}: TaskItemProps) => {
  return (
    <View style={styles.taskItem}>
      <Text style={styles.title}>{task.title}</Text>
      {task.description && (
        <Text style={styles.description}>{task.description}</Text>
      )}
      <TouchableOpacity style={styles.editbutton} onPress={onEdit}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deletebutton} onPress={onDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          task.completed ? styles.completedButton : styles.uncompletedButton,
        ]}
        onPress={onToggleCompletion}>
        <Text style={styles.buttonText}>
          {task.completed ? 'Mark as Uncompleted' : 'Mark as Completed'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editbutton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  deletebutton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedButton: {
    backgroundColor: '#28a745',
  },
  uncompletedButton: {
    backgroundColor: '#dc3545',
  },
});

export default TaskItem;

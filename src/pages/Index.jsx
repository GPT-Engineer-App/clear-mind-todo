import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, Container, VStack, Text, IconButton } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: input, isCompleted: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Text fontSize="2xl" pb={4}>Todo App</Text>
        <Input
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <Button onClick={handleAddTask} colorScheme="blue">Add Task</Button>
        <List spacing={3} w="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
              <Box>
                <IconButton
                  icon={<FaCheckCircle />}
                  onClick={() => handleToggleComplete(task.id)}
                  colorScheme={task.isCompleted ? 'green' : 'gray'}
                  aria-label="Complete Task"
                  mr={2}
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => handleDeleteTask(task.id)}
                  colorScheme="red"
                  aria-label="Delete Task"
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
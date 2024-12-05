import { readTasksFromFile, writeTasksToFile } from "../utils/fileUtils.js";
import { findTaskById, isValidStatus } from "../utils/taskUtils.js";


const createTask = (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    const tasks = readTasksFromFile();

    const task = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        description,
        status: 'pending',
    };
    tasks.push(task);
    writeTasksToFile(tasks);

    res.status(201).json({ message: 'Task created successfully', task });
};

const getTasks = (req, res) => {
    const tasks = readTasksFromFile();
    res.status(200).json(tasks);
};

const updateTask = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const tasks = readTasksFromFile();
    const task = findTaskById(id,tasks);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    if (!isValidStatus(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    task.status = status;
    writeTasksToFile(tasks);
   res.status(200).json({ message: 'Task updated successfully', task });
};

const deleteTask = (req, res) => {
    const { id } = req.params;

    const tasks = readTasksFromFile();
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(index, 1);
    writeTasksToFile(tasks);

    res.status(200).json({ message: 'Task deleted successfully' });
};

const filterTasksByStatus = (req, res) => {
    const { status } = req.params;

    if (!isValidStatus(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    const tasks = readTasksFromFile();
    const filteredTasks = tasks.filter(task => task.status === status);
    res.status(200).json(filteredTasks);
};

// Exporting all functions
export {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    filterTasksByStatus
};

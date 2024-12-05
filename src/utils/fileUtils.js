import fs from "fs"
import path from "path"

const filePath=path.resolve('data',"tasks.json")


// Read tasks from the JSON file
export const readTasksFromFile = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');    
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading tasks file:', error);
        return [];
    }
};

// Write tasks to the JSON file
export const writeTasksToFile = (tasks) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error writing tasks file:', error);
    }
};
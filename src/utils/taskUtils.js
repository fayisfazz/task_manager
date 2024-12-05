const findTaskById = (id,tasks) => tasks.find(task => task.id === parseInt(id));

const isValidStatus = (status) => ['pending', 'completed'].includes(status);

export {findTaskById,isValidStatus}
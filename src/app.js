import express from "express";
import router from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());
app.use('/tasks',  router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

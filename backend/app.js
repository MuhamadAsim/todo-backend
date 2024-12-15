// import express from 'express';
// import cors from "cors";
// import cookieParser from "cookie-parser";

// const app = express();

// const corsOptions = {
//   origin: 'http://localhost:5173', // Your frontend URL
//   credentials: true, // Allow credentials
// };

// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// import userRouter from "./Routes/User.routes.js";
// import todoRouter from "./Routes/Todo.routes.js";

// // Declare routes
// app.use("/user", userRouter);
// app.use("/todo", todoRouter);

// export { app };


import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


const corsOptions = {
  origin: '*', // Your frontend URL
  credentials: false, // Allow credentials
};


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import userRouter from "./Routes/User.routes.js";
import todoRouter from "./Routes/Todo.routes.js";
import healthRouter from "./Routes/Health.route.js"; // Import health route

// Declare routes
app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.use("/health", healthRouter); // Add health route

export { app };


import connectDB from './Utils/Connect.js';
import { app } from './app.js';
const port = 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });



// app.post('/signup',async (req,res)=>{

//   const { username, email, password } = req.body;

//     try {
//       const existingUser = await User.findOne({ email });
//       if (!existingUser) {
//         const user = new User({ username, email, password });
//         await user.save();
//       } else {
//         console.log("User already exists");
//       }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// })

// app.post('/login',async (req,res)=>{
//   const { username, password } = req.body;
//   const existingUser = await User.findOne({ email });
// })


app.get('/', (req, res) => {
  res.send('Hello World!');
});

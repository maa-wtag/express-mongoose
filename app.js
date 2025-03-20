const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use(express.static("public"));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define a Schema and Model for a User
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number,
// });

// const UserSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: String,
//     age: Number,
//   },
//   {
//     versionKey: false, // this removes the __v field
//     toJSON: {
//       transform: function (doc, ret) {
//         delete ret._id; // if you also want to remove _id from the JSON
//         return ret;
//       },
//     },
//   }
// );

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: Number,
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        // If you only want to remove __v, just leave `_id` intact
        // delete ret._id; // <- Remove or comment out this line
        return ret;
      },
    },
  }
);

const User = mongoose.model("User", UserSchema);

// CREATE operation: Add a new user
// app.post("/users", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     const savedUser = await user.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     res.status(400).json({
//       error: error.message,
//     });
//   }
// });
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    // Sending the Mongoose Document with res.json triggers the `toJSON` transform
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ operation: Retrieve all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// READ operation: Retrieve a single user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// UPDATE operation: Update a user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

// DELETE operation: Remove a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const SECRET = process.env.JWT_SECRET;


const signup = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const userExists = await UserModel.findOne({ username });
        if (userExists) return res.status(400).json({ message: "Username already taken" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPassword, email });
        await newUser.save();
        res.status(201).json({ message: "Signup successful", userId: newUser._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) return res.status(400).json({ message: "User not found" });

        console.log("Password in DB:", user.password);
        console.log("Password entered:", password);

        const isHashed = user.password.startsWith("$2b$") || user.password.startsWith("$2a$");

        let valid = false;
        if (isHashed) {
            valid = await bcrypt.compare(password, user.password);
        } else {
            // fallback for plain text (legacy users)
            valid = password === user.password;
        }

        console.log("Is password valid?", valid);
        if (!valid) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: "7d" });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const updateUserInfo = async (req, res) => {
    const { fullname, email, dob, address, avatar } = req.body;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { fullname, email, dob, address, avatar },
            { new: true }
        );
        res.json({ message: "Info updated", user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const ViewAllUsers = async (_, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const ViewUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const AddUser = async (req, res) => {
    try {
        const { username, password, email, role, fullname, dob, address, avatar } = req.body;

        // Check if the username already exists
        const userExists = await UserModel.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            email,
            role, // Ensure role is included
            fullname,
            dob,
            address,
            avatar,
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", userId: newUser._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const UpdateUser = async (req, res) => {
    try {
        const { username, email, password, role, fullname, dob, address, avatar } = req.body;
        const updateData = { username, email, role, fullname, dob, address, avatar };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json({ message: "User updated", user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const DeleteUser = async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const FindUserByName = async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const users = await UserModel.find({ username: { $regex: keyword, $options: "i" } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//check username exists
// Controller to check if the username exists
const checkUsernameExists = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await UserModel.findOne({ username });

        // If the user exists, return 'exists: true'
        if (user) {
            return res.json({ exists: true });
        }

        // If the user doesn't exist, return 'exists: false'
        res.json({ exists: false });
    } catch (err) {
        console.error('Error checking username:', err);
        res.status(500).json({ message: 'Error checking username' });
    }
};

//check email exists
const checkEmailExists = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await UserModel.findOne({ email });

        // If the user exists, return 'exists: true'
        if (user) {
            return res.json({ exists: true });
        }

        // If the user doesn't exist, returan 'exists: false'
        res.json({ exists: false });
    } catch (err) {
        console.error('Error checking email:', err);
        res.status(500).json({ message: 'Error checking email' });
    }
};
// The controller function for changing the password
const changeUserPassword = async (req, res) => {
    const { password } = req.body; // Get the new password from the request body

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find the user by ID and update their password
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id, // Find the user by ID from the URL parameter
            { password: hashedPassword }, // Set the new hashed password
            { new: true } // Return the updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send success response with the updated user data
        res.json({ message: "Password updated", user: updatedUser });
    } catch (err) {
        // Handle errors, e.g., invalid user, server error
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    signup,
    login,
    updateUserInfo,
    ViewAllUsers,
    ViewUser,
    AddUser,
    UpdateUser,
    DeleteUser,
    FindUserByName,
    checkUsernameExists,
    checkEmailExists,
    changeUserPassword
};

import { User } from '../Models/User.model.js';
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/Apiresponse.js";
import { uploadOnCloudinary } from '../Utils/Cloudinary.js';


//generate Tokken
const generateAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const accessToken = await user.generateAccessToken();
        return accessToken;
    } catch (error) {
        throw new Error("Something went wrong while generating access token");
    }
};


// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (![username, email, password].every(field => field?.trim())) {
        return res.status(400).json({ message: "Some fields are missing" });
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const localpath = req.file?.path;  
    let avatarUrl = null;

    if (localpath) {
        const avatar = await uploadOnCloudinary(localpath);
        avatarUrl = avatar?.url;  
    }

    const user = await User.create({
        username,
        avatar: avatarUrl,
        email,
        password
    });

    const checkUser = await User.findById(user._id).select("-password");

    if (!checkUser) {
        return res.status(500).json({ message: "Some error occurred while registering" });
    }

    res.status(201).json({ message: "User registered successfully", user: checkUser });
});



// Login User
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    const accessToken = await generateAccessToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({
            status: 200,
            message: "User logged in successfully",
            user: loggedInUser,
            accessToken
        });
});



// const logout = asyncHandler(async(req, res) => {
//     // await User.findByIdAndUpdate(
//     //     req.user._id,
//     //     {
//     //         $unset: {
//     //             refreshToken: 1 
//     //         }
//     //     },
//     //     {
//     //         new: true
//     //     }
//     // )

//     const options = {
//         httpOnly: true,
//         secure: true
//     }

//     return res
//     .status(200)
//     .clearCookie("accessToken", options)
//     // .clearCookie("refreshToken", options)
//     .json({message:"user logout successfully"} )
// });


const logout = asyncHandler(async (req, res) => {
    try {
        const options = {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'strict',
        };

        res.clearCookie('accessToken', options);
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export {
    registerUser,
    login,
    logout
}
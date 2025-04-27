const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateRegisterUser, validateLoginUser } = require("../models/User");

/**--------------------------------------------------
 *  @desc   Register a new user
 * @route   /api/auth/register
 * @method  POST
 * access  Public
 ----------------------------------------------------*/
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
    // 1. Validate input
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,  // Specific error message from Joi
        });
    }

    // 2. Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            message: "User already exists",
        });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 4. Create new user and save it to the DB
    user = await User.create({
        username: req.body.username,
        familyName: req.body.familyName,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
    });
    await user.save();
    console.log("✅ User created:", user);



    // 5. Generate a JWT token (optional, but common)
    const token = user.generateAuthToken();
console.log(token);
    // 6. Send response to client
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        },
    });
});

/**--------------------------------------------------
 *  @desc   Login user
 * @route   /api/auth/login
 * @method  POST
 * access  Public
 ----------------------------------------------------*/
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
    // 1. Validate input
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,  // Specific error message from Joi
        });
    }

    // 2. Check if user exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials",
        });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid credentials",
        });
    }

    // 4. Generate JWT token
    const token = user.generateAuthToken();
    console.log(token);
    // 5. Send response to client with the token
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            profilePicture: user.profilePicture, // Assuming you want to send the profile picture URL
        },
    });
});

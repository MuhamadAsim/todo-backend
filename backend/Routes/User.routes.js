import { Router } from "express";
import { registerUser, login, logout } from "../Controllers/User.controller.js";
import { verifyJWT } from "../Middlewares/authorization.middleware.js";
import { upload } from "../Middlewares/Multer.middleware.js";
const router = Router();


//initial routes
router.route("/register").post(upload.single('avatar'), registerUser);

router.route("/login").post(login);

//secured route
router.route("/logout").post(verifyJWT, logout)

export default router;
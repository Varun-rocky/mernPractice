import express from 'express'
import { Register } from '../controllers/userController.js';
import { Login } from '../controllers/userController.js';
import { Logout } from '../controllers/userController.js';
import { bookmark } from '../controllers/userController.js';
import { getMyProfile } from '../controllers/userController.js';
import { getOtherUsers } from '../controllers/userController.js';
import { follow } from '../controllers/userController.js';
import { unfollow } from '../controllers/userController.js';

import isAuthenticated from "../config/auth.js";

const router = express.Router();
router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/logout").get(Logout)
router.route("/bookmark/:id").put(isAuthenticated,bookmark)
router.route("/profile/:id").get(isAuthenticated,getMyProfile)
router.route("/otherusers/:id").get(isAuthenticated,getOtherUsers)
router.route("/follow/:id").post(isAuthenticated,follow)
router.route("/unfollow/:id").post(isAuthenticated,unfollow)

export default router;
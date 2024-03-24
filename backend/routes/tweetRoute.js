import express from "express";
import isAuthenticated from "../config/auth.js";
import { createTweet } from "../controllers/tweetController.js";
import { deleteTweet } from "../controllers/tweetController.js";
import { likeOrDislike } from "../controllers/tweetController.js";
import { getAllTweets } from "../controllers/tweetController.js";
import { getFollowingTweets } from "../controllers/tweetController.js";

const router = express.Router();

router.route("/create").post(isAuthenticated,createTweet);
router.route("/delete/:id").delete(isAuthenticated,deleteTweet);
router.route("/like/:id").put(isAuthenticated,likeOrDislike);
router.route("/alltweets/:id").get(isAuthenticated,getAllTweets)
router.route("/followtweets/:id").get(isAuthenticated,getFollowingTweets)

export default router;
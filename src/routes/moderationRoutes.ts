import { Router } from "express";
import {
    moderatePost,
    flagUser,
    getPostById,
    getUserProfile,
    getFlaggedContentStats,
} from "../controllers/moderationController";

const router: Router = Router();
/**
 * @openapi
 * /post/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     description: Retrieve the post object for the given post id.
 *     tags:
 *       - Moderation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Post ID to retrieve
 *         required: true
 *         schema:
 *           type: string
 *           example: post_123
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Post"
 *       400:
 *         description: Bad request (invalid ID)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/post/:id", getPostById);
/**
 * @openapi
 * /post/{id}/moderate:
 *   post:
 *     summary: Moderate a post by ID
 *     description: Apply moderation action to a post (flag, hide, remove, etc).
 *     tags:
 *       - Moderation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Post ID to moderate
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Moderation options
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 example: "flag"
 *               reason:
 *                 type: string
 *                 example: "Spam"
 *     responses:
 *       200:
 *         description: Post moderated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ModerateResponse"
 *       400:
 *         description: Bad request (invalid input)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post("/post/:id/moderate", moderatePost);
/**
 * @openapi
 * /user/{id}/profile:
 *   get:
 *     summary: Retrieve user profile by ID
 *     tags:
 *       - Moderation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID to retrieve profile for
 *         required: true
 *         schema:
 *           type: string
 *           example: user_456
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserProfile"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/user/:id/profile", getUserProfile);
/**
 * @openapi
 * /content/flags/stats:
 *   get:
 *     summary: Retrieve flagged content statistics
 *     description: Return aggregated statistics about flagged posts and users.
 *     tags:
 *       - Moderation
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Flagged content statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalFlaggedPosts:
 *                   type: integer
 *                   example: 120
 *                 totalFlaggedUsers:
 *                   type: integer
 *                   example: 15
 *                 mostCommonFlagReason:
 *                   type: string
 *                   example: Spam
 *                 flaggedContentByCategory:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                   example:
 *                     spam: 75
 *                     hateSpeech: 30
 *                     inappropriateContent: 15
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/content/flags/stats", getFlaggedContentStats);

export default router;
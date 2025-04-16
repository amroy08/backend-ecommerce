// import express from "express";
// const router = express.Router();
// import {
//   createCategory,
//   updateCategory,
//   removeCategory,
//   listCategory,
//   readCategory,
// } from "../controllers/categoryController.js";

// import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// router.route("/").post(authenticate, authorizeAdmin, createCategory);
// router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);
// router
//   .route("/:categoryId")
//   .delete(authenticate, authorizeAdmin, removeCategory);

// router.route("/categories").get(listCategory);
// router.route("/:id").get(readCategory);

// export default router;

import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// ✅ Specific static routes first
router.route("/list").get(listCategory);         // /api/category/list
router.route("/read/:id").get(readCategory);     // /api/category/read/:id

// ✅ Authenticated routes
router.route("/").post(authenticate, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);
router.route("/:categoryId").delete(authenticate, authorizeAdmin, removeCategory);

export default router;

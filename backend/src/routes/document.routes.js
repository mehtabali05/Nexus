import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../config/multer.js";
import {
  uploadDocument,
  signDocument
} from "../controllers/document.controller.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("document"),
  uploadDocument
);

router.put(
  "/:id/sign",
  protect,
  signDocument
);

export default router;

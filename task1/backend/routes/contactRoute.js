import express from "express";
import { addContact, deleteContact, editContact, getAllContact } from "../controllers/contactController.js";


const router = express.Router();
router.route("/contact").get(getAllContact);
router.route("/addcontact").post(addContact);
router.route("/editcontact").put(editContact);
router.route("/delete").delete(deleteContact);

export default router;
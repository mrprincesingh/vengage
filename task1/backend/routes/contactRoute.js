import express from "express";
import { addContact, deleteContact, editContact, getAllContact } from "../controllers/contactController.js";


const router = express.Router();
router.route("/contact").get(getAllContact);
router.route("/addcontact").post(addContact);
router.route("/editcontact/:id").put(editContact);
router.route("/delete/:id").delete(deleteContact);

export default router;
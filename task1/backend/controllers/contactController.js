import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Contact } from "../model/contactModel.js";
import ErrorHandler from "../utils/errorHandler.js";


export const getAllContact = catchAsyncError(async (req, res, next) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    query = {
      $or: [
        { firstName: { $regex: new RegExp(search, 'i') } },
        { lastName: { $regex: new RegExp(search, 'i') } },
        { email: { $regex: new RegExp(search, 'i') } },
        { phone: { $regex: new RegExp(search, 'i') } },
      ],
    };
  }

  const contacts = await Contact.find(query);

  res.status(200).json({
    success: true,
    contacts,
  });
});

  export const addContact = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone } = req.body;
  
    if (!firstName || !lastName || !email || !phone) {
      return next(new ErrorHandler("All fields are required.", 400));
    }
    const existingEmail = await Contact.findOne({ email });
  if (existingEmail) {
    return next(new ErrorHandler("Email already exists.", 400));
  }

  // Check if the phone number already exists
  const existingPhone = await Contact.findOne({ phone });
  if (existingPhone) {
    return next(new ErrorHandler("Phone number already exists.", 400));
  }
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
    });
  
    const savedContact = await newContact.save();
  
    res.status(201).json({
      success: true,
      contact: savedContact,
    });
  });
  

  export const editContact = catchAsyncError(async (req, res, next) => {
    const { id, firstName, lastName, email, phone } = req.body;
  
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        phone,
      },
      { new: true }
    );
  
    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
  
    res.status(200).json({
      success: true,
      contact: updatedContact,
    });
  });
  
  export const deleteContact = catchAsyncError(async (req, res, next) => {
    const { id } = req.body;
  
    const deletedContact = await Contact.findByIdAndDelete(id);
  
    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
  
    res.status(200).json({
      success: true,
      contact: "Deleted contact",
    });
  });
  
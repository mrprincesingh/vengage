import mongoose from "mongoose";


const schema = new mongoose.Schema({
    firstName:{
        type:String,
        required: [true, "Please enter a  First Name"]
    },
    lastName:{
        type:String,
        required: [true, "Please enter a  Last Name"]
    },
    email:{
        type:String,
        required: [true, "Please enter a  Email Address"]
    },

    phone:{
        type:String,
        required: [true, "Please enter a  Phone Number"]
    }

})


export const Contact = mongoose.model("Contact", schema);
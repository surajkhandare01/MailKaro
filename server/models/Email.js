import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    topic:{
        type:String,
        required:true,
        trim:true
    },
    generatedEmail:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);
const Email =mongoose.model("Email",emailSchema);
export default Email;


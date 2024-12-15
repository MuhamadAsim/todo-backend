import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    toggle: {
        type: Boolean,
        default: false
    }
});

export const Todo = mongoose.model("Todo", todoSchema);

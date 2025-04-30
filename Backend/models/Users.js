import mongoose from "mongoose";

const Users = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    Repos:[{
        type:mongoose.Schema.ObjectId , ref : 'Repo'
    }]
});
const UsersModel = mongoose.model('User',Users);
export { UsersModel };
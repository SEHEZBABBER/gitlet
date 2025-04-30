import express, { json } from "express";
import cors from "cors";
import { ConnectToDb } from "./Config/DataBaseConfig.js";
import { UsersModel } from "./models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { Repo } from "./models/Repos.js";
const app = express();
ConnectToDb();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
function validate(email,password){
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }
    
      if (password.length < 8) {
        return res.status(400).json({ error: "Password is too short (min 8 characters)." });
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return res.status(400).json({ error: "Password must contain at least one special character." });
      } else if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ error: "Password must include an uppercase letter." });
      } else if (!/[a-z]/.test(password)) {
        return res.status(400).json({ error: "Password must include a lowercase letter." });
      } else if (!/[0-9]/.test(password)) {
        return res.status(400).json({ error: "Password must include a number." });
      }
      return 2;
}
function validate_registerd_user(username,email,password){
    if (!email || !password || !username) {
        return res.status(400).json({ error: "Email , password and username are required." });
      }
    
      if (password.length < 8) {
        return res.status(400).json({ error: "Password is too short (min 8 characters)." });
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return res.status(400).json({ error: "Password must contain at least one special character." });
      } else if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ error: "Password must include an uppercase letter." });
      } else if (!/[a-z]/.test(password)) {
        return res.status(400).json({ error: "Password must include a lowercase letter." });
      } else if (!/[0-9]/.test(password)) {
        return res.status(400).json({ error: "Password must include a number." });
      }
      return 2;
}
app.listen(8080,()=>{
    console.log("Listening on port 8080");
});
app.post("/login",async(req,res)=>{
    const { email , password } = req.body;
    if(validate(email,password) === 2){
        // we will be doing authentication here for that we need to get the password from the database
        const UserFromDb = await UsersModel.findOne({email:email});
        if(!UserFromDb)return res.status(400).json({error:"User does not exists"});
        const isPasswordCorrect = await bcrypt.compare(password,UserFromDb.password);
        if(isPasswordCorrect){
            const token = jwt.sign({email:email,username:UserFromDb.username},"MY SUPER SECRET KEY",{expiresIn : "2d"});
            res.cookie("token", token, {
                httpOnly: true, 
                secure: false,  
                sameSite: "strict",
                maxAge: 2 *  24 * 60 * 60 * 1000, 
              });
              return res.status(200).json({ message: "Login successful!" });
        }
        else {
            return res.status(400).json({error : "Incorrect Password"});
        }
    }
    else return validate(email,password);
});
app.post("/register",async(req,res)=>{
    const { email , username , password } = req.body;
    if(validate_registerd_user(email,username,password) === 2){
        // is the mail already registerd
        const checkemail = await UsersModel.findOne({email:email});
        if(checkemail){
            return res.status(400).json({error : "Email has been already registerd Plzz login"})
        }
        // now if email is not already registred we have to save the info in the database no need to hash the password as it will be already hashed
        const hash = await bcrypt.hashSync(password,10);
        const newUser = new UsersModel({username : username,email : email,password : hash , Repos : []});
        await newUser.save();
        // we also have to logge in the user so we will need to save the jwt generated from email in the cookies
        const token = jwt.sign({email:email,usernmae:username},"MY SUPER SECRET KEY",{expiresIn : "2d"});
        res.cookie("token", token, {
            httpOnly: true, 
            secure: false,  
            sameSite: "strict",
            maxAge: 2 *  24 * 60 * 60 * 1000, 
          });
      
          return res.status(200).json({ message: "Registration successful!" });
    }
    else return validate_registerd_user(email,username,password);
});
app.get("/home",(req,res)=>{
    const token = req.cookies.token;
    try{
        jwt.verify(token,"MY SUPER SECRET KEY");
        return res.status(200).json({message:"valid token"});
    }
    catch(err){
        return res.status(400).json({message:"not valid"});
    }
});
app.get("/logout",(req,res)=>{
    res.clearCookie('token');
    return res.status(200).json({message:"Log Out Successful"});
});
import mongoose from 'mongoose';

app.post("/newRepo", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { repoName, description } = req.body;
    const userEmail = jwt.verify(req.cookies.token, "MY SUPER SECRET KEY").email;

    const user = await UsersModel.findOne({ email: userEmail }).session(session);

    // Check for duplicate repo name
    const userReposPopulated = await UsersModel.findOne({ email: userEmail }).populate("Repos").session(session);
    const alreadyExists = userReposPopulated.Repos.some(r => r.name === repoName);
    if (alreadyExists) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Repo with this name already exists" });
    }

    // Create new repo
    const newRepo = new Repo({
      owner: userEmail,
      name: repoName,
      description: description
    });

    await newRepo.save({ session });

    // Update user's repo list
    user.Repos.push(newRepo._id);
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Data saved successfully" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction failed:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.get('/getrepos',async(req,res)=>{
  const userEmail = jwt.verify(req.cookies.token,"MY SUPER SECRET KEY").email;
  const user = await UsersModel.findOne({email : userEmail}).populate("Repos");
  return res.status(200).json({message:user.Repos});
});
app.get('/getusername',async(req,res)=>{
  const username = jwt.verify(req.cookies.token,"MY SUPER SECRET KEY").username;
  return res.status(200).json({username:username});
})
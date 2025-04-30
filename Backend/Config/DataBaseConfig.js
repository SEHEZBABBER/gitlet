import mongoose from "mongoose";
async function ConnectToDb() {
    await mongoose.connect("mongodb+srv://Sehez3010:SHER1005@zoomclone.fswdm.mongodb.net/GitletClone?retryWrites=true&w=majority&appName=ZoomClone")
    .then(()=>console.log("Db Connected"))
    .catch(()=>console.log("Conenction Failed"));
}
export { ConnectToDb };
import mongoose from "../config/database";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        index: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    createdAt: Number,
    updatedAt: Number,
}, 
{
    timestamps: { currentTime: () => Math.floor(Date.now()) }
});

UserSchema.method('toJson', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    return obj;
});

const User = mongoose.model("User", UserSchema);
export default User;

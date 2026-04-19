import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        phone: { type: String, default: "" },
        address: { type: String, default: "" },
    },
    {
        timestamps: true,
    },
);

// --- SỬA LẠI: So sánh trực tiếp chữ thường, KHÔNG dùng bcrypt nữa ---
userSchema.methods.matchPassword = async function (enteredPassword) {
    return enteredPassword === this.password;
};

// --- XÓA BỎ HOẶC KHÓA (COMMENT) TOÀN BỘ ĐOẠN PRE-SAVE ĐI ---
/*
userSchema.pre('save', async function (next) {
  // Không băm biếc gì nữa cả
});
*/

const User = mongoose.model("User", userSchema);
export default User;

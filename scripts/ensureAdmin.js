/**
 * ensureAdmin.js
 * Run once: node scripts/ensureAdmin.js
 * Ensures yashhmakwana@gmail.com exists as admin with the given password.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: String,
    email:    { type: String, unique: true },
    password: String,
    role:     { type: String, default: 'user' }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function main() {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yashHotel';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB:', uri);

    const email    = 'yashhmakwana@gmail.com';
    const password = 'adminpassword123';
    const hashed   = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
        { email },
        { $set: { username: 'yashhmakwana', password: hashed, role: 'admin' } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('Admin account ensured:');
    console.log('   Email   :', user.email);
    console.log('   Username:', user.username);
    console.log('   Role    :', user.role);
    console.log('\nYou can now log in with:');
    console.log('   Email   : yashhmakwana@gmail.com');
    console.log('   Password: adminpassword123');

    await mongoose.disconnect();
}

main().catch(err => {
    console.error(' Error:', err.message);
    process.exit(1);
});

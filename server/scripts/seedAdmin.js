const mongoose = require("mongoose");
const config = require("../config");
const Admin = require("../models/Admin");

const run = async () => {
  await mongoose.connect(config.mongoUri);

  const name = process.env.ADMIN_NAME || "Super Admin";
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const role = process.env.ADMIN_ROLE || "Admin";

  if (!email || !password) {
    console.error("❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in server/.env");
    process.exit(1);
  }

  const existing = await Admin.findOne({ email });

  if (existing) {
    console.log(`ℹ️  Admin with email ${email} already exists. Skipping.`);
  } else {
    await Admin.create({ name, email, password, role });
    console.log(`✅ Admin created: ${email} (${role})`);
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

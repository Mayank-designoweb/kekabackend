import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// 🔥 Middleware: Hash password before saving
prisma.$use(async (params, next) => {
  if (params.model === "Admin" && (params.action === "create" || params.action === "update")) {
    const userData = params.args.data;

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
  }

  return next(params);
});

// 🔥 Middleware: Soft delete (prevent hard delete)
prisma.$use(async (params, next) => {
  if (params.model === "User" && params.action === "delete") {
    params.action = "update";
    params.args.data = { deletedAt: new Date() };
  }

  return next(params);
});

export default prisma; // ✅ Export the configured Prisma instance

require("dotenv/config");
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL must be set to run the seed script.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {

    const password = bcrypt.hashSync("admin123", 10);

    const userSeed = await prisma.user.create({
        data: {
            email: "admin@mail.com",
            name: "Admin",
            role: "ADMIN",
            password: password
        }
    })

    console.log({ userSeed });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
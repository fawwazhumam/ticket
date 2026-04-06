const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

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
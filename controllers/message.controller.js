const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    send: async (author, content, email) => {
        const message = await prisma.messages.create({
            data: {
                author,
                content,
                email,
            },
        });

        return message;
    },
    findAll: async () => {
        const allMessages = await prisma.messages.findMany({});

        console.log(allMessages);
        return allMessages;
    },
};

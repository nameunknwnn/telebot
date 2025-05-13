import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const storeChatId = async (chatId:string) => {
  try {

    const existingGroup = await prisma.group.findUnique({
      where: { chatId },
    });

    // If the chat ID is not found, create a new recordz̧
    if (!existingGroup) {
      await prisma.group.create({
        data: { chatId },
      });
      console.log(`Group with chat ID ${chatId} added.`);
    } else {
      console.log(`Group with chat ID ${chatId} already exists.`);
    }
  } catch (error) {
    console.error('Error storing chat ID:', error);
  }
};

export const getAllChatIds = async () => {
  try {
    const groups = await prisma.group.findMany();
    return groups.map((group: { chatId: string; }) => group.chatId);
  } catch (error) {
    console.error('Error fetching chat IDs:', error);
    return [];
  }
};

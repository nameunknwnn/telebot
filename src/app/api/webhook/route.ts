import { NextApiRequest, NextApiResponse } from 'next';
import { storeChatId } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const update = req.body;

    if (update.my_chat_member) {
      const { chat, new_chat_member } = update.my_chat_member;

      // Only store chat ID if the bot was added to the group
      if (new_chat_member.status === 'member' || new_chat_member.status === 'administrator') {
        const chatId = chat.id;

        // Store the chat ID in the database
        await storeChatId(chatId);
        return res.status(200).send('Chat ID stored');
      }
    }

    return res.status(200).send('No chat member update');
  } else {
    return res.status(405).send('Method Not Allowed');
  }
}
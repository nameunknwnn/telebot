// pages/api/sendAnnouncement.js

import { getAllChatIds } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function (req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
  const chats = await getAllChatIds();

  for (const chat of chats) {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat.chatId, text: message }),
    });
  }

  res.status(200).json({ status: 'Messages sent' });
}

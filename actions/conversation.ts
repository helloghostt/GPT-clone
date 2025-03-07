"use server";

import db from "@/db";
import { conversation, message } from "@/db/schema";
import { verifySession } from "./sessions";
import { revalidatePath } from "next/cache";
import { BASE_URL, CHAT_ROUTES } from "@/constants/routes";
import { eq } from "drizzle-orm";

export const addMessages = async (
  conversationId: string,
  userContent: string,
  assistantContent: string
) => {
  await db.insert(message).values({
    conversationId,
    content: userContent,
    role: "user",
  });
  await db.insert(message).values({
    conversationId,
    content: assistantContent,
    role: "assistant",
  });
  revalidatePath(`${CHAT_ROUTES.CONVERSATIONS}/${conversationId}`);
};

export const createConversation = async (name: string) => {
  //파라미터로는 대화의 이름 받음
  const session = await verifySession();

  const result = await db
    .insert(conversation)
    .values({ name, userId: session.id })
    .returning();

  revalidatePath(BASE_URL); // 파라미터로 넘어온 경로의 페이지를 재검증해주는 함수
  return result[0]; //대화의 메세지를 저장하고 바로 불러와야하기 때문에
};

export const updateConversation = async (id: string, name: string) => {
  await db
    .update(conversation)
    .set({ name, updatedAt: new Date() })
    .where(eq(conversation.id, id));

  revalidatePath(BASE_URL);
};

export const deleteConversation = async (id: string) => {
  await db.delete(conversation).where(eq(conversation.id, id));

  revalidatePath(BASE_URL);
};

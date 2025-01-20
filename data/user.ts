import { verifySession } from "@/actions/sessions";
import db from "@/db";
import { user } from "@/db/schema";
import { User } from "@/types/db";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const existingUser = await db.query.user.findFirst({
      //유저테이블 조회해서 findFirst 하나의 값만 가져오기
      where: eq(user.email, email), //eq함수를 통해 이메일이 일치하는 유저만
    });

    if (!existingUser) {
      //조회 결과 없으면 null값
      return null;
    }
    return existingUser;
  } catch (error) {
    console.error("error", error);
    throw new Error("문제가 발생했습니다.");
  }
};

export const getConversationByUser = async () => {
  const session = await verifySession();

  const response = await db.query.user.findFirst({
    where: eq(user.id, session.id),
    with: {
      conversations: {
        orderBy: (conversation, { desc }) => [desc(conversation.updatedAt)],
      },
    },
  });
  return response?.conversations || [];
};

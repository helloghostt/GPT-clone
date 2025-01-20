// jwt토큰 생성 및 검증 그리고 쿠키 세팅 및 삭제
"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET 환경 변수가 설정되지 않았습니다.");
}
const encodedKey = new TextEncoder().encode(secretKey); //바이트배열로 변환. jose가 배열형식이 아닌 byte형식으로 받기 때문

type SessionPayload = {
  id: string;
  name: string;
};

export const encrypt = async (payload: SessionPayload) => {
  //서명된JWT로 받아옴
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) //해시 알고리즘 정해주는 메소드
    .setIssuedAt() //JWT 발급시간을 현재로
    .setExpirationTime("1d") //만료시간 하루뒤로 설정
    .sign(encodedKey); //서명된 JWT로 불러옴
};

export const verify = async (session: string | undefined = "") => {
  //검증하고 유효하면 받아오도록
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"], //서명할때와 동일하게
    });
    return payload;
  } catch (error) {
    console.error("Error verifying JWT: ", error);
  }
};

//세션생성
export const createSession = async (payload: SessionPayload) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt(payload);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true, //자바스크립트에서 접근할수 없도록 하는 옵션
    secure: true, //https에서만
    expires: expiresAt, // 쿠키 만료 시간
    sameSite: "lax", //쿠키 저장 방식 strict(동일한 사이트), lax(strict+링크클릭이동), none(모든 크로스 사이트)
    path: "/", //모든 url 경로에 유효하게
  });
};

export const deleteSession = async () => {
  //쿠키 삭제
  const cookieStore = await cookies();
  cookieStore.delete("session");
};

export const verifySession = async () => {
  //쿠키에 있는 사용자session을 검증해서 refresh
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await verify(cookie);

  if (!session?.id) {
    redirect("/login");
  }
  return session;
};

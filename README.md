# Next.js로 만들어본 ChatGPT 클론입니다.

.env파일에 DATABASE_URL, SESSION_SECRET, OPENAI_API_KEY를 넣고 실행하면 됩니다.<br/>
아래에 명령어와 사용한 라이브러리가 있습니다.<br />

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## React19

React19로 업데이트 되면서 useActionState hook, useFormState hook이 추가됨

## Neon PostgreSQL

https://console.neon.tech/<br/>
npm i drizzle-orm @neondatabase/serverless <br/>
npm i -D drizzle-kit

## Shadcn ui

npx shadcn@latest init<br/>
npx shadcn@latest add button<br/>
npx shadcn@latest add card label input

## 타입스크립트를 지원하는 스키마 검증 라이브러리

npm add zod

## 비밀번호 암호화하는 bycryptjs 라이버러리

npm add bcryptjs<br/>
npm add @types/bcryptjs

## 오류 토스트 형태로 띄워주는 react-hot-toast라이브러리

npm add react-hot-toast

## JWT 토큰 관련 jose 라이브러리

npm add jose

## shadcn-ui

npx shadcn@latest add dropdown-menu<br/>
npx shadcn@latest add sheet<br/>
npx shadcn@latest add select <br/>
npx shadcn@latest add avatar<br/>
npx shadcn@latest add textarea<br/>
npx shadcn@latest add dialog<br/>

## 상태관리

npm add zustand

## vercel.ai

npm install ai @ai-sdk/openai

<br/>
<br/>

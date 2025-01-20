"use client"; //이벤트 핸들러를 사용하기 위해 클라이언트 컴포넌트로 변경

import { ChangeEvent, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormCard } from "./FormCard";
import { Submit } from "./Submit";
import { useFormValidate } from "@/hooks/useFormValidate";
import { SignUpSchema } from "@/schemas/auth";
import { TSignUpFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";
import { signUp } from "@/actions/signup";
import { useActionState } from "react";
import toast from "react-hot-toast";

export function SignUpForm() {
  const [error, action] = useActionState(signUp, undefined);
  const { errors, validateField } =
    useFormValidate<TSignUpFormError>(SignUpSchema);
  // 회원 유효성 검증 로직
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <FormCard
      title="회원가입"
      footer={{ label: "이미 계정이 있으신가요?", href: "/login" }}
    >
      <form action={action} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            type="name"
            placeholder="이름을 입력해주세요"
            error={!!errors?.name}
            onChange={handleChange}
          />
          {errors?.name && <FormMessage message={errors?.name[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            error={!!errors?.email}
            onChange={handleChange}
          ></Input>
          {errors?.email && <FormMessage message={errors?.email[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            error={!!errors?.password}
            onChange={handleChange}
          ></Input>
          {errors?.password && <FormMessage message={errors?.password[0]} />}
        </div>
        <Submit className="w-full">가입하기 </Submit>
      </form>
    </FormCard>
  );
}

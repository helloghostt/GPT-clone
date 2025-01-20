import { useState } from "react";
import { ZodObject, ZodRawShape } from "zod";

export function useFormValidate<T>(schema: ZodObject<ZodRawShape>) {
  const [errors, setErrors] = useState<Partial<T>>(); //파셜타입 모든 필드가 선택적, 각 필드를 에러정의를 따로 하지않고 필요한 필드의 에러만 유연하게 관리.

  const validateField = (name: string, value: string) => {
    setErrors({
      ...errors,
      [name]: undefined, //유효하게 쓰면 다시 초기화해서 경고메시지가 사라지는
    });
    const parsedValue = schema.pick({ [name]: true }).safeParse({
      [name]: value,
    }); //true는 해당필드만 가져옴

    if (!parsedValue.success) {
      setErrors({
        ...errors,
        ...parsedValue.error.flatten().fieldErrors,
      });
    }
  };

  // 전체 폼 검증을 위한 함수 추가
  const validateForm = (data: Record<string, any>) => {
    const result = schema.safeParse(data);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as Partial<T>);
      return false;
    }
    return true;
  };

  return { errors, validateField, validateForm };
}

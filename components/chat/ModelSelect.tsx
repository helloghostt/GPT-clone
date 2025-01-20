"use client";

import { useModelStore } from "@/store/model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const MODELS = ["gpt-3.5-turbo", "gpt-4", "gpt-4o"];

export function ModelSelect() {
  // Zustand에서 필요한 값만 선택
  const currentModel = useModelStore((state) => state.model);
  const updateModel = useModelStore((state) => state.updateModel);

  const handleChange = (selectModel: string) => {
    if (currentModel !== selectModel) {
      updateModel(selectModel);
    }
  };

  return (
    <Select value={currentModel} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] text-xl border-none focus:ring-transparent">
        <SelectValue> {currentModel || "모델선택"} </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {MODELS.map((model) => (
          <SelectItem
            key={model}
            value={model}
            disabled={currentModel === model}
          >
            {model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

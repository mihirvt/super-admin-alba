import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface CreditAmountInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CreditAmountInput: React.FC<CreditAmountInputProps> = ({ value, onChange, placeholder }) => {
  const handleIncrement = () => {
    const numValue = parseFloat(value);
    onChange(String(isNaN(numValue) ? 1 : numValue + 1));
  };

  const handleDecrement = () => {
    const numValue = parseFloat(value);
    onChange(String(isNaN(numValue) || numValue <= 0 ? 0 : numValue - 1));
  };

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" onClick={handleDecrement} className="h-8 w-8 shrink-0">
        <Minus className="h-4 w-4" />
        <span className="sr-only">Decrease amount</span>
      </Button>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <Button variant="outline" size="icon" onClick={handleIncrement} className="h-8 w-8 shrink-0">
        <Plus className="h-4 w-4" />
        <span className="sr-only">Increase amount</span>
      </Button>
    </div>
  );
};

export default CreditAmountInput;
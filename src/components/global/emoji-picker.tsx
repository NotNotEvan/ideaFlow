"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface EmojiPickerProps {
  children: React.ReactNode;
  getValue?: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ children, getValue }) => {
  const [open, setOpen] = useState(false);
  const Picker = dynamic(() => import("emoji-picker-react"));

  const onEmojiClick = (selectedEmoji: any) => {
    if (getValue) {
      getValue(selectedEmoji.emoji);
    }
    setOpen(false);
  };

  const togglePopover = () => {
    setOpen(!open);
  };
  
  return (
    <div className="flex items-center">
      <Popover open={open}>
        <PopoverTrigger className="cursor-pointer" onClick={togglePopover}>{children}</PopoverTrigger>
        <PopoverContent className="p-0 border-none">
          <Picker onEmojiClick={onEmojiClick} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EmojiPicker;

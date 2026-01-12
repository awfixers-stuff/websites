import React from "react";

import { ArrowRight } from "react-feather";
import { getPostHog } from "@/hooks/usePostHog";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const TallyButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  const handleClick = () => {
    // Track Tally form button clicked
    getPostHog().capture("tally_form_opened");
    onClick?.();
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className="block font-medium rounded shadow px-3 py-2 focus:outline-none bg-gray-100 border-gray-100 text-gray-800 hover:bg-gray-200"
    >
      <div className="flex flex-row justify-center items-center font-semibold">
        <ArrowRight className="mr-1" />
        {children}
      </div>
    </button>
  );
};

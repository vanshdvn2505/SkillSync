"use client"

import React, { useState } from "react";

type FloatingLabelInputProps = {
  label: string;
  type?: string;
  required?: boolean;
};

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  type = "text",
  required = false,
}) => {
  const [value, setValue] = useState("");

  return (
    <div className="relative ">
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="text-accent peer block w-full border-0 border-b border-gray-500 bg-transparent px-2 pb-2 pt-4 text-lg focus:border-blue-500 focus:outline-none"
      />
      {!value && (
        <label
        className="absolute left-2 top-4 text-gray-500 transition-all peer-placeholder-shown:top-10 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary"
      >
        {label}
      </label>
      )}
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all peer-focus:w-full" />
    </div>
  );
};

export default FloatingLabelInput;

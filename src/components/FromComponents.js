import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

export const InputBox = ({
  id,
  value,
  callback,
  type = "text",
  placeholder,
  showLabel = true,
}) => {
  return (
    <>
      {showLabel && (
        <label htmlFor={id} className="capitalize text-lg">
          {id}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder || `Your ${id}`}
        onChange={callback}
        className="w-full rounded-md py-2 px-2 text-black my-2"
      />
    </>
  );
};

export const PasswordInputField = ({ callback, value, id }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <InputBox
        id={id}
        value={value}
        callback={callback}
        type={showPassword ? "text" : "password"}
      />
      <i
        onClick={() => setShowPassword(!showPassword)}
        className="absolute bottom-5 right-4 text-black text-lg"
        aria-label="toggle password visibility"
        role="button"
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </i>
    </>
  );
};

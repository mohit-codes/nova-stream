import { useState } from "react";
import { InputBox, PasswordInputField } from "../components/FromComponents";
import { useAuth } from "../hooks/useAuth";

export const Signup = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupError, setSignupError] = useState("");
  const { emailValidate, signupWithUserCredentials, loading } = useAuth();

  const isPasswordMatched =
    formState.confirmPassword !== "" &&
    formState.confirmPassword === formState.password;

  const checkUserInput =
    formState.name !== "" && formState.email !== "" && isPasswordMatched;

  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    formState.password
  );
  const isEmailValid = emailValidate(formState.email);

  const onChange = ({ target }) =>
    setFormState({ ...formState, [target.id]: target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    setSignupError("");
    if (checkUserInput) {
      if (!isPasswordValid) {
        setSignupError("INVALID_PASSWORD");
        return;
      }
      if (!isEmailValid) {
        setSignupError("INVALID_EMAIL");
        return;
      }
      const [success] = await signupWithUserCredentials(formState);
      !success && setSignupError("SIGNUP_ERROR");
      return;
    }
    setSignupError("EMPTY_FIELDS");
  };

  const showError = () => {
    if (formState.confirmPassword !== "" && !isPasswordMatched) {
      return "Both passwords must match!";
    }
    switch (signupError) {
      case "INVALID_PASSWORD":
        if (!isPasswordValid)
          return "Password must be 8 characters long, have one upper and lower case character and one number.";
        break;
      case "INVALID_EMAIL":
        return "Enter a valid email!";
      case "SIGNUP_ERROR":
        return "Error signing up! Try again.";
      case "EMPTY_FIELDS":
        return "All fields are required. Fill all fields and try again!";
      default:
        return "";
    }
  };

  return (
    <div className="pt-[15vh] flex justify-center items-center">
      <div className="w-[25vw] text-center">
        <form onSubmit={submitHandler} className="w-full text-left">
          <p className="text-3xl font-bold py-5">Signup to Nova Stream</p>
          <p className="text-red-600">{showError()}</p>
          <div className="my-2">
            <InputBox id="name" value={formState.name} callback={onChange} />
          </div>
          <div className="my-2">
            <InputBox id="email" value={formState.email} callback={onChange} />
          </div>
          <div className="my-2 relative">
            <PasswordInputField
              id="password"
              value={formState.password}
              callback={onChange}
            />
          </div>
          <div className="my-2">
            <InputBox
              id="confirmPassword"
              value={formState.confirmPassword}
              callback={onChange}
              type="password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md py-2 bg-white text-black font-bold text-lg mt-5 mb-3"
            disabled={!checkUserInput || loading}
          >
            {loading ? "Signing Up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

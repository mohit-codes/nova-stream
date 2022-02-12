import { useState } from "react";
import { Link } from "react-router-dom";
import { InputBox, PasswordInputField } from "../components/FromComponents";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginWithUserCredentials, loading } = useAuth();

  const emptyInputs = email === "" || password === "";

  const submitHandler = async (e) => {
    e.preventDefault();
    const [res, err] = await loginWithUserCredentials(email, password);
    !res && setError(err);
    return;
  };

  return (
    <div className="pt-[15vh] flex justify-center items-center">
      <div className="w-[25vw] text-center">
        <form onSubmit={submitHandler} className="w-full">
          <p className="text-4xl font-bold py-5">Login to Nova Stream</p>
          {error !== "" && <p className="text-red-600">{error}</p>}
          <div className="text-left">
            <InputBox
              id="email"
              value={email}
              callback={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="text-left relative">
            <PasswordInputField
              id="password"
              value={password}
              callback={({ target }) => setPassword(target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md py-2 bg-white text-black font-bold text-lg mt-5 mb-3"
            disabled={emptyInputs || loading}
          >
            {loading ? "Logging In ..." : "Login"}
          </button>
          <button
            onClick={() => {
              setEmail("test@test.com");
              setPassword("Test@123");
            }}
            className="underline"
          >
            Use test credentials
          </button>
        </form>
        <p className="my-2">
          <Link
            to="/signup"
            className="underline text-xl"
          >{`Don't have an account? Signup`}</Link>
        </p>
      </div>
    </div>
  );
};

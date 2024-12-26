import { LoginForm } from "../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-96 my-[25%] sm:my-0  flex items-center justify-center ">
      <div className="w-25% mt-7 flex flex-col ">
        <h1 className="text-2xl text-center font-extrabold">Login</h1>
        <p className=" text-center mt-1   text-xs text-gray-500">
          Welcome back! Let's take you to your account.
        </p>
        <div className="w-full flex items-center mt-4 mb-4">
          <hr className="flex-grow border-white-400" />
          <span className="mx-2 text-xs text-white-400 opacity-50 ">OR</span>
          <hr className="flex-grow border-white-400" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

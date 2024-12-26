import SignupForm from '../components/forms/SignupForm';

const SignupPage = () => {
    return (
        <div className="min-h-96 my-[20%] sm:my-0 flex items-center justify-center ">
          <div className="flex mt-7  items-center   lg:space-y-0 lg:space-x-12 lg:justify-between">
            <div className="w-25% flex flex-col ">
                  <h1 className="text-2xl text-center font-extrabold">Signup</h1>
                  <p className=" text-center mt-1   text-xs text-gray-500">
                    Create an account to create short Urls,
                    <br /> and be part of our community .
                  </p>
                  <div className="w-full flex items-center mt-4 mb-4">
                    <hr className="flex-grow border-white-400" />
                    <span className="mx-2 text-xs text-white-400 opacity-50 ">
                      OR
                    </span>
                    <hr className="flex-grow border-white-400" />
                  </div>
                  <div className="max-w-100 w-full" style={{ minHeight: "450px" }}>
                    <SignupForm  />
                  </div>
            </div>
          </div>
        </div>
      );
}

export default SignupPage
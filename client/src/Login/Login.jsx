
import axios from "axios";
import { useState } from "react";
import { errorToast, successToast } from "../Toastify/Toast";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Example() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPasswrod] = useState(null);

  const handlePassword = (e) => setPasswrod(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const handleSubmitData = async (e) => {
    e.preventDefault();

    console.log(email, password);
    try {
      const response = await axios.post("http://localhost:4000/api/admin/login",
        { email, password }
      );
      console.log(response, "ress");
      if (response.data) {

        const {  result,token } = response.data
       
        localStorage.setItem('token', token);
        localStorage.setItem('username', result.username);
        localStorage.setItem('id', result._id);
        successToast("logged in");
        navigate("/admin");
      } 
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black-900">
            Login 
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmitData}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-black-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleEmail}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-black-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  onChange={handlePassword}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
              
            </div>
            <div>
           <Link to ="/user/register"><button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register Now
              </button>
            </Link>
            <Link to ="/"><button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3"
              >
                User
              </button>
            </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// import axios from "axios";
// import { useState } from "react";
// import { errorToast, successToast } from "../Toastify/Toast";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import "./sign.css"

// function Login() {

//     const navigate = useNavigate();

//   const [email, setEmail] = useState(null);
//   const [password, setPasswrod] = useState(null);

//   const handlePassword = (e) => setPasswrod(e.target.value);
//   const handleEmail = (e) => setEmail(e.target.value);

//   const handleSubmitData = async (e) => {
//     e.preventDefault();

//     console.log(email, password);
//     try {
//       const response = await axios.post("http://localhost:4000/api/admin/login",
//         { email, password }
//       );
//       console.log(response, "ress");
//       if (response.data) {

//         const {  result,token } = response.data
       
//         localStorage.setItem('token', token);
//         localStorage.setItem('username', result.username);
//         localStorage.setItem('id', result._id);
//         successToast("logged in");
//         navigate("/admin");
//       } 
//     } catch (error) {
//       errorToast(error.response.data.message);
//     }
//   };




//   return (
//     <div className="bg-gray-900 w-screen h-screen flex justify-center items-center">
//       <div className=" w-96 h-auto">
//         <form className="form">
//             <p id="heading">Login</p>
//             <div className="field">
//             <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//             <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
//             </svg>
//               <input autocomplete="off" placeholder="Email" className="input-field bg-transparent" type="email"/>
//             </div>
//             <div className="field">
//             <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//             <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
//             </svg>
//               <input placeholder="Password" className="input-field bg-transparent text-white" type="password"/>
//             </div>
//             <div className="btn">
//             <button className="button1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
//             <button className="button2">Sign Up</button>
//             </div>
//             <button className="button3">Forgot Password</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login
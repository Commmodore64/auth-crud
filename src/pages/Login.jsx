import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "animate.css";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zrpxvlanhalopiyndzvm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycHh2bGFuaGFsb3BpeW5kenZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1NDc0MjMsImV4cCI6MjAwMDEyMzQyM30.V0m48WSpuvUb-_6DnS6r6uvOwNJyT-ByxOfMOuFV6aw";
const supabase = createClient(supabaseUrl, supabaseKey);
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Correo de verificación enviado');

function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
        const { user, error } = await supabase.auth.signUp({
          email: email,
          password: contrasena,
        })
  };
  useEffect(() => {
    const checkSession = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if(user){
          console.log(user.id);
          navigate('/home');
        } else {
          console.log("La sesion no existe");
        }
    }
    checkSession();
    }, []);
  return (
    <div className="h-screen bg-gradient-to-br flex justify-center items-center w-full overflow-hidden">
      <form onSubmit={handleSubmit} className="animate__animated animate__backInUp">
        <div className="bg-[#f5f6f7] px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <div className="space-y-4">
            <h1 className="text-center text-2xl font-semibold text-gray-600">
              Log in
            </h1>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Email
              </label>
              <input
                required
                type="text"
                placeholder="example@email.com"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full text-black border border-gray-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Password
              </label>
              <input
                required
                type="password"
                placeholder="Password"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full text-black border border-gray-500"
                onChange={(e) => setContrasena(e.target.value)}
              />
            </div>
          </div>
          <button onClick={notify} className="mt-4 w-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
            Log in
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default Login;

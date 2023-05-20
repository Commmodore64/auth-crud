import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zrpxvlanhalopiyndzvm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycHh2bGFuaGFsb3BpeW5kenZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1NDc0MjMsImV4cCI6MjAwMDEyMzQyM30.V0m48WSpuvUb-_6DnS6r6uvOwNJyT-ByxOfMOuFV6aw";
const supabase = createClient(supabaseUrl, supabaseKey);
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.success("Correo de verificación enviado");

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        console.log(user);
        const { data, error } = await supabase.from("todo").select("tarea");
      } else {
        console.log("La sesion no existe");
        navigate("/");
      }
    };
    checkSession();
  }, []);
  return (
    <div className="h-screen bg-gradient-to-br flex justify-center items-center w-full overflow-hidden">
      <form className="animate__animated animate__backInUp">
        <div className="bg-[#f5f6f7] px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <div className="space-y-4">
            <h1 className="text-gray-800 font-semibold text-center text-2xl font-mono">
              To Do List
            </h1>
            <div>
              <ul>
                <li>{data.nombre}</li>
              </ul>
            </div>
          </div>
          <button className="mt-auto w-full bg-green-500 font-bold text-lg text-white h-12 rounded-2xl">
            Add task
            <div className="absolute w-full h-full rounded-2xl"></div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;

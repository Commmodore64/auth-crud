import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "animate.css";
import { createClient } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";

const supabaseUrl = "https://zrpxvlanhalopiyndzvm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycHh2bGFuaGFsb3BpeW5kenZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1NDc0MjMsImV4cCI6MjAwMDEyMzQyM30.V0m48WSpuvUb-_6DnS6r6uvOwNJyT-ByxOfMOuFV6aw";
const supabase = createClient(supabaseUrl, supabaseKey);

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const user = supabase.auth.getUser();
      if (user) {
        console.log(user);
        setUserEmail(user.email);
        const { data, error } = await supabase
          .from("todo")
          .select("id, tarea, descripcion");
        if (error) {
          console.log(error);
        } else {
          console.log(data[0].tarea);
          setData(data);
        }
      } else {
        console.log("La sesión no existe");
        navigate("/");
      }
    };
    checkSession();
  }, []);

  const handleDeleteTask = async (taskId) => {
    const { data, error } = await supabase
      .from("todo")
      .delete()
      .eq("id", taskId);
    if (error) {
      console.error(error);
    } else {
      console.log("Tarea eliminada correctamente");
      // Actualizar el estado para reflejar la eliminación de la tarea
      setData(data.filter((task) => task.id !== taskId));
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br flex justify-center items-center w-full overflow-hidden">
      <form className="animate__animated animate__backInUp">
        <div className="bg-[#f5f6f7] px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <Toaster />
          <div className="space-y-4">
            <h1 className="text-gray-800 font-semibold text-center text-2xl font-mono">
              To Do List
            </h1>
            <div>
              {data.map((task) => (
                <div key={task.id} className="bg-gray-300 p-4 my-4 rounded">
                  <h3 className="font-semibold text-gray-800">{task.tarea}</h3>
                  <p className="text-gray-800">{task.descripcion}</p>
                  <button
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Eliminar
                  </button>
                  <NavLink to={`/edit/${task.id}`}>
                    <button className="ml-2 mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg">
                      Editar
                    </button>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
          <NavLink to="/add">
            <button className="mt-auto w-full bg-green-500 font-bold text-lg text-white h-12 rounded-2xl">
              Add task
              <div className="absolute w-full h-full rounded-2xl"></div>
            </button>
          </NavLink>
          <p className="text-gray-800 mt-1.5 font-semibold text-center flex justify-center items-center">{userEmail}</p>
        </div>
      </form>
    </div>
  );
}

export default Home;

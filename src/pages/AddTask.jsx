import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zrpxvlanhalopiyndzvm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycHh2bGFuaGFsb3BpeW5kenZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1NDc0MjMsImV4cCI6MjAwMDEyMzQyM30.V0m48WSpuvUb-_6DnS6r6uvOwNJyT-ByxOfMOuFV6aw";
const supabase = createClient(supabaseUrl, supabaseKey);
import back from "../assets/back-arrow.png";

function AddTask() {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: todo,error } = await supabase
      .from("todo")
      .insert(
        { tarea: task,
          descripcion: description,
        });
      if (error) {
        console.error(error);
      } else {
        // Redirigir a la página "/home" después de agregar la tarea
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br flex justify-center items-center">
      <form className="animate__animated animate__backInUp" onSubmit={handleSubmit}>
        <div className="bg-[#f5f6f7] px-10 py-8 rounded-xl w-screen max-w-sm">
          <div className="absolute left-5 top-7">
            <NavLink to="/home">
              <button>
                <img src={back} alt="back-arrow" className="w-10" />
              </button>
            </NavLink>
          </div>
          <div className="space-y-4">
            <h1 className="text-gray-800 font-semibold text-center text-2xl font-mono">
              Add Task
            </h1>
            <div className="flex justify-center p-1">
              <input
                id="task"
                type="text"
                className="bg-[#f5f6f7] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 m-1 text-gray-800"
                placeholder="Ingrese la tarea"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                className="bg-[#f5f6f7] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 m-2 text-gray-800"
                placeholder="Descripcion"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <button className="mt-auto w-full bg-green-500 font-bold text-lg text-white h-12 rounded-2xl" type="submit">
            Add
            <div className="absolute w-full h-full rounded-2xl"></div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;

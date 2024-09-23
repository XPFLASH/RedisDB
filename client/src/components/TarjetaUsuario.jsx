"use client";
import React, { useState, useEffect } from "react";
import '../styles/tarjetausuario.css';

const TarjetaUsuarios = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/users", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed");
        }

        const data = await res.json();
        setUsers(data.data?.data || []);  // Accedemos a data.data para obtener los usuarios
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <h1 id="h1Tarjeta">Usuarios</h1>
      <div id="tarjetasContainer">
        {users.map((u, index) => (  // Aquí pasamos el índice como segundo argumento
        <div key={index}>
            <div id="divTarjetaUsuarios">
                <div><span>Nombre:</span> {u.name}</div>
                <div><span>Correo:</span> {u.email}</div>
                <div><span>Celular:</span> {u.phone}</div>
            </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default TarjetaUsuarios;

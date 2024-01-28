import mysql from "mysql";
import  express  from "express";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";

const app=express();
app.use(express.json());
app.use(cors());


//conexion a la base de datos

const conexion = mysql.createConnection(
    {
        server:"localhost",
        user:"root",
        password:"",
        database:"Task_Unity",
    }
);


//verificacion

conexion.connect(
    function (error){
        if(error){
            console.log("No fue Posible la conexión");
        }else{
            console.log("Conexión al servidor");
        }

    }
);

// Iniciamos el servidor
app.listen(8081, () => {
    console.log("Servidor iniciado");
  });
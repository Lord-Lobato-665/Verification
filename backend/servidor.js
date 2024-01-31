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

// Consultar todas los recursos
app.get("/obtenerRecursos", (peticion, respuesta) => {
    const sql = "select r.id_recurso,r.nombre_recurso,r.tipo_recurso,r.cantidad_recurso,e.nombre_estado from recursos as r inner join estados as e on r.id_estado_id=e.id_estado";
    conexion.query(sql, (error, resultado) => {
      if (error) return respuesta.json({ mensaje: "Error" });
      return respuesta.json({ Estatus: "Exitoso", contenido: resultado });
    });
  });

  //mostrar todos los proyectos iniciados
  app.get("/obtenerProyectosIniciados", (peticion, respuesta) => {
    const sql = "select p.nombre_proyecto,p.descripcion_proyecto,p.fecha_creacion,e.nombre_estado from proyectos as p inner join estados as e on p.id_estado_id = e.id_estado where e.nombre_estado='Iniciado'";
    conexion.query(sql, (error, resultado) => {
      if (error) return respuesta.json({ mensaje: "Error" });
      return respuesta.json({ Estatus: "Exitoso", contenido: resultado });
    });
  });

   //mostrar todos los proyectos
   app.get("/obtenerProyectos", (peticion, respuesta) => {
    const sql = "select p.nombre_proyecto,p.descripcion_proyecto,p.fecha_creacion,e.nombre_estado from proyectos as p inner join estados as e on p.id_estado_id = e.id_estado";
    conexion.query(sql, (error, resultado) => {
      if (error) return respuesta.json({ mensaje: "Error" });
      return respuesta.json({ Estatus: "Exitoso", contenido: resultado });
    });
  });

  //obtener los estados
  app.get("/obtenerEstados",(peticion,respuesta)=>{
    const sql="select*from estados";
    conexion.query(sql,(error,resultado)=>{
      if(error) return respuesta.json({mensaje:"Error"});
      return respuesta.json({Estatus:"Exitoso",contenido:resultado});
    });
  });

  // Crear un nuevo recurso
app.post(
  "/crearRecurso",
  (peticion, respuesta) => {
    const sql =
      "INSERT INTO recursos (nombre_recurso, tipo_recurso,cantidad_recurso,id_estado_id) VALUES (?, ?, ?,?)";
    const datos = [
      peticion.body.nombre,
      peticion.body.tipo,
      peticion.body.cantidad,
      peticion.body.estado,
    ];
    conexion.query(sql, datos, (error, resultado) => {
      if (error) return respuesta.json({ Estatus: "Error" });
      return respuesta.json({ Estatus: "Exitoso" });
    });
  }
); 

//obtener un recurso por id
app.get("/obtenerRecurso/:id", (peticion, respuesta) => {
  const idCategoria = peticion.params.id;
  const sql = "select r.id_recurso,r.nombre_recurso,r.tipo_recurso,r.cantidad_recurso,e.nombre_estado from recursos as r inner join estados as e on r.id_estado_id=e.id_estado where r.id_recurso=?";
  conexion.query(sql, [idCategoria], (error, resultado) => {
    if (error) return respuesta.json({ Estatus: "Error" });
    if (resultado.length === 0)
      return respuesta.json({
        Estatus: "Error",
        Error: "Categoría no encontrada",
      });
    return respuesta.json({ Estatus: "Exitoso", contenido: resultado[0] });
  });
});

// Editar un recurso existente
app.put("/editarRecurso/:id", (peticion, respuesta) => {
  const idRecurso = peticion.params.id;
  const { nombre, tipo, cantidad, estado} = peticion.body;
  const sql =
    "update recursos set nombre_recurso=?,tipo_recurso=?,cantidad_recurso=?,id_estado_id=? where id_recurso=?";
  conexion.query(
    sql,
    [nombre,tipo,cantidad,estado,idRecurso],
    (error, resultado) => {
      if (error) return respuesta.json({ Estatus: "Error" });
      if (resultado.affectedRows === 0)
        return respuesta.json({
          Estatus: "Error",
          Error: "Recurso no encontrada",
        });
      return respuesta.json({ Estatus: "Exitoso" });
    }
  );
});

//mostrar todas las peticiones
app.get("/mostrarPeticiones",(peticion,respuesta)=>{
  const sql="SELECT p.id_peticion,p.nombre_peticion,p.descripcion_peticion,u.nombre_usuario, e.nombre_estado FROM peticiones AS p INNER JOIN miembros AS m ON p.id_miembro_id = m.id_miembro INNER JOIN estados AS e ON p.id_estado_id = e.id_estado INNER JOIN usuarios AS u ON m.id_usuario_id = u.id_usuario"
conexion.query(
  sql,(error,resultado)=>{
    if(error){
      return respuesta.json({
        Estatus:"Error",
        Error:"No se completo la consulta"
      })
    }else{
      return respuesta.json({
        Estatus:"Exitoso",contenido:resultado
      })

    }
  }
)


})

//aceptar peticion
app.put("/aceptarPeticion/:id" ,(peticion,respuesta)=>{
const idPeticion=peticion.params.id;
const sql="update peticiones set "
})
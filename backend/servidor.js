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


  // Acceso a usuario (login)
app.post("/acceso", (peticion, respuesta) => {
  const sql =
    "SELECT id_usuario, nombre_usuario, correo_electronico, nivel, estatus FROM usuarios WHERE correo_electronico = ? AND contrasenia = ? AND estatus = 1";
  console.log(peticion.body);
  conexion.query(
    sql,
    [peticion.body.correo_electronico, peticion.body.contrasenia],
    (error, resultado) => {
      if (error) return respuesta.json({ mensaje: "Error en la consulta" });
      if (resultado.length > 0) {
        const usuario = resultado[0]; // Obtener los datos del usuario desde el resultado
        const token = jwt.sign({ usuario: "administrador" }, "juan", {
          expiresIn: "1d",
        });
        respuesta.setHeader("Set-Cookie", `token=${token}`); // Agregar la cookie como cabecera de respuesta
        return respuesta.json({
          Estatus: "CORRECTO",
          Usuario: token,
          usuarioId: usuario.id_usuario, // Incluir el ID del usuario en la respuesta
          nivelUsuario: usuario.nivel,
        });
      } else {
        return respuesta.json({
          Estatus: "Error",
          Error: "Usuario o contraseña incorrecta",
        });
      }
    }
  );
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
const sql="update peticiones set id_estado_id=14 where id_peticion=?";
conexion.query(sql,[idPeticion],(error,resultado)=>{
  if(error){
    return respuesta.json({
      Estatus:"Error"
    })
  }else{
    respuesta.json({
      Estatus:"Exitoso",contenido:resultado
    })
  }
})
})

//Rechazar peticion
app.put("/rechazarPeticion/:id" ,(peticion,respuesta)=>{
  const idPeticion=peticion.params.id;
  const sql="update peticiones set id_estado_id=13 where id_peticion=?";
  conexion.query(sql,[idPeticion],(error,resultado)=>{
    if(error){
      return respuesta.json({
        Estatus:"Error"
      })
    }else{
      respuesta.json({
        Estatus:"Exitoso",contenido:resultado
      })
    }
  })
  })


//mostrar todos los usuarios 
app.get("/mostrarUsuarios",(peticion,respuesta)=>{
  const sql="select id_usuario,nombre_usuario,correo_usuario from usuarios"
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

//borrar un recurso
  app.delete(
    "/eliminarRecurso/:id",
    (peticion, respuesta) => {
      const sql ="delete from recursos where id_recurso=?";
        const idRecurso = peticion.params.id;
      conexion.query(sql, [idRecurso], (error, resultado) => {
        if (error) return respuesta.json({ Estatus: "Error" });
        return respuesta.json({ Estatus: "Exitoso" });
      });
    }
  ); 


  //mostrar un usuario por id
app.get("/mostrarUsuario/:id",(peticion,respuesta)=>{
  const sql="select nombre_usuario,correo_usuario from usuarios where id_usuario=?"
  const id=peticion.params.id;
conexion.query(
  sql,[id],(error,resultado)=>{
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

// Actualizar un usuario por ID
app.put("/actualizarUsuario/:id", (peticion, respuesta) => {
  const { id } = peticion.params; // Obtiene el ID del usuario desde la URL
  const { nombre_usuario, correo_usuario } = peticion.body; // Obtiene los datos actualizados del usuario desde el cuerpo de la solicitud

  // Define la consulta SQL para actualizar el usuario en la base de datos
  const sql = "UPDATE usuarios SET nombre_usuario = ?, correo_usuario = ? WHERE id_usuario = ?";

  // Ejecuta la consulta SQL con los valores proporcionados
  conexion.query(sql, [nombre_usuario, correo_usuario, id], (error, resultado) => {
    if (error) {
      // Si ocurre un error durante la ejecución de la consulta, devuelve una respuesta de error
      return respuesta.json({
        Estatus: "Error",
        Error: "No se pudo actualizar el usuario"
      });
    } else {
      // Si la actualización es exitosa, devuelve una respuesta de éxito
      return respuesta.json({
        Estatus: "Exitoso",
        Mensaje: "Usuario actualizado con éxito"
      });
    }
  });
});


// Crear un nuevo usuario
app.post("/crearUsuario", (peticion, respuesta) => {
  // Extracción de datos del cuerpo de la petición
  const { nombre_usuario, correo_usuario,contrasena_usuario} = peticion.body;

  // Consulta SQL para insertar un nuevo usuario en la base de datos
  const sql = "INSERT INTO usuarios (nombre_usuario, correo_usuario,contraseña_usuario,id_rol_id) VALUES (?,?,?,1)";

  // Ejecución de la consulta
  conexion.query(sql, [nombre_usuario, correo_usuario,contrasena_usuario], (error, resultado) => {
    if (error) {
      // Manejo de errores durante la inserción
      console.error("Error al insertar un nuevo usuario: ", error);
      return respuesta.json({
        Estatus: "Error",
        Error: "No se pudo crear el usuario"
      });
    } else {
      // Respuesta exitosa con el ID del nuevo usuario
      return respuesta.json({
        Estatus: "Exitoso",
        Mensaje: "Usuario creado con éxito",
        idUsuarioCreado: resultado.insertId // Devuelve el ID del usuario recién creado
      });
    }
  });
});


// Eliminar un usuario existente
app.delete("/eliminarUsuario/:id", (peticion, respuesta) => {
  // Extracción del id del usuario desde los parámetros de la ruta
  const { id } = peticion.params;

  // Consulta SQL para eliminar un usuario de la base de datos
  const sql = "DELETE FROM usuarios WHERE id_usuario = ?";

  // Ejecución de la consulta
  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      // Manejo de errores durante la eliminación
      console.error("Error al eliminar el usuario: ", error);
      return respuesta.json({
        Estatus: "Error",
        Error: "No se pudo eliminar el usuario"
      });
    } else if (resultado.affectedRows === 0) {
      // Caso en el que no se encuentra el usuario a eliminar
      return respuesta.json({
        Estatus: "Error",
        Error: "Usuario no encontrado o ya fue eliminado"
      });
    } else {
      // Respuesta exitosa indicando la eliminación del usuario
      return respuesta.json({
        Estatus: "Exitoso",
        Mensaje: "Usuario eliminado con éxito"
      });
    }
  });
});




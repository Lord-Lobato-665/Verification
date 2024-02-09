import mysql from "mysql";
import express from "express";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";
import fs from "fs";
import htttps from "https";
import { Console, log } from "console";

const app = express();
app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["Authorization"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//conexion a la base de datos

const conexion = mysql.createConnection({
  server: "localhost",
  user: "root",
  password: "",
  database: "Task_Unity",
});

//verificacion
conexion.connect(function (error) {
  if (error) {
    console.log("No fue Posible la conexión");
  } else {
    console.log("Conexión al servidor");
  }
});

// Iniciamos el servidor
app.listen(8081, () => {
  console.log("Servidor iniciado");
});

// Login API endpoint
app.post("/login", (req, res) => {
  const { correo_usuario, contrasena_usuario } = req.body;

  // Check if user exists and get their password hash and role
  conexion.query(
    "SELECT id_usuario, contraseña_usuario, id_rol_id FROM usuarios WHERE correo_usuario = ?",
    [correo_usuario],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }

      if (results.length === 0) {
        return res.status(401).send("Credentials are not valid");
      }

      const user = results[0];

      // Compare the password hash
      bcrypt.compare(
        contrasena_usuario,
        user.contraseña_usuario,
        (err, isMatch) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Server error");
          }

          if (!isMatch) {
            return res.status(401).send("Credentials are not valid");
          }

          // Determine the redirect path based on the user's role
          let path;
          switch (user.id_rol_id) {
            case 1:
              path = "/home";
              break;
            case 2:
              path = "/user";
              break;
            case 3:
              path = "/Admin";
              break;
            default:
              return res.status(401).send("Invalid user role");
          }

          // Generate JWT token with role information
          const token = jsonwebtoken.sign(
            { id: user.id_usuario, role: user.id_rol_id },
            "yourSecretKey",
            { expiresIn: "1h" }
          );
    



          // Send the token and the path to the client
          res.json({ token, path });
        }
      );
    }
  );
});




 


// Ruta para cualquier usuario autenticado
app.get("/rutaUsuario", verificarToken, (req, res) => {
  // Lógica de la ruta para cualquier usuario autenticado
}); 

app.post("/register", (req, res) => {
  // Obtén los datos del usuario desde el cuerpo de la solicitud
  const { nombre_usuario, correo_usuario, contrasena_usuario } = req.body;

  // Genera el hash de la contraseña
  const saltRounds = 10; // Puedes ajustar la cantidad de rondas de sal
  bcrypt.hash(contrasena_usuario, saltRounds, function (err, hash) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al crear el hash de la contraseña");
    }

    // Aquí ya tienes el hash de la contraseña y puedes proceder a guardarla en la base de datos
    conexion.query(
      "INSERT INTO usuarios (nombre_usuario, correo_usuario, contraseña_usuario,id_rol_id) VALUES (?, ?, ?,1)",
      [nombre_usuario, correo_usuario, hash],
      (err, results) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send("Error al guardar el usuario en la base de datos");
        } else {
          res.json({
            Estatus: "Exitoso",
          });
        }
      }
    );
  });
});

// Consultar todas los recursos
app.get("/obtenerRecursos", (peticion, respuesta) => {
  const sql =
    "select r.id_recurso,r.nombre_recurso,r.tipo_recurso,r.cantidad_recurso,e.nombre_estado from recursos as r inner join estados as e on r.id_estado_id=e.id_estado";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json({ mensaje: "Error" });
    return respuesta.json({ Estatus: "Exitoso", contenido: resultado });
  });
});

//mostrar todos los proyectos iniciados
app.get("/obtenerProyectosIniciados", (peticion, respuesta) => {
  const sql =
    "select p.nombre_proyecto,p.descripcion_proyecto,p.fecha_creacion,e.nombre_estado from proyectos as p inner join estados as e on p.id_estado_id = e.id_estado where e.nombre_estado='Iniciado'";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json({ mensaje: "Error" });
    return respuesta.json({ Estatus: "Exitoso", contenido: resultado });
  });
});

//mostrar todos los proyectos
app.get("/obtenerProyectos", (peticion, respuesta) => {
  const sql =
    "select p.nombre_proyecto,p.descripcion_proyecto,p.fecha_creacion,e.nombre_estado from proyectos as p inner join estados as e on p.id_estado_id = e.id_estado";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json({ mensaje: "Error" });
    return respuesta.json({ Estatus: "Exitoso", contenido: resultado });
  });
});

//obtener los estados
app.get("/obtenerEstados", (peticion, respuesta) => {
  const sql = "select*from estados";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json({ mensaje: "Error" });
    return respuesta.json({ Estatus: "Exitoso", contenido: resultado });
  });
});

// Crear un nuevo recurso
app.post("/crearRecurso", (peticion, respuesta) => {
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
});

//obtener un recurso por id
app.get("/obtenerRecurso/:id", (peticion, respuesta) => {
  const idCategoria = peticion.params.id;
  const sql =
    "select r.id_recurso,r.nombre_recurso,r.tipo_recurso,r.cantidad_recurso,e.nombre_estado from recursos as r inner join estados as e on r.id_estado_id=e.id_estado where r.id_recurso=?";
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
  const { nombre, tipo, cantidad, estado } = peticion.body;
  const sql =
    "update recursos set nombre_recurso=?,tipo_recurso=?,cantidad_recurso=?,id_estado_id=? where id_recurso=?";
  conexion.query(
    sql,
    [nombre, tipo, cantidad, estado, idRecurso],
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
app.get("/mostrarPeticiones", (peticion, respuesta) => {
  const sql =
    "SELECT p.id_peticion,p.nombre_peticion,p.descripcion_peticion,u.nombre_usuario, e.nombre_estado FROM peticiones AS p INNER JOIN miembros AS m ON p.id_miembro_id = m.id_miembro INNER JOIN estados AS e ON p.id_estado_id = e.id_estado INNER JOIN usuarios AS u ON m.id_usuario_id = u.id_usuario";
  conexion.query(sql, (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
        Error: "No se completo la consulta",
      });
    } else {
      return respuesta.json({
        Estatus: "Exitoso",
        contenido: resultado,
      });
    }
  });
});

//aceptar peticion
app.put("/aceptarPeticion/:id", (peticion, respuesta) => {
  const idPeticion = peticion.params.id;
  const sql = "update peticiones set id_estado_id=14 where id_peticion=?";
  conexion.query(sql, [idPeticion], (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
      });
    } else {
      respuesta.json({
        Estatus: "Exitoso",
        contenido: resultado,
      });
    }
  });
});

//Rechazar peticion
app.put("/rechazarPeticion/:id", (peticion, respuesta) => {
  const idPeticion = peticion.params.id;
  const sql = "update peticiones set id_estado_id=13 where id_peticion=?";
  conexion.query(sql, [idPeticion], (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
      });
    } else {
      respuesta.json({
        Estatus: "Exitoso",
        contenido: resultado,
      });
    }
  });
});

//mostrar todos los usuarios
app.get("/mostrarUsuarios", (peticion, respuesta) => {
  const sql = "select id_usuario,nombre_usuario,correo_usuario from usuarios";
  conexion.query(sql, (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
        Error: "No se completo la consulta",
      });
    } else {
      return respuesta.json({
        Estatus: "Exitoso",
        contenido: resultado,
      });
    }
  });
});

//borrar un recurso
app.delete("/eliminarRecurso/:id", (peticion, respuesta) => {
  const sql = "delete from recursos where id_recurso=?";
  const idRecurso = peticion.params.id;
  conexion.query(sql, [idRecurso], (error, resultado) => {
    if (error) return respuesta.json({ Estatus: "Error" });
    return respuesta.json({ Estatus: "Exitoso" });
  });
});

//mostrar un usuario por id
app.get("/mostrarUsuario/:id", (peticion, respuesta) => {
  const sql =
    "select nombre_usuario,correo_usuario from usuarios where id_usuario=?";
  const id = peticion.params.id;
  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
        Error: "No se completo la consulta",
      });
    } else {
      return respuesta.json({
        Estatus: "Exitoso",
        contenido: resultado,
      });
    }
  });
});

// Actualizar un usuario por ID
app.put("/actualizarUsuario/:id", (peticion, respuesta) => {
  const { id } = peticion.params; // Obtiene el ID del usuario desde la URL
  const { nombre_usuario, correo_usuario } = peticion.body; // Obtiene los datos actualizados del usuario desde el cuerpo de la solicitud

  // Define la consulta SQL para actualizar el usuario en la base de datos
  const sql =
    "UPDATE usuarios SET nombre_usuario = ?, correo_usuario = ? WHERE id_usuario = ?";

  // Ejecuta la consulta SQL con los valores proporcionados
  conexion.query(
    sql,
    [nombre_usuario, correo_usuario, id],
    (error, resultado) => {
      if (error) {
        // Si ocurre un error durante la ejecución de la consulta, devuelve una respuesta de error
        return respuesta.json({
          Estatus: "Error",
          Error: "No se pudo actualizar el usuario",
        });
      } else {
        // Si la actualización es exitosa, devuelve una respuesta de éxito
        return respuesta.json({
          Estatus: "Exitoso",
          Mensaje: "Usuario actualizado con éxito",
        });
      }
    }
  );
});

// Crear un nuevo usuario
app.post("/crearUsuario", (peticion, respuesta) => {
  // Extracción de datos del cuerpo de la petición
  const { nombre_usuario, correo_usuario, contrasena_usuario } = peticion.body;

  // Consulta SQL para insertar un nuevo usuario en la base de datos
  const sql =
    "INSERT INTO usuarios (nombre_usuario, correo_usuario,contraseña_usuario,id_rol_id) VALUES (?,?,?,1)";

  // Ejecución de la consulta
  conexion.query(
    sql,
    [nombre_usuario, correo_usuario, contrasena_usuario],
    (error, resultado) => {
      if (error) {
        // Manejo de errores durante la inserción
        console.error("Error al insertar un nuevo usuario: ", error);
        return respuesta.json({
          Estatus: "Error",
          Error: "No se pudo crear el usuario",
        });
      } else {
        // Respuesta exitosa con el ID del nuevo usuario
        return respuesta.json({
          Estatus: "Exitoso",
          Mensaje: "Usuario creado con éxito",
          idUsuarioCreado: resultado.insertId, // Devuelve el ID del usuario recién creado
        });
      }
    }
  );
});

// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
  // Acceder al encabezado de autorización
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    // Dividir el encabezado para obtener el token
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    // Guardar el token en la solicitud para su uso posterior
    req.token = bearerToken;
    next();
  } else {
    // Si no hay token, enviar una respuesta de error
    res.sendStatus(403);
  }
}

// Eliminar un usuario existente
app.delete("/eliminarUsuario/:id", (peticion, respuesta) => {
  // Extracción del id del usuario desde los parámetros de la ruta
  const { id } = peticion.params;
 

  // Obtén el ID del usuario autenticado desde el token
  const usuarioAutenticadoId = obtenerIdUsuarioDesdeToken(peticion);
 

  // Verifica si el usuario que intenta eliminar es el mismo que está autenticado
  if (usuarioAutenticadoId == id) {
    console.log("no puedes eliminarte");
    return respuesta.status(403).json({
      Estatus: "Error",
      Error: "No puedes eliminar tu propia cuenta",
    });
  }

  // Consulta SQL para eliminar un usuario de la base de datos
  const sql =
    "DELETE FROM usuarios  WHERE id_usuario = ?  AND (SELECT id_rol_id FROM usuarios WHERE id_usuario = ?) != 3";

  // Ejecución de la consulta
  conexion.query(sql, [id, id], (error, resultado) => {
    if (error) {
      // Manejo de errores durante la eliminación
      console.error("Error al eliminar el usuario: ", error);
      return respuesta.json({
        Estatus: "Error",
        Error: "No se pudo eliminar el usuario",
      });
    } else if (resultado.affectedRows === 0) {
      // Caso en el que no se encuentra el usuario a eliminar
      return respuesta.json({
        Estatus: "Error",
        Error: "Usuario no encontrado o ya fue eliminado",
      });
    } else {
      // Respuesta exitosa indicando la eliminación del usuario
      return respuesta.json({
        Estatus: "Exitoso",
        Mensaje: "Usuario eliminado con éxito",
      });
    }
  });
});

// Función para obtener el ID de usuario desde el token
function obtenerIdUsuarioDesdeToken(req) {
  console.log("Headers:", req.headers);

  // Verificar si el encabezado "Authorization" está presente en la solicitud
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1]; // Obtén el token desde las cabeceras
    console.log("ENTRO EN MEDIO", token);
    const decoded = jwtDecode(token);
    console.log(decoded.id);
    return decoded.id; // Retorna el ID de usuario desde el token
  } else {
    // Si el encabezado "Authorization" no está presente, devuelve un valor adecuado (por ejemplo, null o -1)
    return null;
  }
}

//mostrar todos los miembros
app.get("/mostrarMiembros", (peticion, respuesta) => {
  const sql =
    "select m.id_miembro,u.nombre_usuario,e.nombre_equipo,r.nombre_rol_equipo,s.nombre_estado from miembros as m inner join usuarios as u on m.id_usuario_id=u.id_usuario inner join equipos as e on m.id_equipo_id=e.id_equipo inner join roles_equipos as r on m.id_rol_equipo_id=r.id_rol_equipo inner join estados as s on m.id_estado_id=s.id_estado where u.asignacion=1 and u.id_rol_id=1";
  conexion.query(sql, (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
        Error: "No se pudo hacer la peticion",
      });
    } else {
      return respuesta.json({
        Estatus: "Exitoso",
        contenido: resultado,
      });
    }
  });
});

// Crear un nuevo miembro
app.post("/crearMiembro", (peticion, respuesta) => {
  // Extracción de datos del cuerpo de la petición
  const { id_usuario, id_equipo } = peticion.body;

  // Consulta SQL para insertar un nuevo miembro en la base de datos
  const sql =
    "insert into miembros (id_usuario_id,id_equipo_id,id_rol_equipo_id,id_estado_id) values (?,?,1,10)";

  // Ejecución de la consulta
  conexion.query(sql, [id_usuario, id_equipo], (error, resultado) => {
    if (error) {
      // Manejo de errores durante la inserción
      console.error("Error al insertar un nuevo usuario: ", error);
      return respuesta.json({
        Estatus: "Error",
        Error: "No se pudo crear el usuario",
      });
    } else {
      // Respuesta exitosa con el ID del nuevo usuario
      return respuesta.json({
        Estatus: "Exitoso",
        Mensaje: "Usuario creado con éxito",
      });
    }
  });
});

// Eliminar un miembro
app.delete("/eliminarMiembro/:id", (peticion, respuesta) => {
  const { id } = peticion.params;
 
  // Consulta SQL para eliminar un usuario de la base de datos
  const sql = "CALL EliminarMiembroYActualizarAsignacion(?)";

  // Ejecución de la consulta
  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      // Manejo de errores durante la eliminación
      console.error("Error al eliminar el usuario: ", error);
      return respuesta.json({
        Estatus: "Error",
        Error: "No se pudo eliminar el usuario",
      });
    } else if (resultado.affectedRows === 0) {
      return respuesta.json({
        Estatus: "Error",
        Error: "Usuario no encontrado o ya fue eliminado",
      });
    } else {
      // Respuesta exitosa indicando la eliminación del usuario
      return respuesta.json({
        Estatus: "Exitoso",
        Mensaje: "Usuario eliminado con éxito",
      });
    }
  });
});

//mostrar todos los proyectos
app.get("/mostrarProyectos", (peticion, respuesta) => {
  const sql =
    "select p.id_proyecto,p.nombre_proyecto,p.descripcion_proyecto,p.fecha_creacion,p.fecha_finalizacion,e.nombre_estado from proyectos as p inner join estados as e on p.id_estado_id=e.id_estado;";
  conexion.query(sql, (error, resultado) => {
    if (error) {
      respuesta.json({
        Estatus: "Error",
      });
    } else {
      respuesta.json({
        Estatus: "Exitoso",
        contenido: resultado,
      });
    }
  });

  //mostrar un proyecto por id
  app.get("/mostrarProyecto/:id", (peticion, respuesta) => {
    const { id } = peticion.params;
    const sql =
      "select p.id_proyecto,p.nombre_proyecto,p.descripcion_proyecto,e.nombre_estado from proyectos as p inner join estados as e on p.id_estado_id=e.id_estado where id_proyecto=?";
    conexion.query(sql, [id], (error, resultado) => {
      if (error) {
        return respuesta.json({
          Estatus: "Error",
          Error: "No se completo la consulta",
        });
      } else {
        return respuesta.json({
          Estatus: "Exitoso",
          contenido: resultado,
        });
      }
    });
  });
});

// Actualizar un proyecto por ID
app.put("/actualizarProyecto/:id", (peticion, respuesta) => {
  const { id } = peticion.params; // Obtiene el ID del usuario desde la URL
  const { nombre_proyecto, descripcion_proyecto, nombre_estado } =
    peticion.body; // Obtiene los datos actualizados del usuario desde el cuerpo de la solicitud

  // Define la consulta SQL para actualizar el usuario en la base de datos
  const sql =
    "UPDATE proyectos SET nombre_proyecto = ?, descripcion_proyecto=?,id_estado_id = ? WHERE id_proyecto= ?";

  // Ejecuta la consulta SQL con los valores proporcionados
  conexion.query(
    sql,
    [nombre_proyecto, descripcion_proyecto, nombre_estado, id],
    (error, resultado) => {
      if (error) {
        // Si ocurre un error durante la ejecución de la consulta, devuelve una respuesta de error
        return respuesta.json({
          Estatus: "Error",
          Error: "No se pudo actualizar el Proyecto",
        });
      } else {
        // Si la actualización es exitosa, devuelve una respuesta de éxito
        return respuesta.json({
          Estatus: "Exitoso",
          Mensaje: "Proyecto actualizado con éxito",
        });
      }
    }
  );
});

// -------------------------------------------------------------------

//mostrar todos los equipos ---------------------------------------------
app.get("/obtenerEquipos", (peticion, respuesta) => {
  const sql =
    "SELECT e.id_equipo, e.especialidad_equipo, p.nombre_proyecto, s.nombre_estado FROM equipos e LEFT JOIN proyectos p ON e.id_proyecto_id = p.id_proyecto LEFT JOIN estados s ON e.id_estado_id = s.id_estado";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json({ mensaje: "Error" });
    return respuesta.json({ Estatus: "Exitoso", contenido: resultado });
  });
});

//mostrar equipos de manera mas reciente ---------------------------------
app.get("/obtenerEquiposInvertido", (peticion, respuesta) => {
  const sql =
    "SELECT e.id_equipo, e.especialidad_equipo, p.nombre_proyecto, s.nombre_estado FROM equipos e LEFT JOIN proyectos p ON e.id_proyecto_id = p.id_proyecto LEFT JOIN estados s ON e.id_estado_id = s.id_estado ORDER BY p.fecha_creacion DESC";

  conexion.query(sql, (error, resultado) => {
    if (error) {
      return respuesta.json({ mensaje: "Error" });
    }
    return respuesta.json({ Estatus: "Exitoso", contenido: resultado });
  });
});

//eliminar equipo --------------------------------------------------------
app.delete("/eliminarEquipo/:id", (peticion, respuesta) => {
  const idEquipo = peticion.params.id;
  const sql = "DELETE FROM equipos WHERE id_equipo = ?";
  conexion.query(sql, [idEquipo], (error, resultado) => {
    if (error) {
      console.error("Error al eliminar el equipo:", error);
      return respuesta
        .status(500)
        .json({ Estatus: "Error", mensaje: "Error interno del servidor" });
    }
    return respuesta.json({
      Estatus: "Exitoso",
      mensaje: "Equipo eliminado exitosamente",
    });
  });
});

//actualizar equipo -----------------------------------------------------
app.post("/actualizarEquipo/:idEquipo", (peticion, respuesta) => {
  const idEquipo = peticion.params.idEquipo;
  const { nombreEquipo, especialidad, idEstado } = peticion.body;

  const sql =
    "UPDATE equipos SET nombre_equipo=?, especialidad_equipo = ?, id_estado_id = ? WHERE id_equipo = ?";

  conexion.query(
    sql,
    [nombreEquipo, especialidad, idEstado, idEquipo],
    (error, resultado) => {
      if (error)
        return respuesta.json({ mensaje: "Error al actualizar el equipo" });
      return respuesta.json({
        Estatus: "Exitoso",
        mensaje: "Equipo actualizado exitosamente",
      });
    }
  );
});

//crear equipo nuevo
app.post("/crearEquipo", (peticion, respuesta) => {
  const { nombre_equipo, especialidad_equipo, id_proyecto } = peticion.body;

  const sql =
    "INSERT INTO equipos (nombre_equipo, especialidad_equipo, id_proyecto_id, id_estado_id) VALUES (?,?,?,6)";

  conexion.query(
    sql,
    [nombre_equipo,especialidad_equipo,id_proyecto],
    (error, resultado) => {
      if (error)
        return respuesta.json({ mensaje: "Error al actualizar el equipo" });
      return respuesta.json({
        Estatus: "Exitoso",
        mensaje: "Equipo creado exitosamente",
      });
    }
  );
});

//Obtener miembros -----------------------------------------------------
app.get("/obtenerMiembros", (peticion, respuesta) => {
  const sql =
    "SELECT m.id_miembro, u.nombre_usuario, e.nombre_equipo, re.nombre_rol_equipo, es.nombre_estado FROM miembros m INNER JOIN usuarios u ON m.id_usuario_id = u.id_usuario INNER JOIN equipos e ON m.id_equipo_id = e.id_equipo INNER JOIN roles_equipos re ON m.id_rol_equipo_id = re.id_rol_equipo INNER JOIN estados es ON m.id_estado_id = es.id_estado";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json({ mensaje: "Error" });
    return respuesta.json({ Estatus: "Exitoso", contenido: resultado });
  });
});

// Eliminar un proyecto
app.delete("/eliminarProyecto/:id", (peticion, respuesta) => {
  // Extracción del id del proyecto desde los parámetros de la ruta
  const { id } = peticion.params;

  // Consulta SQL para eliminar un proyecto de la base de datos
  const sql = "call sp_EliminarProyecto(?)";

  // Ejecución de la consulta
  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      // Manejo de errores durante la eliminación
      console.error("Error al eliminar el proyecto: ", error);
      return respuesta.json({
        Estatus: "Error",
        Error: "No se pudo eliminar el usuario",
      });
    } else if (resultado.affectedRows === 0) {
      // Caso en el que no se encuentra el usuario a eliminar
      return respuesta.json({
        Estatus: "Error",
        Error: "Miembro no encontrado o ya fue eliminado",
      });
    } else {
      // Respuesta exitosa indicando la eliminación del usuario
      return respuesta.json({
        Estatus: "Exitoso",
        Mensaje: "Miembro eliminado con éxito",
      });
    }
  });
});

//actualizar Miembro -----------------------------------------------------
app.post("/actualizarMiembro/:id", (peticion, respuesta) => {
  const id_miembro = peticion.params.id;
  const { nombre_usuario } = peticion.body;

  const sql =
    "update usuarios set nombre_usuario=?  where id_usuario=(select id_usuario_id from miembros where id_miembro=?);";

  conexion.query(sql, [nombre_usuario, id_miembro], (error, resultado) => {
    if (error)
      return respuesta.json({ mensaje: "Error al actualizar el Miembro" });
    return respuesta.json({
      Estatus: "Exitoso",
      mensaje: "Mienmbro actualizado exitosamente",
    });
  });
});

//mostrar un miembro por id
app.get("/mostrarMiembro/:id", (peticion, respuesta) => {
  const { id } = peticion.params;
  const sql =
    "select m.id_miembro,u.nombre_usuario from miembros as m inner join usuarios as u on m.id_usuario_id=u.id_usuario  where id_miembro=?";
  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
        Error: "No se completo la consulta",
      });
    } else {
      return respuesta.json({
        Estatus: "Exitoso",
        contenido: resultado,
      });
    }
  });
});

app.post("/crearProyecto", (peticion, respuesta) => {
  // Extraer los datos del cuerpo de la petición
  const { nombre_proyecto, descripcion_proyecto, id_usuario_id, id_estado_id } =
    peticion.body;

  // Definir la llamada al procedimiento almacenado con los parámetros
  const sql = "CALL sp_CrearProyecto(?, ?, ?, ?)";

  // Los datos a pasar al procedimiento almacenado
  const datos = [
    nombre_proyecto,
    descripcion_proyecto,
    id_usuario_id,
    id_estado_id,
  ];

  // Ejecutar la llamada al procedimiento almacenado
  conexion.query(sql, datos, (error, resultado) => {
    if (error) {
      // Manejar el error
      respuesta.json({ Estatus: "Error", mensaje: error.message });
    } else {
      // Enviar la respuesta exitosa
      respuesta.json({ Estatus: "Exitoso", contenido: resultado });
    }
  });
});

//mostrar usuarios dignos de ser lider de proyectos
app.get("/obtenerUsuariosDignos", (peticion, respuesta) => {
  const sql =
    "select id_usuario, nombre_usuario from usuarios where asignacion IS null and id_rol_id=1";
  conexion.query(sql, (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
      });
    } else {
      return respuesta.json({
        Estatus: "Exitoso",
        contenido: resultado,
      });
    }
  });
});

//mostrar equipos del lider del proyecto
app.get("/obtenerEquiposLider/:id", (peticion, respuesta) => {
  const idUser = peticion.params.id;
  const sql =
    "select e.id_equipo,e.nombre_equipo,e.especialidad_equipo,e.id_proyecto_id,s.nombre_estado from equipos as e inner join proyectos as p on e.id_proyecto_id=p.id_proyecto inner join usuarios as u on u.id_usuario=p.id_usuario_id inner join estados as s on e.id_estado_id=s.id_estado where p.id_usuario_id=?";
  conexion.query(sql, [idUser], (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
      });
    } else {
      return respuesta.json({
        Estatus: "Exitoso",
        contenido: resultado,
      });
    }
  });
});

//mostrar proyecto del lider del proyecto
app.get("/obtenerProyectoLider/:id", (peticion, respuesta) => {
  const idUser = peticion.params.id;
  const sql = "select *from proyectos where id_usuario_id =?";
  conexion.query(sql, [idUser], (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
      });
    } else {
      return respuesta.json({
        Estatus: "Exitoso",
        contenido: resultado,
      });
    }
  });
});

//mostrar tareas si rol es 1 y asignacion es 1
app.get("/obtenerTareasMiembro/:id", (peticion, respuesta) => {
  const idUser = peticion.params.id;
  const sql = "select asignacion,id_rol_id from usuarios where id_usuario=?";
  conexion.query(sql, [idUser], (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
        Menssaje: "Error al consultar el rol y la asignacion",
      });
    }
    const pertenece = resultado[0].asignacion;
    const rol = resultado[0].id_rol_id;
    if (pertenece === 1 && rol === 1) {
      const sql =
        "select t.id_tarea,t.nombre_tarea,t.descripcion_tarea,es.nombre_estado from tareas as t inner join estados as es on t.id_estado_id=es.id_estado inner join miembros as m on t.id_miembro_id=m.id_miembro inner join usuarios as u on m.id_usuario_id=u.id_usuario where m.id_usuario_id=?";
      conexion.query(sql, [idUser], (er, res) => {
        if (er) {
          return respuesta.json({
            Estatus: "Error",
            Mensaje: "Error al buscar las tareas",
          });
        } else {
          respuesta.json({
            Estatus: "Exitoso",
            contenido: res,
          });
        }
      });
    }
  });
});

//mostrar miembros por equipo usando el id del equipo como parámetro
app.get("/obtenerMiembrosPorEquipo/:idEquipo", (peticion, respuesta) => {
  const idEquipo = peticion.params.idEquipo;

  const sql =
    "SELECT m.id_miembro, u.nombre_usuario, e.nombre_equipo, re.nombre_rol_equipo, es.nombre_estado FROM miembros m INNER JOIN usuarios u ON m.id_usuario_id = u.id_usuario INNER JOIN equipos e ON m.id_equipo_id = e.id_equipo INNER JOIN roles_equipos re ON m.id_rol_equipo_id = re.id_rol_equipo INNER JOIN estados es ON m.id_estado_id = es.id_estado WHERE e.id_equipo = ?";

  conexion.query(sql, [idEquipo], (error, resultado) => {
    if (error) return respuesta.json({ mensaje: "Error" });
    return respuesta.json({ Estatus: "Exitoso", contenido: resultado });
  });
});

//crear miembros
app.post("/addMiembro", (peticion, respuesta) => {
  const { id_usuario } = peticion.body;
  const { id_equipo } = peticion.body;
  const { id_rol } = peticion.body;
  const sql =
    "INSERT INTO miembros (id_usuario_id, id_equipo_id, id_estado_id, id_rol_equipo_id) VALUES (?, ?, 12, ?)";
  conexion.query(sql, [id_usuario, id_equipo, id_rol], (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
        Mensaje: "Error al insertar",
      });
    } else {
      return respuesta.json({
        Estatus: "Exitoso",
        contenido: resultado,
      });
    }
  });
});

//crear tareas
app.post("/addTarea", (peticion, respuesta) => {
  const { nombre_tarea } = peticion.body;
  const { descripcion_tarea } = peticion.body;
  const { id_miembro } = peticion.body;
  const sql =
    "INSERT INTO tareas (nombre_tarea, descripcion_tarea, id_miembro_id, id_estado_id) VALUES(?,?,?,12)";
  conexion.query(
    sql,
    [nombre_tarea, descripcion_tarea, id_miembro],
    (error, resultado) => {
      if (error) {
        return respuesta.json({
          Estatus: "Error",
          Mensaje: "Error al insertar",
        });
      } else {
        return respuesta.json({
          Estatus: "Exitoso",
          contenido: resultado,
        });
      }
    }
  );
});

// Enpoints para contar registros

// Consultar todos los recursos
app.get("/recursos", (req, res) => {
  const sql = "SELECT * FROM recursos";
  conexion.query(sql, (error, resultados) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener recursos" });
    }
    return res.status(200).json({ recursos: resultados });
  });
});

// Consultar todos los usuarios
app.get("/usuarios", (req, res) => {
  const sql = "SELECT * FROM usuarios";
  conexion.query(sql, (error, resultados) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener usuarios" });
    }
    return res.status(200).json({ usuarios: resultados });
  });
});

// Consultar todos los proyectos
app.get("/proyectos", (req, res) => {
  const sql = "SELECT * FROM proyectos";
  conexion.query(sql, (error, resultados) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener proyectos" });
    }
    return res.status(200).json({ proyectos: resultados });
  });
});

// Consultar todos los miembros
app.get("/miembros", (req, res) => {
  const sql = "SELECT * FROM miembros";
  conexion.query(sql, (error, resultados) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener miembros" });
    }
    return res.status(200).json({ miembros: resultados });
  });
});

// Consultar todas las peticiones
app.get("/peticiones", (req, res) => {
  const sql = "SELECT * FROM peticiones";
  conexion.query(sql, (error, resultados) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener peticiones" });
    }
    return res.status(200).json({ peticiones: resultados });
  });
});

// marcar tarea como completa
app.post("/marcarTarea/:id", (peticion, respuesta) => {
  // Extracción de datos del cuerpo de la petición
  const { id } = peticion.params;

  // Consulta SQL para insertar un nuevo miembro en la base de datos
  const sql = "update tareas set id_estado_id=8 where id_tarea=?";

  // Ejecución de la consulta
  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      // Manejo de errores durante la inserción
      console.error("Error al insertar un nuevo usuario: ", error);
      return respuesta.json({
        Estatus: "Error",
        Error: "No se pudo crear el usuario",
      });
    } else {
      // Respuesta exitosa con el ID del nuevo usuario
      return respuesta.json({
        Estatus: "Exitoso",
        Mensaje: "Usuario creado con éxito",
      });
    }
  });
});


// marcar tarea como pendiente
app.post("/marcarTareaPendiente/:id", (peticion, respuesta) => {
  // Extracción de datos del cuerpo de la petición
  const { id } = peticion.params;

  // Consulta SQL para insertar un nuevo miembro en la base de datos
  const sql = "update tareas set id_estado_id=12 where id_tarea=?";

  // Ejecución de la consulta
  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      // Manejo de errores durante la inserción
      console.error("Error al insertar un nuevo usuario: ", error);
      return respuesta.json({
        Estatus: "Error",
        Error: "No se pudo crear el usuario",
      });
    } else {
      // Respuesta exitosa con el ID del nuevo usuario
      return respuesta.json({
        Estatus: "Exitoso",
        Mensaje: "Usuario creado con éxito",
      });
    }
  });
});


// agregar peticion
app.post("/addPeticion", (peticion, respuesta) => {
  // Extracción de datos del cuerpo de la petición
  const {nombre_peticion,descripcion_peticion,id_miembro} = peticion.body;

  // Consulta SQL para insertar una peticion
  const sql = "INSERT INTO peticiones (nombre_peticion, descripcion_peticion, id_miembro_id, id_estado_id) VALUES (?,?,?, 13)";

  // Ejecución de la consulta
  conexion.query(sql, [nombre_peticion,descripcion_peticion,id_miembro], (error, resultado) => {
    if (error) {
      // Manejo de errores durante la inserción
      console.error("Error al insertar una peticion: ", error);
      return respuesta.json({
        Estatus: "Error",
        Error: "No se pudo crear la peticion",
      });
    } else {
      // Respuesta exitosa
      return respuesta.json({
        Estatus: "Exitoso",
        Mensaje: "Usuario creado con éxito",
      });
    }
  });
});


// Consultar si esta asignado
app.get("/obtenerAsignacion/:id", (req, res) => {
  const {id}=req.params
  const sql = "select asignacion from usuarios where id_usuario=?";
  conexion.query(sql,[id], (error, resultados) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener peticiones" });
    }
    return res.status(200).json({Estatus:"Exitoso", contenido: resultados });
  });
});

// obtener el id del miembro con el id del usuario
app.get("/obtenerIdMember/:id", (req, res) => {
  const {id}=req.params
  const sql = "select id_miembro from miembros where id_usuario_id=?";
  conexion.query(sql,[id], (error, resultados) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener peticiones" });
    }
    return res.status(200).json({Estatus:"Exitoso", contenido: resultados });
  });
});

// Código de verificación ----------------------------------------------------------------------------------------------------

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'gaelsanchez509@gmail.com',
    pass: 'pfbp viyl dryu avhz',
  },
});

// Ruta para enviar el código de verificación por correo electrónico
app.post("/sendverificationcode", async (req, res) => {
  const { correo_usuario } = req.body;

  // Genera un código de verificación de 6 dígitos
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  // Configura las opciones del correo electrónico
  const mailOptions = {
    from: 'gaelsanchez509@gmail.com',
    to: correo_usuario,
    subject: 'Código de Verificación',
    text: `Tu código de verificación es: ${verificationCode}`,
  };

  try {
    // Envía el correo electrónico con el código de verificación
    await transporter.sendMail(mailOptions);
    res.status(200).send('Código de verificación enviado por correo electrónico.');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).send('Error al enviar el código de verificación por correo electrónico.');
  }
});


app.post('/verify', async (req, res) => {
  const { correo_usuario, contraseña_usuario, codigo_verificacion } = req.body;

  // Verifica si el correo, la contraseña y el código de verificación son válidos
  const sql = `SELECT * FROM usuarios WHERE correo_usuario = ? AND contraseña_usuario = ? AND codigo_verificacion = ?`;
  conexion.query(sql, [correo_usuario, contraseña_usuario, codigo_verificacion], (error, results) => {
    if (error) {
      console.error('Error al verificar las credenciales:', error);
      res.status(500).json({ message: 'Error al verificar las credenciales' });
    } else {
      if (results.length > 0) {
        // Si se encuentra una fila en la tabla usuarios con las credenciales y el código de verificación proporcionados,
        // significa que son válidos
        const token = generateToken(correo_usuario); // Genera un token de autenticación
        res.status(200).json({ token, path: '/dashboard' });
      } else {
        // Si no se encuentra ninguna fila, significa que las credenciales o el código de verificación no son válidos
        res.status(401).json({ message: 'Las credenciales o el código de verificación no son válidos' });
      }
    }
  });
});






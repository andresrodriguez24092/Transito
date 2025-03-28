var mysql = require('mysql');

var myConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Transito'
});

//El servidor WebSocket escucha en el puerto 8080, permitiendo múltiples conexiones simultáneas 
// WebSocket initialization
var SERVER_PORT = 8080;
var WebSocketServer = require('ws').Server;
var myWSS = new WebSocketServer({ port: SERVER_PORT });
var myWSConnections = new Array;

// WebSocket handlers
function wsHandler(client) {
    console.log("WS: New Connection... ");

    // Pushing connection to the connections pool.
    myWSConnections.push(client);

    // When client sends messages
    client.on('message', function(data) {
        console.log("WS: From client: " + data);
        //se tiene una maquina de estados para dezerializar los datos prevenientes del websocket
        i = 0
        cabeza = ""
        while (1) {
            if (data[i] == ",") {
                break
            }
            cabeza = cabeza + data[i]

            i = i + 1
        }
        console.log(cabeza)
        i = i + 1
        dato1 = ""
        while (1) {
            if (data[i] == ",") {
                break
            }
            dato1 = dato1 + data[i]

            i = i + 1
        }
        console.log(dato1)

        dato2 = ""
        i = i + 1
        while (1) {
            if (data[i] == ",") {
                break
            }
            dato2 = dato2 + data[i]

            i = i + 1
        }
        console.log(dato2)
        dato3 = ""
        i = i + 1
        while (1) {
            if (data[i] == ",") {
                break
            }
            dato3 = dato3 + data[i]

            i = i + 1
        }
        console.log(dato3)
        i = i + 1
        dato4 = ""
        while (1) {
            if (data[i] == ",") {
                break
            }
            dato4 = dato4 + data[i]

            i = i + 1
        }
        console.log(dato4)
        i = i + 1
        dato5 = ""
        while (1) {
            if (data[i] == ",") {
                break
            }
            dato5 = dato5 + data[i]

            i = i + 1
        }
        console.log(dato5)


        if (cabeza == "regUsuario") {

            //console.log("registrarusuario")
            myConnect.connect(function(error) {
                if (error) {
                    console.log('ERROR: Cannot connect to database: ' + error.stack);
                }

                console.log('Connected as ' + myConnect.threadId);
                console.log('Connection state: ' + myConnect.state);

                // Inserting data into int_usuarios_tipo
                var myQuery = "SELECT identificacion,tipoUsuario,nombre FROM propietarios WHERE identificacion = " + dato3;
                myConnect.query(myQuery, function(error, result) {
                    if (error) throw error;

                    console.log('Affected rows: ' + result.affectedRows);
                    //console.log('Insert ID: '+result[0].identificacion);
                    if (result[0] == null) {
                        myConnect.connect(function(error) {
                            if (error) {
                                console.log('ERROR: Cannot connect to database: ' + error.stack);
                            }

                            console.log('Connected as ' + myConnect.threadId);
                            console.log('Connection state: ' + myConnect.state);

                            // Inserting data into int_usuarios_tipo
                            var myQuery = "INSERT INTO `propietarios` (`identificacion`, `tipoUsuario`, `nombre`, `direccion`) VALUES ('" + dato3 + "', '" + dato1 + "', '" + dato2 + "', '" + dato4 + "')";
                            myConnect.query(myQuery, function(error, result) {
                                if (error) throw error;

                                console.log('Affected rows: ' + result.affectedRows);
                                console.log('Insert ID: ' + result.insertId);
                                if (myWSConnections.length > 0) {
                                    for (wsConn in myWSConnections) {
                                        myWSConnections[wsConn].send("Registro Existoso");
                                    }

                                }

                            });
                        });


                    } else if (result[0] != null) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("Identificación inválida \n no se realizó el registro");
                            }

                        }
                    }
                });
            });

        }
        if (cabeza == "regVehiculo") {

            myConnect.connect(function(error) {
                if (error) {
                    console.log('ERROR: Cannot connect to database: ' + error.stack);
                }

                console.log('Connected as ' + myConnect.threadId);
                console.log('Connection state: ' + myConnect.state);

                // Inserting data into int_usuarios_tipo
                var myQuery = "SELECT identificacion,tipoUsuario,nombre FROM propietarios WHERE identificacion = " + dato2;
                myConnect.query(myQuery, function(error, result) {
                    if (error) throw error;

                    console.log('Affected rows: ' + result.affectedRows);
                    //console.log('Insert ID: '+result[0].identificacion);
                    if (result[0] != null) {
                        myConnect.connect(function(error) {
                            if (error) {
                                console.log('ERROR: Cannot connect to database: ' + error.stack);
                            }

                            console.log('Connected as ' + myConnect.threadId);
                            console.log('Connection state: ' + myConnect.state);

                            // Inserting data into int_usuarios_tipo
                            var myQuery = "SELECT placa FROM vehiculo WHERE placa = '" + dato1 + "'";
                            myConnect.query(myQuery, function(error, result) {
                                if (error) throw error;

                                console.log('Affected rows: ' + result.affectedRows);
                                //console.log('Insert ID: '+result[0].identificacion);
                                if (result[0] == null) {
                                    myConnect.connect(function(error) {
                                        if (error) {
                                            console.log('ERROR: Cannot connect to database: ' + error.stack);
                                        }

                                        console.log('Connected as ' + myConnect.threadId);
                                        console.log('Connection state: ' + myConnect.state);

                                        // Inserting data into int_usuarios_tipo
                                        var myQuery = "INSERT INTO `vehiculo` (`placa`, `id_usuarios`, `marca`, `fecha_matricula`, `tipoVehiculo`) VALUES ('" + dato1 + "', '" + dato2 + "', '" + dato3 + "', '" + dato5 + "', '" + dato4 + "')";
                                        myConnect.query(myQuery, function(error, result) {
                                            if (error) throw error;

                                            console.log('Affected rows: ' + result.affectedRows);
                                            console.log('Insert ID: ' + result.insertId);
                                            if (myWSConnections.length > 0) {
                                                for (wsConn in myWSConnections) {
                                                    myWSConnections[wsConn].send("Registro Existoso");
                                                }

                                            }

                                        });
                                    });


                                } else if (result[0] != null) {
                                    if (myWSConnections.length > 0) {
                                        for (wsConn in myWSConnections) {
                                            myWSConnections[wsConn].send("Placa inválida \n no se realizó el registro");
                                        }

                                    }
                                }
                            });
                        });


                    } else if (result[0] == null) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("No existe el ID \n no se realizó el registro");
                            }

                        }
                    }
                });
            });
        }
        if (cabeza == "regInfraccion") {
            myConnect.connect(function(error) {
                if (error) {
                    console.log('ERROR: Cannot connect to database: ' + error.stack);
                }

                console.log('Connected as ' + myConnect.threadId);
                console.log('Connection state: ' + myConnect.state);

                // Inserting data into int_usuarios_tipo
                var myQuery = "SELECT placa FROM vehiculo WHERE placa = '" + dato1 + "'";
                myConnect.query(myQuery, function(error, result) {
                    if (error) throw error;

                    console.log('Affected rows: ' + result.affectedRows);
                    //console.log('Insert ID: '+result[0].identificacion);
                    if (result[0] != null) {
                        myConnect.connect(function(error) {
                            if (error) {
                                console.log('ERROR: Cannot connect to database: ' + error.stack);
                            }

                            console.log('Connected as ' + myConnect.threadId);
                            console.log('Connection state: ' + myConnect.state);

                            // Inserting data into int_usuarios_tipo
                            var myQuery = "INSERT INTO `infracciones` (`numeroinfraccion`, `placa_vehiculo`, `registradoPor`, `fecha`) VALUES (NULL, '" + dato1 + "', '" + dato2 + "', '" + dato3 + "')";
                            myConnect.query(myQuery, function(error, result) {
                                if (error) throw error;

                                console.log('Affected rows: ' + result.affectedRows);
                                console.log('Insert ID: ' + result.insertId);
                                if (myWSConnections.length > 0) {
                                    for (wsConn in myWSConnections) {
                                        myWSConnections[wsConn].send("Registro Existoso");
                                    }

                                }

                            });
                        });


                    } else if (result[0] == null) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("No existe la placa \n no se realizó el registro");
                            }

                        }
                    }
                });
            });
        }

        if (cabeza == "getConsultar") {

            myConnect.connect(function(error) {
                if (error) {
                    console.log('ERROR: Cannot connect to database: ' + error.stack);
                }

                console.log('Connected as ' + myConnect.threadId);
                console.log('Connection state: ' + myConnect.state);

                // Inserting data into int_usuarios_tipo
                var myQuery = "SELECT identificacion,tipoUsuario,nombre,direccion FROM propietarios WHERE identificacion = " + dato1;
                myConnect.query(myQuery, function(error, result) {
                    if (error) throw error;

                    console.log('Affected rows: ' + result.affectedRows);
                    //console.log('Insert ID: '+result[0].identificacion);
                    if (result[0] != null) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("El nombre es: " + result[0].nombre + "\nla direccion es: " + result[0].direccion + "\nEl tipo de usuario es: " + result[0].tipoUsuario);
                                //console.log(result[0].nombre);
                            }

                        }


                    } else if (result[0] == null) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("Identificación inválida \n no se realizó la consulta");
                            }

                        }
                    }
                });
            });

        }

        if (cabeza == "actUsuario") {

            //console.log("registrarusuario")
            myConnect.connect(function(error) {
                if (error) {
                    console.log('ERROR: Cannot connect to database: ' + error.stack);
                }

                console.log('Connected as ' + myConnect.threadId);
                console.log('Connection state: ' + myConnect.state);

                // Inserting data into int_usuarios_tipo
                var myQuery = "SELECT identificacion,tipoUsuario,nombre FROM propietarios WHERE identificacion = " + dato3;
                myConnect.query(myQuery, function(error, result) {
                    if (error) throw error;

                    console.log('Affected rows: ' + result.affectedRows);
                    //console.log('Insert ID: '+result[0].identificacion);
                    if (result[0] != null) {
                        myConnect.connect(function(error) {
                            if (error) {
                                console.log('ERROR: Cannot connect to database: ' + error.stack);
                            }

                            console.log('Connected as ' + myConnect.threadId);
                            console.log('Connection state: ' + myConnect.state);

                            // Inserting data into int_usuarios_tipo
                            var myQuery = "UPDATE `propietarios` SET `tipoUsuario` = '" + dato1 + "', `nombre` = '" + dato2 + "', `direccion` = '" + dato4 + "' WHERE `propietarios`.`identificacion` = " + dato3;
                            myConnect.query(myQuery, function(error, result) {
                                if (error) throw error;

                                console.log('Affected rows: ' + result.affectedRows);
                                console.log('Insert ID: ' + result.insertId);
                                if (myWSConnections.length > 0) {
                                    for (wsConn in myWSConnections) {
                                        myWSConnections[wsConn].send("Registro Existoso");
                                    }

                                }

                            });
                        });


                    } else if (result[0] == null) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("Identificación no existente \n no se realizó el registro");
                            }

                        }
                    }
                });
            });


            console.log("actualizar usuario")

        }
        if (cabeza == "actVehiculo") {

            myConnect.connect(function(error) {
                if (error) {
                    console.log('ERROR: Cannot connect to database: ' + error.stack);
                }

                console.log('Connected as ' + myConnect.threadId);
                console.log('Connection state: ' + myConnect.state);

                // Inserting data into int_usuarios_tipo
                var myQuery = "SELECT identificacion,tipoUsuario,nombre FROM propietarios WHERE identificacion = " + dato2;
                myConnect.query(myQuery, function(error, result) {
                    if (error) throw error;

                    console.log('Affected rows: ' + result.affectedRows);
                    //console.log('Insert ID: '+result[0].identificacion);
                    if (result[0] != null) {
                        myConnect.connect(function(error) {
                            if (error) {
                                console.log('ERROR: Cannot connect to database: ' + error.stack);
                            }

                            console.log('Connected as ' + myConnect.threadId);
                            console.log('Connection state: ' + myConnect.state);

                            // Inserting data into int_usuarios_tipo
                            var myQuery = "SELECT placa FROM vehiculo WHERE placa = '" + dato1 + "'";
                            myConnect.query(myQuery, function(error, result) {
                                if (error) throw error;

                                console.log('Affected rows: ' + result.affectedRows);
                                //console.log('Insert ID: '+result[0].identificacion);
                                if (result[0] != null) {
                                    myConnect.connect(function(error) {
                                        if (error) {
                                            console.log('ERROR: Cannot connect to database: ' + error.stack);
                                        }

                                        console.log('Connected as ' + myConnect.threadId);
                                        console.log('Connection state: ' + myConnect.state);

                                        // Inserting data into int_usuarios_tipo
                                        var myQuery = "UPDATE `infracciones` SET `registradoPor` = '" + dato2 + "', `fecha` = '" + dato3 + "' WHERE `infracciones`.`placa_vehiculo` = '" + dato1 + "'";
                                        myConnect.query(myQuery, function(error, result) {
                                            if (error) throw error;

                                            console.log('Affected rows: ' + result.affectedRows);
                                            console.log('Insert ID: ' + result.insertId);
                                            if (myWSConnections.length > 0) {
                                                for (wsConn in myWSConnections) {
                                                    myWSConnections[wsConn].send("Registro Existoso");
                                                }

                                            }

                                        });
                                    });


                                } else if (result[0] == null) {
                                    if (myWSConnections.length > 0) {
                                        for (wsConn in myWSConnections) {
                                            myWSConnections[wsConn].send("Placa inexistente \n no se realizó el registro");
                                        }

                                    }
                                }
                            });
                        });


                    } else if (result[0] == null) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("No existe el ID \n no se realizó el registro");
                            }

                        }
                    }
                });
            });
            console.log("actualizar vehiculo")
        }

        if (cabeza == "actInfraccion") {

            myConnect.connect(function(error) {
                if (error) {
                    console.log('ERROR: Cannot connect to database: ' + error.stack);
                }

                console.log('Connected as ' + myConnect.threadId);
                console.log('Connection state: ' + myConnect.state);

                // Inserting data into int_usuarios_tipo
                var myQuery = "SELECT placa FROM vehiculo WHERE placa = '" + dato1 + "'";
                myConnect.query(myQuery, function(error, result) {
                    if (error) throw error;

                    console.log('Affected rows: ' + result.affectedRows);
                    //console.log('Insert ID: '+result[0].identificacion);
                    if (result[0] != null) {
                        myConnect.connect(function(error) {
                            if (error) {
                                console.log('ERROR: Cannot connect to database: ' + error.stack);
                            }

                            console.log('Connected as ' + myConnect.threadId);
                            console.log('Connection state: ' + myConnect.state);

                            // Inserting data into int_usuarios_tipo
                            var myQuery = "UPDATE `infracciones` SET `registradoPor` = '" + dato2 + "', `fecha` = '" + dato3 + "' WHERE `infracciones`.`placa_vehiculo` = '" + dato1 + "'";
                            myConnect.query(myQuery, function(error, result) {
                                if (error) throw error;

                                console.log('Affected rows: ' + result.affectedRows);
                                console.log('Insert ID: ' + result.insertId);
                                if (myWSConnections.length > 0) {
                                    for (wsConn in myWSConnections) {
                                        myWSConnections[wsConn].send("Registro Existoso");
                                    }

                                }

                            });
                        });


                    } else if (result[0] == null) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("Vehiculo no existente \n no se realizó el registro");
                            }

                        }
                    }
                });
            });

            console.log("actualizar infraccion")

        }

        if (cabeza == "getConsultar2") {

            //console.log("borrar usuario")
            myConnect.connect(function(error) {
                if (error) {
                    console.log('ERROR: Cannot connect to database: ' + error.stack);
                }

                console.log('Connected as ' + myConnect.threadId);
                console.log('Connection state: ' + myConnect.state);

                // Inserting data into int_usuarios_tipo
                var myQuery = "SELECT placa,id_usuarios,marca,fecha_matricula,tipoVehiculo FROM vehiculo WHERE placa = '" + dato1 + "'";
                myConnect.query(myQuery, function(error, result) {
                    if (error) throw error;

                    console.log('Affected rows: ' + result.affectedRows);
                    //console.log('Insert ID: '+result[0].identificacion);
                    if (result[0] != null) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("El id usuario es: " + result[0].id_usuarios + "\nla marca es: " + result[0].marca + "\nLa fecha de matricula es: " + result[0].fecha_matricula + "\nEl tipo de vehiculo es: " + result[0].tipoVehiculo);
                                //console.log(result[0].nombre);
                            }

                        }


                    } else if (result[0] == null) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("Placa inválida \n no se realizó la consulta");
                            }

                        }
                    }
                });
            });


        }

        if (cabeza == "getConsultar3") {

            //console.log("borrar usuario")
            myConnect.connect(function(error) {
                if (error) {
                    console.log('ERROR: Cannot connect to database: ' + error.stack);
                }

                console.log('Connected as ' + myConnect.threadId);
                console.log('Connection state: ' + myConnect.state);

                // Inserting data into int_usuarios_tipo
                var myQuery = "SELECT numeroinfraccion,placa_vehiculo,registradoPor,fecha FROM infracciones WHERE numeroinfraccion = '" + dato1 + "'";
                myConnect.query(myQuery, function(error, result) {
                    if (error) throw error;

                    console.log('Affected rows: ' + result.affectedRows);
                    //console.log('Insert ID: '+result[0].identificacion);
                    if (result[0] != null) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("la placa es: " + result[0].placa_vehiculo + "\nMulta registrada por: " + result[0].registradoPor + "\nLa fecha de la multa es: " + result[0].fecha);
                                //console.log(result[0].nombre);
                            }

                        }


                    } else if (result[0] == null) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("Numero de infracción inválido \n no se realizó la consulta");
                            }

                        }
                    }
                });
            });
        }


        if (cabeza == "borrVehiculo") {
            myConnect.connect(function(error) {
                if (error) {
                    console.log('ERROR: Cannot connect to database: ' + error.stack);
                }

                console.log('Connected as ' + myConnect.threadId);
                console.log('Connection state: ' + myConnect.state);

                // Inserting data into int_usuarios_tipo
                var myQuery = "DELETE FROM `infracciones` WHERE `infracciones`.`placa_vehiculo` = '" + dato1 + "'";
                myConnect.query(myQuery, function(error, result) {
                    if (error) throw error;

                    console.log('Affected rows: ' + result.affectedRows);
                    //console.log('Insert ID: '+result[0].identificacion);
                    console.log(result)



                });
                myConnect.connect(function(error) {
                    if (error) {
                        console.log('ERROR: Cannot connect to database: ' + error.stack);
                    }

                    console.log('Connected as ' + myConnect.threadId);
                    console.log('Connection state: ' + myConnect.state);

                    // Inserting data into int_usuarios_tipo
                    var myQuery = "DELETE FROM `vehiculo` WHERE `vehiculo`.`placa` = '" + dato1 + "'";
                    myConnect.query(myQuery, function(error, result) {
                        if (error) throw error;

                        console.log('Affected rows: ' + result.affectedRows);
                        //console.log('Insert ID: '+result[0].identificacion);
                        console.log(result)

                        if (result.affectedRows == 0) {
                            if (myWSConnections.length > 0) {
                                for (wsConn in myWSConnections) {
                                    myWSConnections[wsConn].send("Error de Borrado");
                                }

                            }
                        } else {

                            if (myWSConnections.length > 0) {
                                for (wsConn in myWSConnections) {
                                    myWSConnections[wsConn].send("Borrado exitoso");
                                }

                            }

                        }

                    });



                });


            });




            console.log("borrar vehiculo")
        }
        if (cabeza == "borrInfraccion") {
            myConnect.connect(function(error) {
                if (error) {
                    console.log('ERROR: Cannot connect to database: ' + error.stack);
                }

                console.log('Connected as ' + myConnect.threadId);
                console.log('Connection state: ' + myConnect.state);

                // Inserting data into int_usuarios_tipo
                var myQuery = "DELETE FROM `infracciones` WHERE `infracciones`.`numeroinfraccion` = '" + dato1 + "'";
                myConnect.query(myQuery, function(error, result) {
                    if (error) throw error;

                    console.log('Affected rows: ' + result.affectedRows);
                    //console.log('Insert ID: '+result[0].identificacion);
                    console.log(result)

                    if (result.affectedRows == 0) {
                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("Error de Borrado");
                            }

                        }
                    } else {

                        if (myWSConnections.length > 0) {
                            for (wsConn in myWSConnections) {
                                myWSConnections[wsConn].send("Borrado exitoso");
                            }

                        }

                    }

                });



            });

            console.log("borrar infraccion")
        }





    });

    // When client closes connection
    client.on('close', function() {
        console.log("WS: Connection close");
        var clientPosition = myWSConnections.indexOf(client);
        myWSConnections.splice(clientPosition, 1);
    });
}

// WebSocket events.
myWSS.on('connection', wsHandler);
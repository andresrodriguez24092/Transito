const Propietario = require('../models/Propietario');
const Vehiculo = require('../models/Vehiculo');
const Infraccion = require('../models/Infraccion');


const resolvers = {
    Query: {
        // Propietarios
        propietarios: () => Propietario.obtenerTodos(),
        propietarioPorIdentificacion: (_, { identificacion }) =>
            Propietario.obtenerPorIdentificacion(identificacion),

        // Vehículos
        vehiculos: () => Vehiculo.obtenerTodos(),
        vehiculoPorPlaca: (_, { placa }) => Vehiculo.obtenerPorPlaca(placa),

        // Infracciones
        infracciones: () => Infraccion.obtenerTodos(),
        infraccionPorNumero: (_, { numeroinfraccion }) =>
            Infraccion.obtenerPorNumero(numeroinfraccion),
        infraccionesPorVehiculo: (_, { placa }) =>
            Infraccion.obtenerPorVehiculo(placa)
    },

    Mutation: {
        // Propietarios
        registrarPropietario: (_, args) => Propietario.crear(args),
        actualizarPropietario: (_, { identificacion, ...campos }) =>
            Propietario.actualizar(identificacion, campos),
        eliminarPropietario: (_, { identificacion }) => Propietario.eliminar(identificacion),

        // Vehículos
        registrarVehiculo: (_, args) => Vehiculo.crear(args),
        actualizarVehiculo: (_, { placa, ...campos }) =>
            Vehiculo.actualizar(placa, campos),
        eliminarVehiculo: (_, { placa }) => Vehiculo.eliminar(placa),

        // Infracciones
        registrarInfraccion: (_, args) => Infraccion.crear(args),
        actualizarInfraccion: (_, { numeroinfraccion, ...campos }) =>
            Infraccion.actualizar(numeroinfraccion, campos),
        eliminarInfraccion: (_, { numeroinfraccion }) =>
            Infraccion.eliminar(numeroinfraccion)
    },

    // Resolvers para relaciones
    Propietario: {
        vehiculos: (parent) => Vehiculo.obtenerPorPropietario(parent.identificacion)
    },

    Vehiculo: {
        propietario: (parent) => Propietario.obtenerPorIdentificacion(parent.id_usuarios),
        infracciones: (parent) => Infraccion.obtenerPorVehiculo(parent.placa)
    },

    Infraccion: {
        vehiculo: (parent) => Vehiculo.obtenerPorPlaca(parent.placa_vehiculo)
    }
};

module.exports = resolvers;
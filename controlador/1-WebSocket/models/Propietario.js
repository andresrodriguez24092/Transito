// models/Propietario.js
const pool = require('../db');

class Propietario {
    static async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM propietarios');
        return rows;
    }

    static async obtenerPorIdentificacion(identificacion) {
        const [rows] = await pool.query(
            'SELECT * FROM propietarios WHERE identificacion = ?', [identificacion]
        );
        return rows[0];
    }

    static async crear({ identificacion, tipoUsuario, nombre, direccion }) {
        try {
            const [result] = await pool.query(
                'INSERT INTO propietarios (identificacion, tipoUsuario, nombre, direccion) VALUES (?, ?, ?, ?)', [identificacion, tipoUsuario, nombre, direccion]
            );

            // Verificar que se insertó correctamente
            const [nuevoPropietario] = await pool.query(
                'SELECT * FROM propietarios WHERE identificacion = ?', [identificacion]
            );

            return nuevoPropietario[0];
        } catch (error) {
            console.error('Error al crear propietario:', error);
            throw new Error(error.code === 'ER_DUP_ENTRY' ?
                'Ya existe un propietario con esta identificación' :
                'Error al registrar propietario');
        }
    }

    static async actualizar(identificacion, campos) {
        await pool.query(
            'UPDATE propietarios SET ? WHERE identificacion = ?', [campos, identificacion]
        );
        return this.obtenerPorIdentificacion(identificacion);
    }

    static async eliminar(identificacion) {
        try {
            // Primero verificar si tiene vehículos asociados
            const [vehiculos] = await pool.query(
                'SELECT placa FROM vehiculo WHERE id_usuarios = ?', [identificacion]
            );

            if (vehiculos.length > 0) {
                throw new Error('No se puede eliminar, tiene vehículos asociados');
            }

            const [result] = await pool.query(
                'DELETE FROM propietarios WHERE identificacion = ?', [identificacion]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar propietario:', error);
            throw error;
        }
    }
}

module.exports = Propietario;
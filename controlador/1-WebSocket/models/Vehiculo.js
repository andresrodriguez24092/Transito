const pool = require('../db');

class Vehiculo {
    static async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM vehiculo');
        return rows;
    }

    static async obtenerPorPlaca(placa) {
        const [rows] = await pool.query(
            'SELECT * FROM vehiculo WHERE placa = ?', [placa]
        );
        return rows[0];
    }

    static async obtenerPorPropietario(id_usuarios) {
        const [rows] = await pool.query(
            'SELECT * FROM vehiculo WHERE id_usuarios = ?', [id_usuarios]
        );
        return rows;
    }

    static async crear({ placa, id_usuarios, marca, fecha_matricula, tipoVehiculo }) {
        await pool.query(
            'INSERT INTO vehiculo (placa, id_usuarios, marca, fecha_matricula, tipoVehiculo) VALUES (?, ?, ?, ?, ?)', [placa, id_usuarios, marca, fecha_matricula, tipoVehiculo]
        );
        return { placa, id_usuarios, marca, fecha_matricula, tipoVehiculo };
    }

    static async actualizar(placa, campos) {
        await pool.query(
            'UPDATE vehiculo SET ? WHERE placa = ?', [campos, placa]
        );
        return this.obtenerPorPlaca(placa);
    }

    static async eliminar(placa) {
        // Eliminar primero las infracciones relacionadas
        await pool.query('DELETE FROM infracciones WHERE placa_vehiculo = ?', [placa]);

        const [result] = await pool.query(
            'DELETE FROM vehiculo WHERE placa = ?', [placa]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Vehiculo;
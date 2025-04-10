const pool = require('../db');

class Infraccion {
    static async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM infracciones');
        return rows;
    }

    static async obtenerPorNumero(numeroinfraccion) {
        const [rows] = await pool.query(
            'SELECT * FROM infracciones WHERE numeroinfraccion = ?', [numeroinfraccion]
        );
        return rows[0];
    }

    static async obtenerPorVehiculo(placa_vehiculo) {
        const [rows] = await pool.query(
            'SELECT * FROM infracciones WHERE placa_vehiculo = ?', [placa_vehiculo]
        );
        return rows;
    }

    static async crear({ placa_vehiculo, registradoPor, fecha }) {
        const [result] = await pool.query(
            'INSERT INTO infracciones (placa_vehiculo, registradoPor, fecha) VALUES (?, ?, ?)', [placa_vehiculo, registradoPor, fecha]
        );
        return {
            numeroinfraccion: result.insertId,
            placa_vehiculo,
            registradoPor,
            fecha
        };
    }

    static async actualizar(numeroinfraccion, campos) {
        await pool.query(
            'UPDATE infracciones SET ? WHERE numeroinfraccion = ?', [campos, numeroinfraccion]
        );
        return this.obtenerPorNumero(numeroinfraccion);
    }

    static async eliminar(numeroinfraccion) {
        const [result] = await pool.query(
            'DELETE FROM infracciones WHERE numeroinfraccion = ?', [numeroinfraccion]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Infraccion;
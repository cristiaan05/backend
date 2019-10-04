module.exports = (sequelize, type) => {
    return sequelize.define('solicitude', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
       idEmpleado: {
        type: type.INTEGER,
            references: {
                model: 'empleados',
                key: 'id'
            }
        },
        fecha: type.DATE,
        diasSolicitados:type.INTEGER,
        status:type.STRING,
    },{ timestamps: false });
}
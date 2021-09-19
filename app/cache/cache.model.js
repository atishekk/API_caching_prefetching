const { DataTypes } = require("sequelize")

module.exports =  (sequelize) => {
    const Input = sequelize.define("Input", {
        q: {
            type: DataTypes.TEXT
        },
        source: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        tableName: "Input"
    });
    const Translation = sequelize.define("Translation", {
        response: {
            type: DataTypes.TEXT
        },
        target: {
            type: DataTypes.STRING
        }
    }, {
        tableName: "Translation"
    });
    
    Input.hasMany(Translation, {
        foreignKey: "InputId"
    });
    Translation.belongsTo(Input);

    return { Input, Translation };
};


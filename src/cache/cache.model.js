const { DataTypes } = require("sequelize")

module.exports =  (sequelize) => {
    const Input = sequelize.define("Input", {
        body: {
            type: DataTypes.TEXT
        },
        source_lang: {
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
        dest_lang: {
            type: DataTypes.STRING
        }
    }, {
        tableName: "Translation"
    });
    
    Input.hasMany(Translation);
    Translation.belongsTo(Input);

    return { Input, Translation };
};


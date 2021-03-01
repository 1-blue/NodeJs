const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
        }, {
            //options
            sequelize,
            timestamps: true,
            prarnoid: true,
            underscored: true,
            modelName: "Hashtag",
            tableName: "hashtags",
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci"
        })
    }

    static associate(db){
        db.Hashtag.belongsToMany(db.Post, { foreignKey : "PostId", through : "PostHashtag"})
    }
}
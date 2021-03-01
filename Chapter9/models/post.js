const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
        }, {
            //options
            sequelize,
            timestamps: true,
            prarnoid: true,
            underscored: true,
            modelName: "Post",
            tableName: "posts",
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci"
        })
    }

    static associate(db){
        db.Post.belongsTo(db.User, { foreignKey : "UserId", targetKey: "id"});
        db.Post.belongsToMany(db.Hashtag, { foreignKey : "HashtagId", through : "PostHashtag"})
    }
}
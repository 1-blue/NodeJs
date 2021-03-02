const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(20),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            provider: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: "local",
            },
            sns_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
        }, {
            //options
            sequelize,
            timestamps: true,
            prarnoid: true,
            underscored: true,
            modelName: "User",
            tableName: "users",
            charset: "utf8",
            collate: "utf8_general_ci"
        })
    }

    static associate(db) {
        // user-post 게시글업로드(1:N관계)
        db.User.hasMany(db.Post, { foreignKey: 'userId', sourceKey: 'id' });

        // user-user 팔로우(N:M관계)
        db.User.belongsToMany(db.User, { foreignKey: "followerId", through: "Follow", as: "Followings" });
        db.User.belongsToMany(db.User, { foreignKey: "followingId", through: "Follow", as: "Followers" });

        // user-post 좋아요(N:M관계)
        db.User.belongsToMany(db.Post, { foreignKey: "like_user_id", through: "Like", as: "Liked" });
    }
}
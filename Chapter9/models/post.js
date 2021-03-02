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

    static associate(db) {
        // user-post 게시글업로드(1:N관계)
        db.Post.belongsTo(db.User, { foreignKey: "UserId", targetKey: "id" });

        // post-hashtag 해쉬태그(N:M관계)
        db.Post.belongsToMany(db.Hashtag, { foreignKey: "HashtagId", through: "PostHashtag" });

        // user-post 좋아요(N:M관계)
        db.Post.belongsToMany(db.User, { foreignKey: "like_post_id", through: "Like", as: "Liking"  });
    }
}
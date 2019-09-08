
const list = (sequelize, DataTypes) => {
    const List = sequelize.define('list', {
        title: {
            type: DataTypes.STRING,
            unique: true,
        },
    });

    List.associate = models => {
        List.hasMany(models.Item, { onDelete: 'CASCADE' });
    };

    return List;
};

export default list;
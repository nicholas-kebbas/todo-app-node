const item = (sequelize, DataTypes) => {
    const Item = sequelize.define('item', {
        text: {
            type: DataTypes.STRING,
        },

        complete: {
            type: DataTypes.INTEGER
        }
    });

    Item.associate = models => {
        Item.belongsTo(models.List);
    };

    return Item;
};

export default item;
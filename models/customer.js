module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      real_customer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    }, 
    {
      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true
    });
    
    Customer.associate = function(models) {
    // Associating Customer with Burger
    // When an Customer is deleted, also delete any associated Burgers (in case we will allow customer to be deleted)
        Customer.hasMany(models.Burger, {
          onDelete: "cascade"
        });

    };
   
    return Customer;


};
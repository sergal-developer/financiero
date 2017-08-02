var sourceData = {
    currency: [
        { name: 'Mexico (Peso)', prefix: 'MXN', symbol: '$' },
        { name: 'Estados Unidos (Dolar)', prefix: 'USD', symbol: '$' },
        { name: 'Reino Unido (libra esterlina)', prefix: 'GBP', symbol: '£' },
        { name: 'Europa (Euro)', prefix: 'EUR', symbol: '€' },
        { name: 'Japon (yen)', prefix: 'JPY', symbol: '¥' },
        { name: 'China (yuan)', prefix: 'CNY', symbol: '¥' }
    ],
    userRoot: [
        {   UserName: 'admin', 
            Password: 'P4$$w0rd', 
            GivenName: 'Administrator', 
            MiddleName: 'Spotffin', 
            FamilyName: 'System', 
            Email: 'admin@admin.com', 
            Gender: '', 
            Birthdate: null},
    ]
};

module.exports = {
    sourceData: sourceData
};

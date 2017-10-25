module.exports = {
    app: 'financial',
    server: {
        port: 3300, 
        browserSyncPort: 4400, 
        serverFile: 'server/server.js',
        buildPath: '/build/',
		base: 'app/',
        gulpbuildPath: 'app/',
        aplicationStart: '3300/',
        cssConcatenated: 'financial/resources/design/design.css',
        layoutPath: 'app/financial/layout.html',
        appUrl: '/',
        appLibs: '/libs',
        appStyle: 'financial/resources/design/design.css',
        apiConfig: {
            token: 'QVBQLUZpbmFuY2llcm8tQVBJLXMzcmcxMEFOVE9OSU80WnVyMw==', //BASE64: APP-Financiero-API-s3rg10ANTONIO4Zur3
            routeName: '/api',
            cords: {
                access: '*',
                methods: 'GET,PUT,POST,DELETE,OPTIONS',
                headers: 'Content-type,Accept,X-Access-Token,Account'
            }
        }
    },
    database: {
        file: './server/database/dbfinanciero.db',
        fileSchema: './server/database/model-financiero.api.linq',
        querys: {
            table: {
                types: [
                    { name: 'findAll', statement: 'SELECT * FROM [TYPES]' },
                    { name: 'findById', statement: 'SELECT * FROM [TYPES] WHERE ID={0}' },
                    { name: 'findByName', statement: 'SELECT * FROM [TYPES] WHERE NAME="{0}"' },
                    { name: 'findAnyName', statement: 'SELECT * FROM [TYPES] WHERE instr(NAME, "{0}") > 0;' },
                    { name: 'add', statement: 'INSERT INTO [TYPES] (Name, Icon, IsEntry) VALUES ({0}, {1}, {2})' },
                    { name: 'update', statement: 'UPDATE [TYPES] SET Name={0}, Icon={1}, IsEntry={2} WHERE ID={3}' },
                    { name: 'delete', statement: 'DELETE FROM [TYPES] WHERE ID={0}' }
                ], 
                currency: [
                    { name: 'findAll', statement: 'SELECT * FROM [CURRENCY]' },
                    { name: 'findById', statement: 'SELECT * FROM [CURRENCY] WHERE ID={0}' },
                    { name: 'findByName', statement: 'SELECT * FROM [CURRENCY] WHERE NAME="{0}"' },
                    { name: 'findAnyName', statement: 'SELECT * FROM [CURRENCY] WHERE instr(NAME, "{0}") > 0;' },
                    { name: 'add', statement: 'INSERT INTO [CURRENCY] (Name, Symbol, Prefix) VALUES ({0}, {1}, {2})' },
                    { name: 'update', statement: 'UPDATE [CURRENCY] SET Name={0}, Symbol={1}, Prefix={2} WHERE ID={3}' },
                    { name: 'delete', statement: 'DELETE FROM [CURRENCY] WHERE ID={0}' }
                ], 
                user: [
                    { name: 'findAll', statement: 'SELECT * FROM [USER]' },
                    { name: 'findById', statement: 'SELECT * FROM [USER] WHERE ID={0}' },
                    { name: 'findByName', statement: 'SELECT * FROM [USER] WHERE username="{0}"' },
                    { name: 'findAnyName', statement: 'SELECT * FROM [USER] WHERE instr(username, "{0}") > 0;' },
                    { name: 'add', statement: 'INSERT INTO [USER] (UserName, Password, GivenName, MiddleName, FamilyName, Email, Gender, Birthdate) VALUES ({0}, {1}, {2}, {3}, {4}, {5}, {6}, {7})' },
                    { name: 'update', statement: 'UPDATE [USER] SET UserName={0}, Password={1}, GivenName={2}, MiddleName={3}, FamilyName={4}, Email={5}, Gender={6}, Birthdate={7} WHERE ID={3}' },
                    { name: 'delete', statement: 'DELETE FROM [USER] WHERE ID={0}' }
                ], 
                wallet: [
                    { name: 'findAll', statement: 'SELECT * FROM [WALLET]' },
                    { name: 'findById', statement: 'SELECT * FROM [WALLET] WHERE ID={0}' },
                    { name: 'findByName', statement: 'SELECT * FROM [WALLET] WHERE NAME="{0}"' },
                    { name: 'findAnyName', statement: 'SELECT * FROM [WALLET] WHERE instr(NAME, "{0}") > 0;' },
                    { name: 'add', statement: 'INSERT INTO [WALLET] (Name, Balance, IdCurrency, IdUser) VALUES ({0}, {1}, {2}, {3})' },
                    { name: 'update', statement: 'UPDATE [WALLET] SET Name={0}, Balance={1}, IdCurrency={2}, IdUser={3} WHERE ID={4}' },
                    { name: 'delete', statement: 'DELETE FROM [WALLET] WHERE ID={0}' }
                ], 
                transaction: [
                    { name: 'findAll', statement: 'SELECT * FROM [TRANSACTION]' },
                    { name: 'findById', statement: 'SELECT * FROM [TRANSACTION] WHERE ID={0}' },
                    { name: 'findByName', statement: 'SELECT * FROM [TRANSACTION] WHERE Description="{0}"' },
                    { name: 'findAnyName', statement: 'SELECT * FROM TRANSACTION WHERE instr(Description, "{0}") > 0;' },
                    { name: 'add', statement: 'INSERT INTO [TRANSACTION] (Description, Value, [Update], IdCurrency, IdWallet, IdType, IdPlan, IsBudget) VALUES ({0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8})' },
                    { name: 'update', statement: 'UPDATE [TRANSACTION] SET Description={0}, Value={1}, [Update]={2}, IdCurrency={3}, IdWallet={4}, IdType={5}, IdPlan={6}, IsBudget={7} WHERE ID={8}' },
                    { name: 'delete', statement: 'DELETE FROM [TRANSACTION] WHERE ID={0}' }
                ],
                plan: [
                    { name: 'findAll', statement: 'SELECT * FROM [PLAN]' },
                    { name: 'findById', statement: 'SELECT * FROM [PLAN] WHERE ID={0}' },
                    { name: 'findByName', statement: 'SELECT * FROM [PLAN] WHERE NAME="{0}"' },
                    { name: 'findAnyName', statement: 'SELECT * FROM [PLAN] WHERE instr(NAME, "{0}") > 0;' },
                    { name: 'add', statement: 'INSERT INTO [PLAN] (Name, Value, CutDay, PaymentsType, Instalment, [Update], IdWallet) VALUES ({0}, {1}, {2}, {3}, {4}, {5}, {6})' },
                    { name: 'update', statement: 'UPDATE [PLAN] SET Name={0}, Value={1}, CutDay={2}, PaymentsType={3}, Instalment={4}, [Update]={5}, IdWallet={6} WHERE ID={7}' },
                    { name: 'delete', statement: 'DELETE FROM [PLAN] WHERE ID={0}' }
                ]
            }
        }
    }
}
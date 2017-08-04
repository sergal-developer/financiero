CREATE TABLE IF NOT EXISTS Types( 
	Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	Name TEXT NOT NULL, 
	Icon TEXT NOT NULL, 
	IsEntry BIT NOT NULL 
)
GO
CREATE TABLE IF NOT EXISTS Currency( 
	Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	Name TEXT NOT NULL, 
	Symbol TEXT NOT NULL, 
	Prefix TEXT NOT NULL
)
GO
CREATE TABLE IF NOT EXISTS User( 
	Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	UserName TEXT NOT NULL, 
	Password TEXT NOT NULL, 
	GivenName TEXT NULL, 
	MiddleName TEXT NULL, 
	FamilyName TEXT NULL, 
	Email TEXT NOT NULL, 
	Gender TEXT NULL, 
	Birthdate DATETIME NULL
)
GO
CREATE TABLE IF NOT EXISTS Wallet( 
	Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	Name TEXT NOT NULL, 
	Balance REAL NULL, 
	IdCurrency INT NOT NULL,
	IdUser INT NOT NULL 
)
GO
CREATE TABLE IF NOT EXISTS Plan( 
	Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	Name TEXT NOT NULL, 
	Value REAL NOT NULL, 
	CutDay INT NOT NULL,
	PaymentsType INT NOT NULL,
	Instalment INT NOT NULL,
	[Update] DATETIME NOT NULL,
	IdWallet INT NOT NULL 
)
GO
CREATE TABLE IF NOT EXISTS [Transaction]( 
	Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	Description TEXT NOT NULL, 
	Value REAL NOT NULL, 
	[Update] DATETIME NOT NULL,
	IdCurrency INT NOT NULL,
	IdWallet INT NOT NULL,
	IdType INT NOT NULL,
	IdPlan INT NOT NULL,
	IsBudget BIT NOT NULL 
)
GO
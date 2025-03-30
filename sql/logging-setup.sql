-- Create Logging Schema
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'Logging')
BEGIN
    EXEC ('CREATE SCHEMA Logging');
END;

-- Create Logs Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Logs' AND schema_id = SCHEMA_ID('Logging'))
BEGIN
    CREATE TABLE Logging.Logs (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Timestamp DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        Service NVARCHAR(100) NOT NULL,
        Level NVARCHAR(50) NOT NULL,
        Message NVARCHAR(MAX) NOT NULL,
        ContextData NVARCHAR(MAX) NULL,  -- JSON data
        CorrelationId NVARCHAR(100) NULL,
        RequestPath NVARCHAR(255) NULL,
        RequestMethod NVARCHAR(10) NULL,
        UserAgent NVARCHAR(500) NULL,
        UserIp NVARCHAR(50) NULL
    );
END;

-- Create Index for faster querying
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Logs_Timestamp' AND object_id = OBJECT_ID('Logging.Logs'))
BEGIN
    CREATE INDEX IX_Logs_Timestamp ON Logging.Logs(Timestamp DESC);
END;

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Logs_CorrelationId' AND object_id = OBJECT_ID('Logging.Logs'))
BEGIN
    CREATE INDEX IX_Logs_CorrelationId ON Logging.Logs(CorrelationId);
END; 
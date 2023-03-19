USE [ABREPAIR]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[users](
	[Number] [int] NOT NULL,
	[email] [varchar](100) NULL,
    [password] [varchar](50) NULL,
    [name] [varchar](50) NULL,
    [surname] [varchar](50) NULL,
    [phone] [varchar](50) NULL,
    [address] [varchar](50) NULL,
    [city] [varchar](50) NULL,
    [postal_code] [varchar](50) NULL,
    [country] [varchar](50) NULL,
    [birth_date] [date] NULL,
    [last_login] [date] NULL,
    [last_login_ip] [varchar](50) NULL,
    [role] [varchar](50) NULL,
    Primary Key([Number])
)

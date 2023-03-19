BEGIN
CREATE TRIGGER update_apartment_trigger
ON apartment
AFTER UPDATE
AS
BEGIN
  UPDATE apartment
  SET FlatKind = fbd.FlatKind,
      Class = fbd.Class,
      Area = fbd.Area,
      Unity = fbd.Unity,
      Rent = fbd.Rent,
      CostPrice = fbd.CostPrice,
      FlatOwner = fbd.FlatOwner,
      CustGuid = fbd.CustGuid,
      Details = fbd.Details,
      Overlooking = fbd.Overlooking,
      OfferType = fbd.OfferType,
      Restrained = fbd.Restrained,
      BathroomCount = fbd.BathroomCount,
      BalconyCount = fbd.BalconyCount
  FROM FlatBuildingDetails fbd
  INNER JOIN inserted i ON fbd.GUID = i.FlatBuildingDetailsGuid
  WHERE apartment.GUID = i.GUID;
END;
END
BEGIN
CREATE TRIGGER tr_generate_apartments 
ON Building
AFTER INSERT
AS
BEGIN
    DECLARE @floorCount int, @apartmentCountOfFloor int, @buildingId uniqueidentifier;

    SELECT @floorCount = FloorCount, @apartmentCountOfFloor = ApartmentCountOfFloor, @buildingId = Guid
    FROM INSERTED

    DECLARE @i int = 0, @j int = 0;

    WHILE @i < @floorCount
    BEGIN
        SET @j = 0;
        WHILE @j < @apartmentCountOfFloor
        BEGIN
            INSERT INTO Apartment (BuildingGuid, No, FloorNo)
            VALUES (@buildingId, CONVERT(varchar(10),@i*100 + @j + 101), @i+1);

            SET @j = @j + 1;
        END;

        SET @i = @i + 1;
    END;
END;
END
BEGIN
CREATE TRIGGER delete_apartments
ON building
AFTER INSERT
AS
DELETE FROM apartments WHERE BuildingGuid = (SELECT Guid FROM inserted);
END
END
BEGIN
CREATE TRIGGER update_account_Nsons
ON account
AFTER INSERT
AS
BEGIN
    IF (SELECT parentGuid FROM inserted) IS NOT NULL
    BEGIN
        DECLARE @id uniqueIdentifier;
        SET @id = (SELECT parentGuid FROM inserted);
        UPDATE account
        SET NSons = (SELECT Nsons FROM account WHERE Guid = @id) + 1
        WHERE Guid = @id;
    END
END;
END
BEGIN
CREATE TRIGGER insert_building_trigger
ON building
AFTER INSERT
AS
BEGIN
  DECLARE @new_name VARCHAR(255);
  DECLARE @SecLvl INT;
  BEGIN
  IF (SELECT CostGuid FROM inserted) IS NULL
  BEGIN
    SET @new_name = (SELECT Name FROM inserted);
    SET @SecLvl = (SELECT SecLvl FROM inserted);
	IF (select guid from Cost Where Name='Buildings') IS NULL
	BEGIN
	INSERT INTO Cost(name) VALUES('Buildings')
	END
    INSERT INTO Cost(name, ParentGUID, SecLvl) VALUES(@new_name, (select guid from Cost Where Name='Buildings'), @SecLvl);
    UPDATE building
    SET CostGuid = (SELECT Guid FROM Cost WHERE name = @new_name)
    FROM inserted
    WHERE building.Guid = (SELECT Guid FROM inserted);
    END
  END
END;
END
BEGIN
CREATE TRIGGER insert_apartment_trigger
ON apartment
AFTER INSERT
AS
BEGIN
    -- Check if the inserted row has a NULL value for the CostGuid column
    IF (SELECT CostGuid FROM inserted) IS NULL
    BEGIN
        DECLARE @new_name VARCHAR(255);
        -- Set the value of @new_name to the value of the No column in the inserted row
        SET @new_name = (SELECT No FROM inserted);
        -- Insert a new row into the Cost table with the name and ParentGUID from the inserted row
        INSERT INTO Cost(name, ParentGUID) 
        VALUES(@new_name, (SELECT CostGuid FROM Building WHERE Guid = (SELECT BuildingGuid FROM inserted)));
        -- Update the apartment row in the apartment table with the new CostGuid 
        UPDATE apartment
        SET CostGuid = (SELECT Guid FROM Cost WHERE name = @new_name AND ParentGUID = (SELECT CostGuid FROM Building WHERE Guid = (SELECT BuildingGuid FROM inserted)))
        FROM inserted
        WHERE apartment.Guid = (SELECT Guid FROM inserted);
    END
END;
END
BEGIN
CREATE TRIGGER insert_building_trigger
ON building
AFTER INSERT
AS
BEGIN
  DECLARE @new_name VARCHAR(255);
  DECLARE @SecLvl INT;
    SET @new_name = (SELECT Name FROM inserted);
    SET @SecLvl = (SELECT SecLvl FROM inserted);
    DECLARE @Code INT = 12301;
    WHILE EXISTS (SELECT 1 FROM cost WHERE Code = @Code)
    BEGIN
    SET @Code = @Code + 1;
    END
  BEGIN
  IF(SELECT AccountGuid FROM inserted) IS NULL
  BEGIN
    INSERT INTO account (name, ParentGUID, SecLvl, Code) VALUES(@new_name, (select guid from Account Where Name='Buildings'), @SecLvl, @Code);
    UPDATE building
    SET AccountGuid = (SELECT Guid FROM Account WHERE name = @new_name)
    FROM inserted
    WHERE building.Guid = (SELECT Guid FROM inserted);
 END
  IF (SELECT CostGuid FROM inserted) IS NULL
  BEGIN
	IF (select guid from Cost Where Name='Buildings') IS NULL
	BEGIN
	INSERT INTO Cost(name) VALUES('Buildings')
	END
    INSERT INTO Cost(name, ParentGUID, SecLvl) VALUES(@new_name, (select guid from Cost Where Name='Buildings'), @SecLvl);
    UPDATE building
    SET CostGuid = (SELECT Guid FROM Cost WHERE name = @new_name), AccountGuid = (SELECT Guid FROM Account WHERE name = @new_name)
    FROM inserted
    WHERE building.Guid = (SELECT Guid FROM inserted);
    END
  END
END;
END

BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(0, 'Balance Sheet', 1, null, null),
(01 , 'Profit & Loss', 1, null, null)
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(1, 'Assets', 3, (SELECT guid FROM account WHERE Code = 0), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(11, 'Fixed Assets', 1, (SELECT guid FROM account WHERE code = 1), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(111, 'Furniture & Fixture', 0, (SELECT guid FROM account WHERE code = 11), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(12, 'Current Assets', 4, (SELECT guid FROM account WHERE code = 1), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(121, 'Customers', 6, (SELECT guid FROM account WHERE code = 12), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(122, 'Notes Receivables', 0, (SELECT guid FROM account WHERE code = 12), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(123, 'Buildings', 8, (SELECT guid FROM account WHERE code = 12), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(125, 'Stock', 1, (SELECT guid FROM account WHERE code = 12), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(1251, 'End period inventory', 0, (SELECT guid FROM account WHERE code = 125), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(13, 'Cash on hand', 2, (SELECT guid FROM account WHERE code = 12), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(131, 'Cash', 0, (SELECT guid FROM account WHERE code = 13), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(132, 'Bank', 0, (SELECT guid FROM account WHERE code = 13), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(2, 'Liabilities', 2, (SELECT guid FROM account WHERE Code = 0), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(21, 'Owners Equites', 1, (SELECT guid FROM account WHERE code = 2), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(2101, 'Capital', 0, (SELECT guid FROM account WHERE code = 21), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(22, 'Current Liabilities', 4, (SELECT guid FROM account WHERE code = 2), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(221, 'Suppliers', 1, (SELECT guid FROM account WHERE code = 22), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(222, 'Note Payables', 0, (SELECT guid FROM account WHERE code = 22), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(223, 'Security deposit', 0, (SELECT guid FROM account WHERE code = 22), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(224, 'VAT', 0, (SELECT guid FROM account WHERE code = 22), (SELECT guid FROM account WHERE Code = 0), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(3, 'Expenses', 6, (SELECT guid FROM account WHERE code = 01), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(31, 'Salaries', 0, (SELECT guid FROM account WHERE code = 3), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(32, 'Water and Electricity', 0, (SELECT guid FROM account WHERE code = 3), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(33, 'Expenses', 0, (SELECT guid FROM account WHERE code = 3), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(34, 'Elevator Maintenance Expense', 0, (SELECT guid FROM account WHERE code = 3), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(35, 'Ahmad Alreruejrli', 0, (SELECT guid FROM account WHERE code = 3), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(36, 'Visa Expense', 0, (SELECT guid FROM account WHERE code = 3), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(4, 'Revenues', 7, (SELECT guid FROM account WHERE code = 01), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(41, 'Flats Sales Revenue', 0, (SELECT guid FROM account WHERE code= 4), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(42, 'Shops Sales Revenue', 0, (SELECT guid FROM account WHERE code= 4), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(43, 'Flats Rent Revenue', 0, (SELECT guid FROM account WHERE code= 4), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(44, ' Shops Rent Revenue', 0, (SELECT guid FROM account WHERE code= 4), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(45, 'Sales commission Revenue', 0, (SELECT guid FROM account WHERE code= 4), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(46, 'Rent Commission Revenue', 0, (SELECT guid FROM account WHERE code= 4), (SELECT guid FROM account WHERE code = 01), GETDATE())
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid, CDate) VALUES
(47, 'Other Revenues', 0, (SELECT guid FROM account WHERE code= 4), (SELECT guid FROM account WHERE code = 01), GETDATE());
END;

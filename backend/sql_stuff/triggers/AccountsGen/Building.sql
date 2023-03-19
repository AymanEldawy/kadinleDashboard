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
    INSERT INTO account (name, ParentGUID, SecLvl) VALUES(@new_name, (select guid from Account Where Name='Buildings'), @SecLvl);
    UPDATE building
    SET CostGuid = (SELECT Guid FROM Cost WHERE name = @new_name), AccountGuid = (SELECT Guid FROM Account WHERE name = @new_name)
    FROM inserted
    WHERE building.Guid = (SELECT Guid FROM inserted);
    END
  END
END;
CREATE TRIGGER insert_apartment_trigger
ON apartment
AFTER INSERT
AS
BEGIN
  DECLARE @new_name VARCHAR(255);
  DECLARE @building_id UNIQUEIDENTIFIER;
  BEGIN
    SET @new_name = (SELECT No FROM inserted);
    SET @building_id = (SELECT BuildingGuid FROM inserted);
    INSERT INTO Cost(name, ParentGUID) VALUES(@new_name, (select CostGUID from Building Where Guid=@building_id));
    UPDATE apartment
    SET CostGuid = (SELECT Guid FROM Cost WHERE name = @new_name)
    FROM inserted
    WHERE apartment.Guid = (SELECT Guid FROM inserted);
  END
END;
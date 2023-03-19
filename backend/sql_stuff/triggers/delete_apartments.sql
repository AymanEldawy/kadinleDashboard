CREATE TRIGGER delete_apartments
ON building
AFTER INSERT
AS
DELETE FROM apartments WHERE BuildingGuid = @id

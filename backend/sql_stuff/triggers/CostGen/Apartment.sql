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

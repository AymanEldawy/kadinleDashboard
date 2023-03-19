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

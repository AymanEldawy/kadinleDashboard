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

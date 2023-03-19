CREATE TRIGGER trg_LeaseApartment_Entries
ON LeaseApartment
AFTER INSERT
AS
BEGIN
DECLARE @OwnerAccountGuid uniqueidentifier = (SELECT OwnerAccountGuid FROM Building Where Guid = (Select BuildingGuid from INSERTED))
DECLARE @SecLvl int = (Select Seclvl from INSERTED)
DECLARE @CostGuid uniqueidentifier = (Select CostGuid from INSERTED)
DECLARE @CustomerGuid uniqueidentifier = (Select CustAccountGuid from INSERTED)
DECLARE @CustGuid uniqueidentifier = (Select CustomerGuid from INSERTED)
DECLARE @Date datetime = (Select FromDate from INSERTED)
DECLARE @CurrencyGuid uniqueidentifier = (Select CurrencyGuid from INSERTED)
DECLARE @CurrencyVal float = (Select CurrencyVal from INSERTED)
DECLARE @Rent float = (Select Rent from INSERTED)
DECLARE @Note nvarchar(100) = 'Contract for ' + (Select ContractNo from INSERTED)
DECLARE @HEntryGuid uniqueidentifier;
DECLARE @Number int = 1;
DECLARE @Income uniqueidentifier;
DECLARE @Fine float = (Select Fine from INSERTED)
DECLARE @FineNote varchar(256) = (Select FineNote from INSERTED)
DECLARE @InsuranceValue float = (Select InsuranceValue from INSERTED)
DECLARE @CommissionFromCustValue float = (Select CommissionFromCustValue from INSERTED)
DECLARE @CommissionFromOwnerValue float = (Select CommissionFromOwnerValue from INSERTED)
DECLARE @CommissionFromSalesManValue float = (Select CommissionFromSalesManValue from INSERTED)
DECLARE @AcCommissionFromCustGuid uniqueidentifier = (Select AcCommissionFromCustGuid from INSERTED);
DECLARE @AcCommissionFromOwnerGuid uniqueidentifier = (Select AcCommissionFromOwnerGuid from INSERTED)
DECLARE @FineAccount uniqueidentifier;
DECLARE @InsuranceAccountGuid uniqueidentifier;
DECLARE @AcSalesManCommissionGuid uniqueidentifier = (Select AcSalesManCommissionGuid from INSERTED);
DECLARE @CommissionIncome uniqueidentifier = (SELECT GUID FROM Account WHERE Code = 46)
IF EXISTS (Select RevenueAccountGuid from INSERTED)
    BEGIN
        SET @Income = (Select RevenueAccountGuid from INSERTED)
    END
ELSE
    BEGIN
    -- INCOME TYPE
        SET @Income = (SELECT GUID FROM Account WHERE Code = 43)
    END
IF EXISTS (Select FineAccount from INSERTED)
    BEGIN
        SET @FineAccount = (Select FineAccount from INSERTED)
    END
ELSE
    BEGIN
    IF EXISTS (Select VATAccountGuid from Customer Where AcGuid = @CustomerGuid)
        BEGIN
            SET @FineAccount = (Select VATAccountGuid from Customer Where AcGuid = @CustomerGuid)
        END
    ELSE
        BEGIN
            SET @FineAccount = (SELECT GUID FROM Account WHERE Code = 224)
        END
    END
  
IF EXISTS (Select InsuranceAccountGuid from INSERTED)
    BEGIN
        SET @InsuranceAccountGuid = (Select InsuranceAccountGuid from INSERTED)
    END
ELSE
    BEGIN
    IF EXISTS (SELECT @InsuranceAccountGuid from Customer Where Guid = @CustomerGuid) 
        BEGIN
            SET @InsuranceAccountGuid = (SELECT @InsuranceAccountGuid from Customer Where Guid = @CustomerGuid)
        END
    ELSE
        BEGIN
        SET @InsuranceAccountGuid = (SELECT GUID FROM Account WHERE Code = 223)
        END
    END

BEGIN
INSERT INTO HEntry (SecLvl, Date, CurrencyGuid, CurrencyVal, Note ) 
VALUES
(@SecLvl, @Date, @CurrencyGuid, @CurrencyVal, @Note)
END
SET @HEntryGuid = NEWID()
IF (SELECT FlatOwner FROM Apartment WHERE GUID = (Select ApartmentGuid from INSERTED)) = 0
BEGIN
BEGIN
-- Value from customer 
    INSERT INTO DEntry (Number, ParentGuid, Credit, CurrencyGuid, CurrencyVal, ObverseAcGuid, CostGuid, Note)
    VALUES
    ((SELECT MAX(Number) FROM DEntry WHERE ParentGuid = @HEntryGuid) + 1, @HEntryGuid, @Rent, @CurrencyGuid, @CurrencyVal, @CustomerGuid, @CostGuid, @Note + ' Rent from customer')
END
BEGIN
-- Value to owner
    INSERT INTO DEntry (Number, ParentGuid, Debit, CurrencyGuid, CurrencyVal, ObverseAcGuid, CostGuid, Note)
    VALUES
    ((SELECT MAX(Number) FROM DEntry WHERE ParentGuid = @HEntryGuid) + 1, @HEntryGuid, @Rent, @CurrencyGuid, @CurrencyVal, @Income, @CostGuid, @Note + ' Rent to owner')
END
END
ELSE IF (SELECT FlatOwner FROM Apartment WHERE GUID = (Select ApartmentGuid from INSERTED)) = 1
BEGIN
BEGIN
-- value from customer
    INSERT INTO DEntry (Number, ParentGuid, Credit, CurrencyGuid, CurrencyVal, ObverseAcGuid, CostGuid, Note)
    VALUES
    ((SELECT MAX(Number) FROM DEntry WHERE ParentGuid = @HEntryGuid) + 1, @HEntryGuid, @Rent + @CommissionFromCustValue, @CurrencyGuid, @CurrencyVal, @CustomerGuid, @CostGuid, @Note + ' Rent and commission from customer')

END
BEGIN
-- value into owner account
    INSERT INTO DEntry (Number, ParentGuid, Debit, CurrencyGuid, CurrencyVal, ObverseAcGuid, CostGuid, Note)
    VALUES
    ((SELECT MAX(Number) FROM DEntry WHERE ParentGuid = @HEntryGuid) + 1, @HEntryGuid, @Rent - @CommissionFromOwnerValue, @CurrencyGuid, @CurrencyVal, @OwnerAccountGuid, @CostGuid, @Note + ' Rent to owner')
END
IF @CommissionFromSalesManValue > 0
BEGIN
-- commission from salesman
    INSERT INTO DEntry (Number, ParentGuid, Credit, CurrencyGuid, CurrencyVal, ObverseAcGuid, CostGuid, Note)
    VALUES
    ((SELECT MAX(Number) FROM DEntry WHERE ParentGuid = @HEntryGuid) + 1, @HEntryGuid, @CommissionFromSalesManValue, @CurrencyGuid, @CurrencyVal, @AcSalesManCommissionGuid, @CostGuid, @Note + ' Commission from salesman')
END
IF @CommissionFromOwnerValue + @CommissionFromCustValue + @CommissionFromSalesManValue > 0
BEGIN
-- Commision into commision account
    INSERT INTO DEntry (Number, ParentGuid, Debit, CurrencyGuid, CurrencyVal, ObverseAcGuid, CostGuid, Note)
    VALUES
    ((SELECT MAX(Number) FROM DEntry WHERE ParentGuid = @HEntryGuid) + 1, @HEntryGuid, @CommissionFromOwnerValue + @CommissionFromCustValue + @CommissionFromSalesManValue, @CurrencyGuid, @CurrencyVal, @CommissionIncome, @CostGuid, @Note + ' Commissions')
END
END
BEGIN
-- Fine from customer 
    INSERT INTO DEntry (Number, ParentGuid, Credit, CurrencyGuid, CurrencyVal, ObverseAcGuid, CostGuid, Note)
    VALUES
    ((SELECT MAX(Number) FROM DEntry WHERE ParentGuid = @HEntryGuid) + 1, @HEntryGuid, @Fine, @CurrencyGuid, @CurrencyVal, @CustomerGuid, @CostGuid, @Note + ' Fine from customer')
END
BEGIN
-- Fine to fine account
    INSERT INTO DEntry (Number, ParentGuid, Debit, CurrencyGuid, CurrencyVal, ObverseAcGuid, CostGuid, Note)
    VALUES
    ((SELECT MAX(Number) FROM DEntry WHERE ParentGuid = @HEntryGuid) + 1, @HEntryGuid, @Fine, @CurrencyGuid, @CurrencyVal, @FineAccount, @CostGuid, @Note  + ' Fine to fine account')
END
BEGIN
-- Insurance from customer 
    INSERT INTO DEntry (Number, ParentGuid, Credit, CurrencyGuid, CurrencyVal, ObverseAcGuid, CostGuid, Note)
    VALUES
    ((SELECT MAX(Number) FROM DEntry WHERE ParentGuid = @HEntryGuid) + 1, @HEntryGuid, @InsuranceValue, @CurrencyGuid, @CurrencyVal, @CustomerGuid, @CostGuid, @Note + ' Insurance from customer')
END
BEGIN
-- Insurance to Insurance account
    INSERT INTO DEntry (Number, ParentGuid, Debit, CurrencyGuid, CurrencyVal, ObverseAcGuid, CostGuid, Note)
    VALUES
    ((SELECT MAX(Number) FROM DEntry WHERE ParentGuid = @HEntryGuid) + 1, @HEntryGuid, @InsuranceValue, @CurrencyGuid, @CurrencyVal, @InsuranceAccountGuid, @CostGuid, @Note + ' Insurance to Insurance account')
END
END
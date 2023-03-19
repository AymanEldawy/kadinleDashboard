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

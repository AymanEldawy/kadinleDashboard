BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(0, 'Budget', 23, null, null),
(0, 'Profit and Loss', 14, null, null)
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(1, 'Assets', 3, (SELECT guid FROM account WHERE name='Budget'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(11, 'Fixed Assets', 1, (SELECT guid FROM account WHERE name='Assets'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(111, 'Furniture and Furnishings', 0, (SELECT guid FROM account WHERE name='Fixed Assets'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(12, 'Current Assets', 4, (SELECT guid FROM account WHERE name='Assets'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(121, 'Customers', 6, (SELECT guid FROM account WHERE name='Current Assets'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(122, 'Receivable Papers', 0, (SELECT guid FROM account WHERE name='Current Assets'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(123, 'Buildings', 8, (SELECT guid FROM account WHERE name='Current Assets'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(12309, 'Head Building', 0, (SELECT guid FROM account WHERE name='Buildings'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(125, 'Inventory', 1, (SELECT guid FROM account WHERE name='Current Assets'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(1251, 'Inventory of Finished Goods at End of Period', 0, (SELECT guid FROM account WHERE name='Inventory'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(13, 'Cash', 2, (SELECT guid FROM account WHERE name='Current Assets'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(131, 'Cashbox', 0, (SELECT guid FROM account WHERE name='Cash'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(132, 'Bank', 0, (SELECT guid FROM account WHERE name='Cash'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(2, 'Liabilities', 2, (SELECT guid FROM account WHERE name='Budget'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(21, 'Property Rights', 1, (SELECT guid FROM account WHERE name='Liabilities'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(2101, 'Capital', 0, (SELECT guid FROM account WHERE name='Property Rights'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(22, 'Current Liabilities', 4, (SELECT guid FROM account WHERE name='Liabilities'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(221, 'Suppliers', 1, (SELECT guid FROM account WHERE name='Current Liabilities'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(221001, 'Supplier No. 1', 0, (SELECT guid FROM account WHERE name='Suppliers'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(222, 'Payment Papers', 0, (SELECT guid FROM account WHERE name='Current Liabilities'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(223, 'VAT', 0, (SELECT guid FROM account WHERE name='Current Liabilities'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(224, 'Unearned Revenue', 0, (SELECT guid FROM account WHERE name='Current Liabilities'), (SELECT guid FROM account WHERE name='Budget'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(3, 'Expenses', 6, (SELECT guid FROM account WHERE name='Profit and Loss'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(31, 'Salaries and Wages', 0, (SELECT guid FROM account WHERE name='Expenses'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(32, 'Water and Electricity', 0, (SELECT guid FROM account WHERE name='Expenses'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(33, 'Miscellaneous Expenses', 0, (SELECT guid FROM account WHERE name='Expenses'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(34, 'Elevator Maintenance Expense', 0, (SELECT guid FROM account WHERE name='Expenses'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(35, 'Ahmad Alreruejrli', 0, (SELECT guid FROM account WHERE name='Expenses'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(36, 'Visa Expense', 0, (SELECT guid FROM account WHERE name='Expenses'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(4, 'Revenues', 7, (SELECT guid FROM account WHERE name='Profit and Loss'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(41, 'Revenue from Sale of Apartments', 0, (SELECT guid FROM account WHERE name='Revenues'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(42, 'Revenue from Sale of Stores', 0, (SELECT guid FROM account WHERE name='Revenues'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(43, 'Revenue from Renting Out Properties', 0, (SELECT guid FROM account WHERE name='Revenues'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(44, 'Revenue from Renting Out Equipment', 0, (SELECT guid FROM account WHERE name='Revenues'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(45, 'Sales commission income', 0, (SELECT guid FROM account WHERE name='Revenues'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(46, 'Rental commission income', 0, (SELECT guid FROM account WHERE name='Revenues'), (SELECT guid FROM account WHERE name='Profit and Loss'))
END;
BEGIN
INSERT INTO account (code, name, Nsons, parentGuid, finalGuid) VALUES
(47, 'Other Income', 0, (SELECT guid FROM account WHERE name='Revenues'), (SELECT guid FROM account WHERE name='Profit and Loss'));
END;

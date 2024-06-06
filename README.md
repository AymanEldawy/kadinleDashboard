<!-- Tomorrow TASKS -->

# Tools

[done] [1] subtitle title
[done] [2] HEX TO decimal & reverse
[done] [3] select row horizontal or vertical
[done] [4] allow remove from colors & from from select all
[done] [5] pointer colors

# TestEntry

[done] [1] loading time sand
[done] [2] ignore override debit and observeAcGuid
[done] [3] Unique AcGuid entry

<!-- suppliers -->

- page and approval
- counting
- scripts

# Today tasks

[done] [1] table head color
[done] [2] NO property with updates
[done] [3] select with two dimensions
[done] [4] structure of data

<!-- testEntry -->

[done] [4] hourglass icon
[done] [4] fix autofill credit & debit

# Tomorrow Tasks

[todo] [1] allow tools updates

# New information for suppliers

## User Information

username
id_number
phone_number
email_address
password

## Company Information

company_name
company_type
tax_office
tax_number
kEP_address
mersis_number
iban_number

## Shipping & Return Addresses

billing_address  
shipping_address  
return_address

### Required info inside address

province
district
neighborhood
address
full_name
email
phone

## Contact Information

main  
finance
operations  
sales  
other

## Contracts and Attachments

## Integration Information

### Required new table

| name             | type     | ref    |
| ---------------- | -------- | ------ |
| user_id          | uuid     | user🍳 |
| supplier_id      | voucher  |
| company_name     | voucher  |
| company_type     | voucher  |
| tax_office       |
| tax_number       |
| kEP_address      | voucher  |
| mersis_number    |
| iban_number      |
| billing_address  | voucher  |
| shipping_address | voucher  |
| return_address   | voucher  |
| province         |
| district         |
| neighborhood     |
| address          |
| full_name        | voucher  |
| email            | voucher  |
| phone            | voucher  |
| main             |
| finance          |
| operations       |
| sales            |
| other            |
| attachments      | [] or 🍳 |

### NOTE

- you can generate **new table** for all `contracts and Attachments files`
- we should create new `endpoint` for attachments files or images

## New Notes
- [] Page Search keywords 
- [] Pages (most like - most interactive - best seller)
- [] supplier page that has more details like videos and files
- [] enhance & maintain the view using `react-table` & `react-query`

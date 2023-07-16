export const permissions = {
  MODERATOR: ["VIEW"], // 2
  ADMIN: ["ADD", "VIEW", "EDIT", "DELETE"], //3
  SUPERADMIN: ["*"], //4
};

// Moderator can only view

// Admin can manage everything except:

// Addresses
// Countries
// Currency
// Languages
// Regions

// Editing Tables: user, user_type, user_wallet

// Super Admin can do whatever they want

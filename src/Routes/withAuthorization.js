import React from 'react'
import { Route } from 'react-router-dom';

import { ADMIN } from '../Api/globalActions';
import { PERMISSIONS } from './permissions';

export const withAuthorization = (component, rest) => {
  const { user, location, navigate, roles } = rest;
  const { pathname } = location;

  if (!user) {
    navigate('/login');
  }

  if (!roles?.includes(user?.role?.title) && !roles?.includes("*"))
    navigate("not-allowed")


  return component
}

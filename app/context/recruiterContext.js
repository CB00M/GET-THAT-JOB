"use client";

import React, { createContext, useState } from "react";

export const RecruiterContext = createContext();

export const RecruiterProvider = ({ children }) => {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addCompany = (newCompany) => {
    setCompany(newCompany);
  };
  const addEmail = (newEmail) => {
    setEmail(newEmail);
  };
  const addPassword = (newPassword) => {
    setPassword(newPassword);
  };
  return (
    <RecruiterContext.Provider
      value={{ company, addCompany, email, addEmail, password, addPassword }}
    >
      <div>{children}</div>
    </RecruiterContext.Provider>
  );
};

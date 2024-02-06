"use client";

import React, { createContext, useState } from "react";

export const ProfessionalContext = createContext();

export const ProfessionProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const addEmail = (newEmail) => {
    setEmail(newEmail);
  };
  const addPassword = (newPassword) => {
    setPassword(newPassword);
  };
  const addName = (newName) => {
    setName(newName);
  };
  const addPhoneNumber = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
  };
  const addBirthdate = (newBirthdate) => {
    setBirthdate(newBirthdate);
  };
  const addLinkedin = (newLinkedin) => {
    setLinkedin(newLinkedin);
  };
  return (
    <ProfessionalContext.Provider
      value={{
        email,
        addEmail,
        password,
        addPassword,
        name,
        addName,
        phoneNumber,
        addPhoneNumber,
        birthdate,
        addBirthdate,
        linkedin,
        addLinkedin,
      }}
    >
      <div>{children}</div>
    </ProfessionalContext.Provider>
  );
};

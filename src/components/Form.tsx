import React, { useState } from "react";

export const Form = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('email',email)
      console.log('password',password)
      reset()
    };
    
    const reset = () => {
        setEmail('');
        setPassword(''); 
    }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Registration</button>
    </form>
  );
};

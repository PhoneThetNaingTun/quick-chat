import React, { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}

const AuthLayout = ({ children }: Prop) => {
  return (
    <div className="flex justify-center items-center h-screen">{children}</div>
  );
};

export default AuthLayout;

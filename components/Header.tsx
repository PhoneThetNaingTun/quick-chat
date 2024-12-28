import React from "react";

export const Header = ({ title }: { title: string }) => {
  return <p className="text-xl font-semibold">{title}</p>;
};

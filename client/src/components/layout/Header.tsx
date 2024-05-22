import React from "react";
import { ThemeToggle } from "../buttons/theme-toggle";

export default function Header() {
  return (
    <div className='flex md:px-3 px-1 py-4 items-center justify-between'>
      <h2>Rapid Testo</h2>
      <ThemeToggle />
    </div>
  );
}

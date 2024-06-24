import React from "react";

function Footer() {
  return (
    <div className="bottom-0 w-full" style={{ boxShadow: "-4px -4px 14px blueviolet" }}>
      <footer className="py-8 bg-zinc-800">
        <div class="container">
          <p className="m-0 text-center font-semibold text-2xl" style={{ color: "blueviolet" }}>
            Copyright &copy; My ❤️ Website 2024
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

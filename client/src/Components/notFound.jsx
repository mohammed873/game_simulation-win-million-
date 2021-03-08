import React from "react";
import "../styles/notfound.css";
import { Link } from "react-router-dom";

export default function notFound() {
  return (
    <div className="notfound_container">
      <h1 className="error_number">404</h1>
      <h1>Page not found</h1>
      <Link to='/'>
        <button className="not_fount_btn">Go Back</button>
      </Link>
    </div>
  );
}

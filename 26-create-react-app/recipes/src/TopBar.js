import React, { Component } from "react";
import "./TopBar.css";

class TopBar extends Component {
  render() {
    return (
      <div className="topbar">
        <div className="topbar-left">
          <a href="/" className="topbar-logo">
            Recipe App
          </a>
        </div>
        <div className="topbar-right">
          <a href="/" className="topbar-items">New Recipe</a>
          <a href="/" className="topbar-items">Home</a>
          <a href="/" className="topbar-items">About</a>
          <a href="/" className="topbar-items">Contact Us</a>
        </div>
      </div>
    );
  }
}

export default TopBar;

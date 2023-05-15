import React, { Component } from "react";
import "./Recipe.css";

class Recipe extends Component {
  render() {
    const { image, title, instructions } = this.props;
    const ingredients = this.props.ingredients.map((ing, idx) => (
      <li key={idx}>{ing}</li>
    ));

    return (
      <div className="recipe">
        <img src={image} alt={title} />
        <div className="recipe-text">
          <h2>{title}</h2>
          <h4>Ingredients</h4>
          <ul>{ingredients}</ul>
          <h4>Instructions</h4>
          <p>{instructions}</p>
        </div>
      </div>
    );
  }
}

export default Recipe;

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Recipe.css";

class Recipe extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const { image, title, instructions } = this.props;
    const ingredients = this.props.ingredients.map((ingredient, idx) => (
      <li key={idx}>{ingredient}</li>
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

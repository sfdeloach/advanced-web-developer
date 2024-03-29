import React, { Component } from "react";
import PropTypes from "prop-types";
import Recipe from "./Recipe";
import "./RecipeList.css";

class RecipeList extends Component {
  static defaultProps = {
    recipes: [
      {
        title: "Pasta",
        ingredients: ["eggs", "flour", "water", "tomatoes"],
        image: "pasta.jpg",
        instructions:
          "Combine all listed ingredients in a bowl and mix it up, you fool.",
      },
      {
        title: "Milkshake",
        ingredients: ["milk", "ice cream", "chocolate syrup", "whipped cream"],
        image: "milkshake.jpg",
        instructions:
          "Combine all listed ingredients in a blender and blend it up, sucka.",
      },
      {
        title: "Avocado Toast",
        ingredients: ["avocados", "cilantro", "toast"],
        image: "toast.jpg",
        instructions:
          "Spread the first two ingredients on toast, and put it in your pie hole.",
      },
    ],
  };

  // static propTypes = {
  //   recipes: this.PropTypes.arrayOf(PropTypes.object),
  // };

  render() {
    return (
      <div className="list">
        {this.props.recipes.map((recipe, index) => (
          <Recipe key={index} {...recipe} />
        ))}
      </div>
    );
  }
}

export default RecipeList;

import {
  Link
} from "react-router-dom";
import "./Recipe.css";
import { ReactComponent as CorazonIcon }from '../assets/heart-5.svg';

function Recipe({recipe}) {
    return (
      <li key={recipe.id} className="recipe">
        <Link
          to={`/receta/${recipe.id}`}
          key={recipe.id}>
              <p className="recipeImg"><img src={recipe["main-img"]} alt="main"></img></p>
              <p className="recipeName">
                <p className="favoriteIcon">{recipe.fav ? <span><CorazonIcon /> </span> : ""}</p> 
                {recipe.name}
              </p>
        </Link>
      </li>
    );
  }

  export default Recipe;
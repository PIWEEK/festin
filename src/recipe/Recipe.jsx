import {
  Link
} from "react-router-dom";
import "./Recipe.css";

function Recipe({recipe}) {
    return (
      <Link
        to={`/receta/${recipe.id}`}
            key={recipe.id}>
        <li key={recipe.index} className="recipe">
            <p>Name: {recipe.name}</p>
            <p>Fav: {recipe.fav ? "Si" : "No"}</p>
            <p>Categoria: {recipe["main-tag"]}</p>
            <p>{recipe.tags.map(item=><span>{item}</span>)}</p>
        </li>
      </Link>
    );
  }

  export default Recipe;
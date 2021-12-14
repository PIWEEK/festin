import Recipe from "../recipe/Recipe";
function RecipeList({recipes}) {
    return (
        <ul>
            {recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe}/>)}
        </ul>
    );
  }

  export default RecipeList;
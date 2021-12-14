function Recipe({recipe}) {
    return (
      <li key={recipe.index} className="recipe">
          <p>Name: {recipe.name}</p>
          <p>Fav: {recipe.fav ? "Si" : "No"}</p>
          <p>Categoria: {recipe["main-tag"]}</p>
          <p>{recipe.tags.map(item=><span>{item}</span>)}</p>
      </li>
    );
  }

  export default Recipe;
function RecipeDetail({recipe}) {
    console.log("eyy, me renderizo")
    return (
        <>
            <p>Name: {recipe.name}</p>
            <p>Fav: {recipe.fav ? "Si" : "No"}</p>
            <p>Categoria: {recipe["main-tag"]}</p>
            <p>{recipe.tags.map(item=><span>{item}</span>)}</p>
        </>
    );
}

export default RecipeDetail;
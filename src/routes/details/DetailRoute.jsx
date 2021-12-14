import {
    Link,
    useParams
  } from "react-router-dom";
  import React, { useState, useEffect } from "react";


export default function Detail() {

    const [recipe, setRecipe] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let params = useParams();

    const baseUrl = `http://localhost:3004/recipes/?id=${params.recipeId}`
    const fetchRecipe = (url) => {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                setRecipe(data);
                setIsLoading(false);
            });
    };
    useEffect(() => {
        fetchRecipe(baseUrl);
    }, [baseUrl]);

    if(isLoading){
        return (
            <main style={{ padding: "1rem 0" }}>
                ...
              <Link to="/">Festín</Link>
            </main>
          );
    }
    console.log(params, baseUrl, recipe)
    const [thisRecipe] = recipe;
    console.log(thisRecipe);
    const {name, tags, fav } = thisRecipe;
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Detail</h2>
        <p>Name: {name}</p>

            <p>Fav: {fav ? "Si" : "No"}</p>
            <p>Categoria: {thisRecipe["main-tag"]}</p>
            <p>{tags.map(item=><span>{item}</span>)}</p>
        <Link to="/">Festín</Link>
      </main>
    );
  }
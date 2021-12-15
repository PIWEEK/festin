import {
    Link,
    useParams
  } from "react-router-dom";
  import React, { useState, useEffect } from "react";
  import "./DetailRecipe.css";


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

    if (isLoading) {
        return (
                <main style={{ padding: "1rem 0" }}>
                    ...
                    <Link to="/">Festín</Link>
                </main>
            );
    }
    const [thisRecipe] = recipe;
    const {name, tags, fav, ingredients, steps } = thisRecipe;
    const ingredientList = Object.keys(ingredients);
    const stepList = Object.values(steps);
    return (
        <div className="recipeWrapper">
            <aside className="imageAside" style={{
                    backgroundImage:`url('${thisRecipe["main-img"]}')`,
                }}>
                <Link to="/">
                    <span className="backLink">Festín</span>
                </Link>
                <img src={`url('${thisRecipe["main-img"]}')`}></img>
            </aside>
            <main className="recipeMain">
                <section className={`FrontRecipe ${thisRecipe["main-tag"]}`}>
                    <div className="PrepBar">
                        <div className="prepPartial">
                            <p className="prepText">Preparación</p>
                            <p className="prepText">{thisRecipe["prep-time"]}</p>
                        </div>
                        <div className="prepPartial">
                            <p className="prepText">Cocinado</p>
                            <p className="prepText">{thisRecipe["cook-time"]}</p>
                        </div>
                        <div className="prepPartial">
                            <p className="prepText">Total</p>
                            <p className="prepText">{thisRecipe["total-time"]}</p>
                        </div>
                    </div>
                    <div className="NameBar">
                        <h2 className="recipeTitle">{name}</h2>
                        <p>
                            {fav ?
                                <span className="tag">Preferidas</span> :
                                "" }
                            {tags.map(item=>
                                <span key={item} className="tag">{item}</span> )}
                        </p>
                    </div>
                </section>
                <section>
                    <p>Ingredientes</p>
                    <ul>
                        {ingredientList.map((ingr) => {
                            const cantidad = ingredients[ingr].quantity;
                            const unidad = ingredients[ingr].unit;
                            return(
                                <li key={ingr}>
                                    {`${ingr}: ${cantidad} ${unidad} `}
                                </li>
                            )
                        })}
                    </ul>
                </section>
                <section>
                    <p>Pasos</p>
                        <ul>
                            {stepList.map((step, index)=>{
                                return(
                                    <li key={index}>{step.text}</li>
                                )
                            })}
                        </ul>
                </section>
            </main>
        </div>
    );
}
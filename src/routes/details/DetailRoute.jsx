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
    const {name, tags, fav } = thisRecipe;
    return (
        <div className="recipeWrapper">
            <aside className="imageAside" style={{
                    backgroundImage:`url('${thisRecipe["main-img"]}')`,
                }}>
                <Link to="/">Festín</Link>
            </aside>
            <main>
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
                            <span className="tag">{fav ? "Preferidas" : ""}</span>
                            {tags.map(item=>
                                <span key={item} className="tag">{item}</span> )}
                        </p>
                    </div>
                </section>
                <section>
                    <p>Ingredientes</p>

                </section>
                <section>
                    <p>Pasos</p>

                </section>
            </main>
        </div>
    );
}
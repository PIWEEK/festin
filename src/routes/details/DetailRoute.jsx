import {
    Link,
    useParams
} from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./DetailRecipe.css";
import { ReactComponent as FestinLogo }from '../../assets/festinLogo.svg';
import { ReactComponent as EditIcon }from '../../assets/editIcon.svg';

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
                    <Link to="/">
                        <span className="backLink">
                            <FestinLogo />
                        </span>
                    </Link>
                </main>
            );
    }
    const [thisRecipe] = recipe;
    const {name, tags, fav, ingredients, steps, credits, other, remember, rations, id } = thisRecipe;
    const ingredientList = Object.keys(ingredients);
    const stepList = Object.values(steps);
    return (
        <div className="recipeWrapper">
            <aside className="imageAside" style={{
                    backgroundImage:`url('${thisRecipe["main-img"]}')`,
                }}>
                <Link to="/">
                    <span className="backLink">
                        <FestinLogo />
                        <div className="blur"></div>
                    </span>
                </Link>
            </aside>
            <main className="recipeMain">

                <section className={`FrontRecipe ${thisRecipe["main-tag"]}`}>
                        <Link to={`/editar/${id}`}
                            className={`editLink ${thisRecipe["main-tag"]}`}>
                            <EditIcon/>
                        </Link>
                    <div className="PrepBar">
                        <div className="prepPartial">
                            <p className={`prepText prepTitle ${thisRecipe["main-tag"]}`}>Preparación</p>
                            <p className={`prepText ${thisRecipe["main-tag"]}`}>{thisRecipe["prep-time"]}</p>
                        </div>
                        <div className="prepPartial">
                            <p className={`prepText prepTitle ${thisRecipe["main-tag"]}`}>Cocinado</p>
                            <p className={`prepText ${thisRecipe["main-tag"]}`}>{thisRecipe["cook-time"]}</p>
                        </div>
                        <div className="prepPartial">
                            <p className={`prepText prepTitle ${thisRecipe["main-tag"]}`}>Total</p>
                            <p className={`prepText ${thisRecipe["main-tag"]}`}>{thisRecipe["total-time"]}</p>
                        </div>
                        <div className="prepPartial">
                            <p className={`prepText prepTitle ${thisRecipe["main-tag"]}`}>Para</p>
                            <p className={`prepText ${thisRecipe["main-tag"]}`}>{rations} personas</p>
                        </div>
                    </div>
                    <div className="NameBar">
                        <h2 className="recipeTitle">{name}</h2>
                        {remember ? <p className={`rememberText ${thisRecipe["main-tag"]}`}>{remember}</p>: ""}
                        <p className="tagContainer">
                            {fav ?
                                <span className="tag">Preferidas</span> :
                                "" }
                            {tags.map(item=>
                                <span key={item} className="tag">{item}</span> )}
                        </p>
                    </div>
                </section>
                <section className="ingredientsRecipe">
                    <h1>Ingredientes</h1>
                    <ul className="ingredientsList">
                        {ingredientList.map((ingr) => {
                            const cantidad = ingredients[ingr].quantity;
                            const unidad = ingredients[ingr].unit;
                            return(
                                <li key={ingr}>
                                    <label htmlFor={ingr}>
                                        <input className="ingredientCheck" onClick={() =>{}} type="checkbox" name={ingr} id={ingr} />
                                        <span className="ingredientLabel">{`${ingr}: ${cantidad} ${unidad} `}</span>
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                </section>
                <section className="stepsRecipe">
                    <h1>Pasos</h1>
                        <p className="stepsList">
                            {stepList.map((step, index)=>{
                                return(
                                    <li className="steps" key={index}>{step.text}
                                        {step.img!== "-" ? <img className="stepImg" src={step.img} alt="step images"></img>: ""}
                                    </li>
                                )
                            })}
                        </p>
                </section>
                {other ? <p className={`otherText ${thisRecipe["main-tag"]}`}> {other}</p>: ""}
                {credits ? <p className={`creditsText ${thisRecipe["main-tag"]}`}> {credits}</p>: ""}
                <p></p>
            </main>
        </div>
    );
}

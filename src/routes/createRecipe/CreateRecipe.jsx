import {
    Link,
    useParams
} from "react-router-dom";
import defaultImg from "../../assets/images/defaultImg.png";
import React, { useState, useEffect } from "react";

import "./createRecipe.css";
import { ReactComponent as FestinLogo }from '../../assets/festinLogo.svg';

export default function CreateRecipe() {
    const [tags, setTags] = useState([]);
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [choosedSection, setChoosedSection] = useState("");

    const baseUrl = `http://localhost:3004`;
    const fetchTags = (url) => {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                setTags(data);
                setIsLoading(false);
            });
    };

    const fetchSections = (url) => {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setSections(data);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchTags(`${baseUrl}/tags`);
        fetchSections(`${baseUrl}/main-tags`);
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
    // const [thisRecipe] = recipe;
    // const {name, tags, fav, ingredients, steps, credits, other, remember, rations } = thisRecipe;
    // const ingredientList = Object.keys(ingredients);
    // const stepList = Object.values(steps);
    return (
        <>
        <nav className="navCreate">
            <Link to="/">
                <span className="backLink">
                    <FestinLogo />
                    <div className="blur"></div>
                </span>
            </Link>
            <h1 className="createTitle">Añadir Receta</h1>
        </nav>
        <div className="createRecipeWrapper">
            <aside className="imageAsideCreate"
                style={{backgroundImage:`url(${defaultImg})`,}}
                >
                <span className="imgInputWrapper">
                    <input className="inputInvisible imgInput" type="text" name="imagen" id="img" placeholder="Pega aquí la url de tu imagen" />
                </span>
            </aside>
            <main className="recipeMain">
                <div>
                    <p className="sectionsWrapper">
                        <span className="smallText">Tipo de receta {"  "}</span>
                        <span className="sectionsContainer">
                            {sections.map(section => {
                                    return <label key={section} htmlFor={section}>
                                        <input className="inputRadio" type="radio" onChange={() => setChoosedSection(section)} name="sectionName" id={section} value={section} />
                                        <span className={`labelAsSection ${section}`} >{section}</span>
                                    </label>
                                })}
                        </span>
                    </p>

                    <section className={`FrontRecipeCreate ${choosedSection}`}>
                        <div className="PrepBar">
                            <div className="prepPartial">
                                <p className={`prepText prepTitle`}>Preparación</p>
                                <p className={`prepText `}>
                                    <input className="inputInvisible " placeholder="20 minutos" type="number" name="prep-time" id="prep" />
                                    </p>
                            </div>
                            <div className="prepPartial">
                                <p className={`prepText prepTitle`}>Cocinado</p>
                                <p className={`prepText`}>
                                    <input className="inputInvisible" placeholder="30 minutos" type="number" name="cook-time" id="cook" />
                                </p>
                            </div>
                            <div className="prepPartial">
                                <p className={`prepText prepTitle`}>Total</p>
                                <p className={`prepText `}>
                                    <input className="inputInvisible" placeholder="50 minutos" type="number" name="total-time" id="total" />
                                </p>
                            </div>
                            <div className="prepPartial">
                                <p className={`prepText prepTitle`}>Para</p>
                                <p className={`prepText`}>
                                    <input className="inputInvisible rationInput" placeholder="4" type="number" name="rations" id="ration" />
                                    <span className="rationText">personas</span>
                                </p>
                            </div>
                        </div>
                        <div className="NameBar">
                            <h2 className="recipeTitle">
                                <input
                                    className="inputInvisible nombreInput"
                                    type="text"
                                    name="nombre"
                                    id="nombre-receta"
                                    placeholder="TÍTULO"/>
                            </h2>
                                <input
                                    className="inputInvisible rememberInput"
                                    type="text"
                                    name="remember"
                                    id="remember"
                                    placeholder="Tu nota para no olvidar antes de empezar a cocinar"/>

                            <p className="tagContainer">
                                {tags.map(tag =>
                                    <label htmlFor={tag}>
                                        <input className="inputCheck" type="checkbox" name={tag} id={tag} />
                                        <span className="labelAsButton" >{tag}</span>
                                    </label>
                                )}
                            </p>
                        </div>
                    </section>
                </div>
                <section className="ingredientsRecipe">
                    <h1>Ingredientes</h1>
                    <div>
                        <input type="text" name="ingrediente" id="ingr" placeholder="Ingrediente 1"/>
                        <input type="number" name="cantidad" id="quantity" placeholder="Cantidad"/>
                        <input type="text" name="unidades" id="unit" placeholder="Unidades"/>
                    </div>
                    <button>Nuevo ingrediente</button>
                </section>
                <section className="stepsRecipe">
                    <h1>Pasos</h1>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                        <button>Nuevo paso</button>
                </section>
                    <p>Notas finales</p>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <p>Credito</p>
                    <input type="text" name="" id="" />
                    <button type="submit">Guardar</button>
            </main>
        </div>
        </>
    );
}

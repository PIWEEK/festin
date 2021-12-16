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
    const [shown, setShow] = useState(false);

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
    console.log(choosedSection)
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
                <div className="recipeHeader">
                    <p className="sectionsWrapper">
                        <span className="smallText">Tipo de receta {"  "}</span>
                        <span className="sectionsContainer">
                            <label key="all" htmlFor="all">
                                <input className="inputRadio" type="radio" onClick={() => setChoosedSection("")} name="sectionName" id="all" value="all" />
                                <span className={`labelAsSection`} >Todas</span>
                            </label>
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
                                <p className={`prepText prepTitle ${choosedSection}`}>Preparación</p>
                                <p className={`prepText `}>
                                    <input className="inputInvisible timeInput" placeholder="20 minutos" type="text" name="prep-time" id="prep" />
                                    </p>
                            </div>
                            <div className="prepPartial">
                                <p className={`prepText prepTitle  ${choosedSection}`}>Cocinado</p>
                                <p className={`prepText`}>
                                    <input className="inputInvisible timeInput" placeholder="30 minutos" type="text" name="cook-time" id="cook" />
                                </p>
                            </div>
                            <div className="prepPartial">
                                <p className={`prepText prepTitle  ${choosedSection}`}>Total</p>
                                <p className={`prepText `}>
                                    <input className="inputInvisible timeInput" placeholder="50 minutos" type="text" name="total-time" id="total" />
                                </p>
                            </div>
                            <div className="prepPartial">
                                <p className={`prepText prepTitle  ${choosedSection}`}>Para</p>
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
                            <div className="tagsWrapper">
                                <p className={`helpText  ${choosedSection}`}>Tags (selecciona las que quieras.)</p>
                                <div className="tagContainerCreate">
                                    <span
                                        className="shownTags"
                                        // style={{visibility:`${shown? "": "hidden"}`}}>
                                            style={shown ? {visibility:"hidden", width: 0, height:0} : {}}>
                                        <label key={tags[0]} htmlFor={tags[0]}>
                                                    <input className="inputCheck" type="checkbox" name={tags[0]} id={tags[0]} />
                                                    <span className={`labelAsButtonCreate  ${choosedSection}`} >{tags[0]}</span>
                                        </label>
                                        <label key={tags[1]} htmlFor={tags[1]}>
                                                    <input className="inputCheck" type="checkbox" name={tags[1]} id={tags[1]} />
                                                    <span className={`labelAsButtonCreate  ${choosedSection}`} >{tags[1]}</span>
                                        </label>
                                        <label key={tags[2]} htmlFor={tags[2]}>
                                                    <input className="inputCheck" type="checkbox" name={tags[2]} id={tags[2]} />
                                                    <span className={`labelAsButtonCreate  ${choosedSection}`} >{tags[2]}</span>
                                        </label>
                                        <button
                                            style={{display:`${shown ? "none": "inline"}`}}
                                            className="showMore"
                                            onClick={() => setShow (true)}>Ver más
                                        </button>
                                    </span>
                                    <span className="hiddenTags" style={shown ? {}: {visibility:"hidden", width: 0, height:0} }>
                                        {tags.map((tag, index) =><label key={tag} htmlFor={tag}>
                                                    <input className="inputCheck" type="checkbox" name={tag} id={tag} />
                                                    <span className={`labelAsButtonCreate  ${choosedSection}`} >{tag}</span>
                                                </label>)}
                                        <label >
                                            <input className="inputCheck" type="checkbox" name={tags[2]} id={tags[2]} />
                                            <span className={`labelAsButtonCreate  ${choosedSection}`} >
                                                <input  type="text" placeholder="Crear Nueva" />
                                            </span>
                                        </label>
                                        <button
                                            style={shown ? {}: {visibility:"hidden", width: 0, height:0} }
                                            className="showLess"
                                            onClick={() => setShow (false)}>
                                                Ver menos
                                        </button>
                                    </span>
                                </div>
                            </div>
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

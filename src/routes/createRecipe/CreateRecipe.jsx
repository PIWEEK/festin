import {
    Link,
    useParams
} from "react-router-dom";
import defaultImg from "../../assets/images/defaultImg.png";
import React, { useState, useEffect } from "react";

import "./createRecipe.css";
import { ReactComponent as FestinLogo }from '../../assets/festinLogo.svg';
import { ReactComponent as CircleIcon }from '../../assets/circleIcon.svg';
import { ReactComponent as AddIcon }from '../../assets/add.svg';


export default function CreateRecipe() {
    const [tags, setTags] = useState([]);
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [choosedSection, setChoosedSection] = useState("");
    const [shown, setShow] = useState(false);
    const [ingredients, setIngredients] = useState([{name: "", quantity: "", unit: ""}]);
    const [steps, setSteps] = useState([{text:"", img: ""}]);

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

    const loadIngredComp = () => {
        const newIgrList = [...ingredients, {name: "", quantity: "", unit: ""}];
        setIngredients(newIgrList);
    }

    const IngredientComp = ({ingr, index}) => {
        return(
            <div>
                <input type="number" style={{display: "none"}} value={index}/>
                <span className="circleDot">
                    <CircleIcon />
                </span>
                <input
                    className="inputInvisible ingrInput"
                    type="text"
                    name="ingrediente"
                    id="ingr"
                    placeholder={`Ingrediente ${index}`}
                    defaultValue={ingr? ingr.name : ""}
                />
                <input
                    className="inputInvisible ingrInput"
                    type="number"
                    name="cantidad"
                    id="quantity"
                    placeholder="Cantidad"
                    defaultValue={ingr? ingr.quantity : ""}
                />
                <input
                    className="inputInvisible ingrInput"
                    type="text"
                    name="unidades"
                    id="unit"
                    placeholder="Unidades"
                    defaultValue={ingr? ingr.unit : ""}
                />
            </div>
        )
    };

    const loadStepComp = () => {
        const newStep = [...steps, {text: "", img:"-"}];
        setSteps(newStep);
    }

    const SetpComp = ({step, index}) => {
        return(
            <span className="stepWrapper">
                <textarea
                    placeholder={`Aquí el paso ${index+1} de tu receta`}
                    className="stepTextArea"
                    name={`step-text-${index}`}
                    id={`step-text-${index}`}
                    cols="30"
                    rows="3"/>
                <input
                    className="inputInvisible"
                    type="text"
                    name="stepImage"
                    id={`step-img-${index}`}
                    placeholder="Añade la foto de este paso" />
            </span>
        )
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
            <main className="recipeMainCreate">
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
                                    <span className="shownTags">
                                    {tags.map((tag, index) =>{
                                        if(index<=2){
                                                return <label key={tag}  className="non-hiddeable" htmlFor={tag}>
                                                        <input className="inputCheck" type="checkbox" name={tag} id={tag} />
                                                        <span className={`labelAsButtonCreate  ${choosedSection}`} >{tag}</span>
                                                    </label>
                                            }
                                            return <label key={tag}  style={{display:`${shown ? "inline": "none"}`}} className="hiddeable" htmlFor={tag}>
                                                <input className="inputCheck" type="checkbox" name={tag} id={tag} />
                                                <span className={`labelAsButtonCreate  ${choosedSection}`} >{tag}</span>
                                            </label>
                                        })}
                                        <button
                                            style={{display:`${shown ? "none": "inline"}`}}
                                            className="showMore"
                                            onClick={() => setShow (true)}>Ver más
                                        </button>
                                        <label style={shown ? {}: {visibility:"hidden", width: 0, height:0} } >
                                            <input className="inputCheck" type="checkbox" name={tags[2]} id={tags[2]} />
                                            <span className={`labelAsButtonCreate  ${choosedSection}`} >
                                                <input className="inputInvisible newTagInput" type="text" placeholder="Crear Nueva" />
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
                    <h1 className="ingredTitle">Ingredientes</h1>
                    <div>
                        {ingredients.map((ingr, index)=> <IngredientComp ingr={ingr} index={index}/>)}
                    </div>
                    <button className="loadIngrBtn" onClick={loadIngredComp}>
                        <AddIcon />
                        <span className="addText"> Añadir ingrediente </span>
                    </button>
                </section>
                <section className="stepsRecipe">
                    <h1 className="ingredTitle">Pasos</h1>
                    {steps.map((step, index)=> <SetpComp step={step} index={index}/>)}
                    <button className="loadIngrBtn" onClick={loadStepComp}>
                        <AddIcon />
                        <span className="addText"> Añadir Paso </span>
                    </button>
                </section>
                <section className="stepsRecipe">
                    <h1 className="ingredTitle">Notas finales</h1>
                    <textarea
                        placeholder="Escribe aquí cualquier detalle importante"
                        className="stepTextArea"
                        name=""
                        id="" cols="30" rows="3"></textarea>
                    <p>Credito</p>
                    <input
                        className="inputInvisible"
                        placeholder="¿De dónde es la receta?"
                        type="text"
                        name=""
                        id="" />
                    <span className="sendWrapper">
                        <button className="saveRecipe" type="submit">Guardar receta</button>
                    </span>
                </section>
            </main>
        </div>
        </>
    );
}

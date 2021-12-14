import React, { useCallback } from "react";
import './initialPage.css';


function InitialPage({sections, tags, manageInput, setToggleFav, setSelectedSection, setSelectedTags, selectedTags, toggleFav}) {
    const manageCheck = useCallback(
        (tag) => {
            if(selectedTags.includes(tag)){
                setSelectedTags(selectedTags.filter(item => item !== tag));
            } else {
                setSelectedTags([...selectedTags, tag].sort());
            }
        },
        [selectedTags, setSelectedTags],
    );

    const manageFavorite = useCallback(
        () => {
            setToggleFav(!toggleFav);
        },
        [toggleFav, setToggleFav],
    );

    return (
        <div className="initial">
            Aquí va el logo
            <div>
                <input className="searchBar" type="input" placeholder="Buscar recetas" onChange={manageInput} />
            </div>
            <ul className="tagSelection">
                <li>
                    <label className="labelAsButton" htmlFor="fav"><input className="inputCheck" type="checkbox" onClick={()=> manageFavorite()} name="favOption" id="fav" value="fav" />Preferidas</label>
                </li>
                {tags.map(tag => <li key={`tag-${tag}`}><label className="labelAsButton" htmlFor={tag}>
                  <input className="inputCheck" onClick={() => manageCheck(tag)} type="checkbox" name={tag} id={tag} />{tag}</label></li>)}
            </ul>
            <div className="sectionWrapper">
                <label  className="labelAsMenu" htmlFor="all"><input className="inputRadio" type="radio" onClick={()=> setSelectedSection("all")} name="sectionName" id="all" value="all" />Todas</label>
                {sections.map(section => {
                    return <label className="labelAsMenu" key={section} htmlFor={section}>
                    <input className="inputRadio" type="radio" onClick={()=> setSelectedSection(section)} name="sectionName" id={section} value={section} />{section}</label>
                })}
            </div>
        </div>

    );
}

export default InitialPage;
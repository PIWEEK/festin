import React, { useCallback } from "react";
import './initialPage.css';


function InitialPage({sections, tags, manageInput, setToggleFav, setSelectedSection, setSelectedTags, selectedTags}) {

    const manageSelectedTags = (selectedTags, tag) => {
        if(selectedTags.includes(tag)){
            setSelectedTags(selectedTags.filter(item => item !== tag));
        } else {
            setSelectedTags([...selectedTags, tag].sort());
        }
    };

    const memoizedCallback = useCallback(
        (tag) => {
            manageSelectedTags(selectedTags, tag);
        },
        [selectedTags, manageSelectedTags],
    );

    return (
        <div className="initial">
            Aquí va el logo
            <div>
                <input className="searchBar" type="input" placeholder="Buscar recetas" onChange={manageInput} />
            </div>
            <ul className="tagSelection">
                {tags.map(tag => <li key={`tag-${tag}`}><label className="labelAsButton" htmlFor={tag}>
                  <input className="inputCheck" onClick={() => memoizedCallback(tag)} type="checkbox" name={tag} id={tag} />{tag}</label></li>)}
            </ul>
            <label htmlFor="fav"><input type="radio" onClick={()=> setToggleFav("fav")} name="favOption" id="fav" value="fav" />Favoritas</label>
            <label htmlFor="nofav"><input type="radio" onClick={()=> setToggleFav("nofav")} name="favOption" id="nofav" value="nofav" />No Favoritas</label>
            <label htmlFor="all"><input type="radio" onClick={()=> setToggleFav("all")} name="favOption" id="all" value="all" />Todas</label>
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
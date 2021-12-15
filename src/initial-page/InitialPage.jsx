import React, { useCallback } from "react";

import { ReactComponent as FestinLogo }from '../assets/festinLogoBlack.svg';
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
            <span className="logoWrapper">
                <FestinLogo />
            </span>
            <div>
                <input className="searchBar" type="input" placeholder="Buscar recetas" onChange={manageInput} />
            </div>
            <ul className="tagSelection">
                <li className="tagWrapper">
                    <label htmlFor="fav">
                        <input className="inputCheck" type="checkbox" onClick={()=> manageFavorite()} name="favOption" id="fav"/>
                        <span className="labelAsButton" >Preferidas</span>
                    </label>
                </li>
                {tags.map(tag => <li className="tagWrapper" key={`tag-${tag}`}>
                        <label htmlFor={tag}>
                            <input className="inputCheck" onClick={() => manageCheck(tag)} type="checkbox" name={tag} id={tag} />
                            <span className="labelAsButton" >{tag}</span>
                        </label>
                    </li>
                )}

            </ul>
            <div className="sectionWrapper">
                <label htmlFor="all">
                    <input className="inputRadio" type="radio" onClick={()=> setSelectedSection("all")} name="sectionName" id="all" value="all" />
                    <span className="labelAsMenu All" >Todas</span>
                </label>
                {sections.map(section => {
                    return <label key={section} htmlFor={section}>
                        <input className="inputRadio" type="radio" onClick={()=> setSelectedSection(section)} name="sectionName" id={section} value={section} />
                        <span className={`labelAsMenu ${section}`} >{section}</span>
                    </label>
                })}
            </div>
        </div>

    );
}

export default InitialPage;
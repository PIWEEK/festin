import React, { useCallback } from "react";


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
        [selectedTags],
    );

    return (
        <div className="initial">
            Aquí va el logo
            <div>
                <input type="text" placeholder="Buscar recetas" onChange={manageInput} />
            </div>
            <ul>
                {tags.map(tag => <li key={`tag-${tag}`}><input onClick={() => memoizedCallback(tag)} type="checkbox" name={tag} id={tag} />{tag}</li>)}
            </ul>
            <label htmlFor="fav"><input type="radio" onClick={()=> setToggleFav("fav")} name="favOption" id="fav" value="fav" />Favoritas</label>
            <label htmlFor="nofav"><input type="radio" onClick={()=> setToggleFav("nofav")} name="favOption" id="nofav" value="nofav" />No Favoritas</label>
            <label htmlFor="all"><input type="radio" onClick={()=> setToggleFav("all")} name="favOption" id="all" value="all" />Todas</label>
            <div>
                {sections.map(section => {
                    return <label key={section} htmlFor={section}><input type="radio" onClick={()=> setSelectedSection(section)} name="sectionName" id={section} value={section} />{section}</label>
                })}
                <label  htmlFor="all"><input type="radio" onClick={()=> setSelectedSection("all")} name="sectionName" id="all" value="all" />Todas</label>
            </div>
        </div>

    );
}

export default InitialPage;
import React, { useState, useEffect } from "react";

import RecipeList from "../recipe-list/RecipeList";
import InitialPage from "../initial-page/InitialPage";

const RecipeManager = () => {
    const [recipes, setRecipes] = useState([]);
    const [favRecipes, setFavRecipes] = useState([]);
    const [tags, setTags] = useState([]);
    const [sections, setSections] = useState([]);
    const [error, setError] = useState({hasError: false, error: ""});

    const [toggleFav, setToggleFav] = useState(false);
    const [selectedSection, setSelectedSection] = useState("all");
    const [selectedTags, setSelectedTags] = useState([]);
    const [recipeName, setRecipeName] = useState("");

    const recipeUrl = "http://localhost:3004/recipes/";
    const favsUrl = "http://localhost:3004/recipes/?fav=true";
    const tagsUrl = "http://localhost:3004/tags";
    const sectionsUrl = "http://localhost:3004/main-tags";

    const fetchRecipes = (baseUrl, recipeName, toggleFav, section, selectedTags) => {
        const nameFilter = recipeName ? `name_like=${recipeName}` : "";

        const favFilter = toggleFav ? "fav=true" : "";

        const mainTagFilter = section !== "all" ? `main-tag_like=${section}` : "";

        const tagsFilter = selectedTags.length >= 0 ? `tags_like=${selectedTags.join()}` : "";

        const url = `${baseUrl}?${nameFilter}&${favFilter}&${mainTagFilter}&${tagsFilter}`;

        fetch(url)
            .then(response => response.json())
            .then((data) => {
                if(data) {setRecipes(data);}
                else {
                    setRecipes([])
                }
            })
            .catch(error => setError({hasError:true, error}));
    };

    const fetchFavs = (url) => {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                setFavRecipes(data);
            }).catch(error=>console.log(error));;
    };

    const fetchTags = (url) => {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                setTags(data);
            }).catch(error=>console.log(error));;
    };

    const fetchSections = (url) => {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                setSections(data);
            }).catch(error=>console.log(error));
    };

    useEffect(() => {
        fetchRecipes(recipeUrl, recipeName, toggleFav, selectedSection, selectedTags);
        fetchFavs(favsUrl);
        fetchTags(tagsUrl);
        fetchSections(sectionsUrl)
    }, [recipeUrl, recipeName, toggleFav, selectedSection, selectedTags]);

    const manageInput = (event) => {
        setRecipeName(event.currentTarget.value);
    };

    if(error.error) {
        return <>
            <InitialPage
                favs={[]}
                sections={[]}
                tags={[]}
                toggleFav={toggleFav}
                manageInput={manageInput}
                setToggleFav={setToggleFav}
                setSelectedSection={setSelectedSection}
                setSelectedTags={setSelectedTags}
                selectedTags={selectedTags}/>
                <RecipeList recipes={[]} />
        </>
    }

    return (
        <>
            <InitialPage
                favs={favRecipes}
                sections={sections}
                tags={tags}
                toggleFav={toggleFav}
                manageInput={manageInput}
                setToggleFav={setToggleFav}
                setSelectedSection={setSelectedSection}
                setSelectedTags={setSelectedTags}
                selectedTags={selectedTags}/>
                <RecipeList recipes={recipes} />
        </>
    );
};

export default RecipeManager;
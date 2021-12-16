import {
    Link,
    useParams
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import editImg from "../../assets/images/editImg.png";
import { ReactComponent as FestinLogo }from '../../assets/festinLogo.svg';
import "./editRecipe.css";

export default function EditRecipe() {
    return (
        <div className="recipeWrapperEdit">
                <Link to="/">
                    <span className="backLink">
                        <FestinLogo />
                        <div className="blur"></div>
                    </span>
                </Link>
            <main className="editPage" style={{backgroundImage:`url(${editImg})`,}}>
                <p className="upsText">¡Ups! Esta sección todavía se está cocinando</p>
        </main>
        </div>
    );
}

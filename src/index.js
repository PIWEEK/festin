import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Routes,
  Link
} from "react-router-dom";
import './index.css';
import App from './App';
import Detail from "./routes/details/DetailRoute";
import CreateRecipe from "./routes/createRecipe/CreateRecipe";
import EdirRecipe from "./routes/editRecipe/EditRecipe";


ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="receta" element={<Detail />} >
          <Route path=":recipeId" />
        </Route>
        <Route path="editar" element={<EdirRecipe />} >
          <Route path=":recipeId" />
        </Route>
        <Route path="crear" element={<CreateRecipe />} />
        <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>¡¡Ups! No hay nada aquí</p>
                <Link to="/">Volver</Link>
              </main>
            }
        />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);



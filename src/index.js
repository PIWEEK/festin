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
import RecipeDetail from "./recipe-detail/RecipeDetail";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="receta" element={<Detail />} >
          <Route path=":recipeId" element={<RecipeDetail />} />
        </Route>
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



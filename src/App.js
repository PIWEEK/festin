import './App.css';
import InitialPage from './initial-page/InitialPage';
import RecipeList from './recipe-list/RecipeList';

function App() {
  return (
    <div className="App">
      <h1>Festín</h1>
      <p>Una aplicación super guay de recetas</p>
      <InitialPage/>
      <RecipeList />
    </div>
  );
}

export default App;

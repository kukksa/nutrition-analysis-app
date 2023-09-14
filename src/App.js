import { useEffect, useState } from 'react';
import './App.css';
import { Nutrition } from './Nutrition';
import Swal from 'sweetalert2';
import Health from './vitam.jpg';
import Vitamins from './picvitam.jpg';
import { LoaderPage } from "./LoaderPage";


function App() {

const MY_ID = '431d9afd';
const MY_KEY = 'c77b770382dbb2b8ef449591ca1acefe';


const [mySearch, setMySearch] = useState(); 
const [myNutrition, setMyNutrition] = useState();
const [wordSubmitted, setWordSubmitted] = useState('');
const [stateLoader, setStateLoader] = useState(false);

useEffect(() => {
  const getNutrition = async (ingr) => {
    setStateLoader(true);
    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: "POST",
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ ingr: ingr })
          })
    if (response.ok) {
      setStateLoader(false);
      const data = await response.json();
setMyNutrition(data);
    } else {
      setStateLoader(false);
      Swal.fire('Please write the ingredient correctly');
    }
  }

  if (wordSubmitted !== '') {
    const ingr = wordSubmitted.split(/[,,;]/);
    getNutrition(ingr);
  }
}, [wordSubmitted]);

  const myNutritionSearch = e => {
    setMySearch(e.target.value)
  }
  
  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  return (
    <div>
      <div className='header'>
        <img src={Vitamins} alt="pic"/>
        <h1>You are what you eat</h1>
        <img src={Health} alt="pic" />
      </div>

      <form onSubmit={finalSearch}>
        <input placeholder='Ingredients' onChange={myNutritionSearch}  />
        <button>CHECK</button>
      </form>

      <div className='loader'>
        {stateLoader && <LoaderPage />}
      </div>

      <div>    
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
          .map(({ label, quantity, unit}) =>
          <Nutrition
          key = {label}
          label={label}
          quantity={quantity.toFixed(2)}
          unit={unit}/>
            )
        }
      </div>
    </div>
  )
}


export default App;




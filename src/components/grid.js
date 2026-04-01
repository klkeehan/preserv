import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Grid = ({ handleItem }) => {
  const [items, setItems] = useState([]);
  const [display, setDisplay] = useState([]);
  const [catDisplay, setCatDisplay] = useState([]);
  const [flag, setFlag] = useState(false);

  //fetching pantry items
  const fetchItems = async () => {
    try {
      const response = await axios.get('https://students.gaim.ucf.edu/~ka822136/preserv/backend/pantry.php');
      setItems(response.data);
      setDisplay(response.data);
      if(response.data.length > 0) {setFlag(true)};
      if(response.data.length === 0) {setFlag(false)};
    } catch (error) {console.error('Error fetching pantry items:', error)};
  };

  useEffect(() => {fetchItems()}, []);

  //search bar functionality
  const [search, setSearch] = useState('');
  
  const handleSearch = (e) => {
    if (e.target.value.length > 0) {
      const searchInput = e.target.value;
      setSearch(searchInput);
      const newItems = catDisplay.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
      setDisplay(newItems)
    } else {
      setSearch('');
      setDisplay(catDisplay);
    }
  };

  //category filters for data mapping
  const prodData = items.filter((item) => item.category === 'Produce');
  const proData = items.filter((item) => item.category === 'Proteins');
  const dairyData = items.filter((item) => item.category === 'Dairy');
  const grainData = items.filter((item) => item.category === 'Grains');
  const cannedData = items.filter((item) => item.category === 'Canned');
  const condData = items.filter((item) => item.category === 'Condiments');
  const bevData = items.filter((item) => item.category === 'Beverages');
  const frozData = items.filter((item) => item.category === 'Frozen');
  const snackData = items.filter((item) => item.category === 'Snacks');
  const otherData = items.filter((item) => item.category === 'Other');

  //category menu buttons styling and display change
  function handleCategory(type, id) {
    let btn = document.getElementById(id);
    for(var x=0; x<11; x++) {
      let homeButton = document.getElementById(0);
      homeButton.classList.add('cat-button');
      let button = document.getElementById(x);
      button.classList.remove('cat-button-clicked');
    };
    btn.classList.add('cat-button-clicked');
    setDisplay(type);
    setCatDisplay(type);
  };
    
  //jsx
  return (
    <div className='pantry'>
      <div className='pantry-header'>
        <h1>Pantry</h1>
        <input type="text" value={search} onChange={handleSearch} placeholder='Search' className='search-bar' />
      </div>
      <div className='cat-bar'>
        <button id='0' onClick={(e) => handleCategory(items, e.target.id)} className='cat-button-clicked'>All</button>
        <button id='1' onClick={(e) => handleCategory(prodData, e.target.id)} className='cat-button'>Produce</button>
        <button id='2' onClick={(e) => handleCategory(proData, e.target.id)} className='cat-button'>Proteins</button>
        <button id='3' onClick={(e) => handleCategory(dairyData, e.target.id)} className='cat-button'>Dairy</button>
        <button id='4' onClick={(e) => handleCategory(grainData, e.target.id)} className='cat-button'>Grains</button>
        <button id='5' onClick={(e) => handleCategory(cannedData, e.target.id)} className='cat-button'>Canned</button>
        <button id='6' onClick={(e) => handleCategory(condData, e.target.id)} className='cat-button'>Condiments</button>
        <button id='7' onClick={(e) => handleCategory(bevData, e.target.id)} className='cat-button'>Beverages</button>
        <button id='8' onClick={(e) => handleCategory(frozData, e.target.id)} className='cat-button'>Frozen</button>
        <button id='9' onClick={(e) => handleCategory(snackData, e.target.id)} className='cat-button'>Snacks</button>
        <button id='10' onClick={(e) => handleCategory(otherData, e.target.id)} className='cat-button'>Other</button>
      </div>
      <div className='pantry-grid'>
        {display.map((item) => (
          <div key={item.id} className='pantry-item'>
            <button onClick={() => handleItem(item)} className='pantry-button'><img src={item.image} className={item.item_status === '3' ? 'pantry-fresh' : item.item_status === '1' ? 'pantry-exp' : 'pantry-soon'} alt={item.name}></img>
            <p className='pantry-overlay'>{item.name}</p>
            </button>
          </div>
        ))}
      </div>
      <div className='spacer' style={{height:'220px'}}>
        <p className='hidden-txt'>hidden</p>
      </div>
      <h1 className={flag ? 'hidden-txt' : 'blank-txt'}>Add your first pantry item...</h1>
    </div>
  )
};

export default Grid;
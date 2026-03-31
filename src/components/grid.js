import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Grid = ({ handleItem }) => {
  const [items, setItems] = useState([]);
  const [display, setDisplay] = useState([]);
  const [flag, setFlag] = useState(false);
  
  //initializing category menu states for class //true=clicked
  const flags = new Array(10);
  flags[0] = true;
  for(var x=1; x<11; x++) {
    flags[x] = false;
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://students.gaim.ucf.edu/~ka822136/preserv/backend/pantry.php');
      setItems(response.data);
      setDisplay(response.data);
      if(response.data.length > 0) {setFlag(true)};
      if(response.data.length === 0) {setFlag(false)};
    } catch (error) {console.error('Error fetching pantry items:', error)};
  };

  useEffect(() => {
    fetchItems();
  }, []);

  //search bar functionality
  const [search, setSearch] = useState('');
  
  const handleSearch = (e) => {
    if (e.target.value.length > 0) {
      const searchInput = e.target.value;
      setSearch(searchInput);

      const newItems = items.filter((item) => 
      item.name.toLowerCase().includes(search.toLowerCase())
      );

      setDisplay(newItems)
    } else {
      setSearch('');
      setDisplay(items);
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

  function handleCategory(type, id) {
    for(var x=0; x<11; x++) {
      flags[x] = false;
    };
    flags[id] = true;
    console.log(id);
    console.log(flags[id]);
    console.log(flags[0]);
    setDisplay(type);
  };

    console.log(flags[1]);
    console.log(flags[0]);
    
  return (
    <div className='pantry'>
      <div className='pantry-header'>
        <h1>Pantry</h1>
        <input type="text" value={search} onChange={handleSearch} placeholder='Search' className='search-bar' />
      </div>
      <div className='cat-bar'>
        <button id='0' onClick={() => handleCategory(items, '0')} className={flags[0] ? 'cat-button-clicked' : 'cat-button'}>All</button>
        <button id='1' onClick={() => handleCategory(prodData, '1')} className={flags[1] ? 'cat-button-clicked' : 'cat-button'}>Produce</button>
        <button id='2' onClick={() => setDisplay(proData)} className='cat-button'>Proteins</button>
        <button id='3' onClick={() => setDisplay(dairyData)} className='cat-button'>Dairy</button>
        <button id='4' onClick={() => setDisplay(grainData)} className='cat-button'>Grains</button>
        <button id='5' onClick={() => setDisplay(cannedData)} className='cat-button'>Canned</button>
        <button id='6' onClick={() => setDisplay(condData)} className='cat-button'>Condiments</button>
        <button id='7' onClick={() => setDisplay(bevData)} className='cat-button'>Beverages</button>
        <button id='8' onClick={() => setDisplay(frozData)} className='cat-button'>Frozen</button>
        <button id='9' onClick={() => setDisplay(snackData)} className='cat-button'>Snacks</button>
        <button id='10' onClick={() => setDisplay(otherData)} className='cat-button'>Other</button>
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
}

export default Grid;
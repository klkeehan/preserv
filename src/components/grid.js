import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Grid = ({ handleItem }) => {
  const [items, setItems] = useState([]);
  const [display, setDisplay] = useState([]);
  const [catDisplay, setCatDisplay] = useState([]);
  const [newItems, setNewItems] = useState([]);
  //category filters for data mapping
  const [prodData, setProdData] = useState();
  const [proData, setProData] = useState();
  const [dairyData, setDairyData] = useState();
  const [grainData, setGrainData] = useState();
  const [cannedData, setCannedData] = useState();
  const [condData, setCondData] = useState();
  const [bevData, setBevData] = useState();
  const [frozData, setFrozData] = useState();
  const [snackData, setSnackData] = useState();
  const [otherData, setOtherData] = useState();

  //fetching pantry items
  const fetchItems = async () => {
    try {
      const response = await axios.get('https://students.gaim.ucf.edu/~ka822136/preserv/backend/pantry.php');
      setItems(response.data);
      /*
      if (items.length > 0) {
        setProdData(items.filter((item) => item.category === 'Produce'));
        setProData(items.filter((item) => item.category === 'Proteins'));
        setDairyData(items.filter((item) => item.category === 'Dairy'));
        setGrainData(items.filter((item) => item.category === 'Grains'));
        setCannedData(items.filter((item) => item.category === 'Canned'));
        setCondData(items.filter((item) => item.category === 'Condiments'));
        setBevData(items.filter((item) => item.category === 'Beverages'));
        setFrozData(items.filter((item) => item.category === 'Frozen'));
        setSnackData(items.filter((item) => item.category === 'Snacks'));
        setOtherData(items.filter((item) => item.category === 'Other'));
      };
      */
      setDisplay(response.data);
    } catch (error) {console.error('Error fetching pantry items:', error)};
  };

  useEffect(() => {fetchItems(); console.log(display)}, [items.length]);

  //search bar functionality
  const [search, setSearch] = useState('');
  
  /*
  const handleSearch = (e) => {
    if (e.target.value.length > 0) {
      const searchInput = e.target.value;
      setSearch(searchInput);
      setNewItems(catDisplay.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())));
      setDisplay(newItems)
    } else {
      setSearch('');
      setDisplay(catDisplay);
    }
  };
  */

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
        <input type="text" value={search} placeholder='Search' className='search-bar' />
      </div>

      {Array.isArray(items) && items.length === 0 && (<h1 className={'blank-txt'}>Add your first pantry item...</h1>)}
      <div className='pantry-grid'>
        {Array.isArray(display) && Array.isArray(items) && items.length > 0 && (display.map((item) => (
          <div key={item.id} className='pantry-item'>
            <button onClick={() => handleItem(item)} className='pantry-button'><img src={item.image} className={item.item_status === '3' ? 'pantry-fresh' : item.item_status === '1' ? 'pantry-exp' : 'pantry-soon'} alt={item.name}></img>
            <p className='pantry-overlay'>{item.name}</p>
            </button>
          </div>
        )))}
      </div>
      <div className='spacer' style={{height:'220px'}}>
        <p className='hidden-txt'>hidden</p>
      </div>
    </div>
  )
};

export default Grid;
import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Grid = ({handleItem}) => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://students.gaim.ucf.edu/~ka822136/preserv/pantry.php');
        setItems(response.data);
      } catch (error) {console.error('Error fetching items:', error);}
    };
    fetchItems();
  }, []);

  console.log(items);
  const [display, setDisplay] = useState([items]);
  console.log(display);

  //search bar functionality
  const [search, setSearch] = useState('');
  
  const handleSearch = (e) => {
    if (e.target.value.length > 0) {
      const searchInput = e.target.value;
      setSearch(searchInput);

      const newItems = items.filter((item) => 
      item.name.toLowerCase().includes(search.toLowerCase())
      );

      setItems(newItems)
    } else {
      setSearch('');
      setItems(items);
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
    
  return (
    <div className='pantry'>
      <div className='pantry-header'>
        <h1>Pantry</h1>
        <input type="text" value={search} onChange={handleSearch} placeholder='Search' className='search-bar' />
      </div>
      <div className='cat-bar'>
        <button onClick={() => setItems(display)} className='cat-button'>All</button>
        <button onClick={() => setItems(prodData)} className='cat-button'>Produce</button>
        <button onClick={() => setItems(proData)} className='cat-button'>Proteins</button>
        <button onClick={() => setItems(dairyData)} className='cat-button'>Dairy</button>
        <button onClick={() => setItems(grainData)} className='cat-button'>Grains</button>
        <button onClick={() => setItems(cannedData)} className='cat-button'>Canned</button>
        <button onClick={() => setItems(condData)} className='cat-button'>Condiments</button>
        <button onClick={() => setItems(bevData)} className='cat-button'>Beverages</button>
        <button onClick={() => setItems(frozData)} className='cat-button'>Frozen</button>
        <button onClick={() => setItems(snackData)} className='cat-button'>Snacks</button>
        <button onClick={() => setItems(otherData)} className='cat-button'>Other</button>
      </div>
      <div className='pantry-grid'>
        {items.map((item) => (
          <div key={item.id} className='pantry-item'>
            <button onClick={() => handleItem(item)} className='pantry-button'><img src={item.image} className={item.status === 'FRESH' ? 'pantry-fresh' : item.status === 'EXPIRED' ? 'pantry-exp' : 'pantry-soon'} alt={item.name}></img>
            <p className='pantry-overlay'>{item.name}</p>
            </button>
          </div>
        ))}
        <div className='spacer' style={{height:'225px'}}></div>
      </div>
    </div>
  )
}

export default Grid;
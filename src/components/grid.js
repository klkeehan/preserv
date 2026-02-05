import '../App.css';
import pantrySet from '../data/pantry.json';
import { useState } from 'react';

const Grid = ({handleItem}) => {
    //search bar functionality
    const [search, setSearch] = useState('');
    const [items, setItems] = useState(pantrySet);
    
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
            setItems(pantrySet);
        }
    };

    //category filters for data mapping
    const prodData = pantrySet.filter((item) => item.category === 'Produce');
    const proData = pantrySet.filter((item) => item.category === 'Proteins');
    const dairyData = pantrySet.filter((item) => item.category === 'Dairy');
    const grainData = pantrySet.filter((item) => item.category === 'Grains');
    const cannedData = pantrySet.filter((item) => item.category === 'Canned');
    const condData = pantrySet.filter((item) => item.category === 'Condiments');
    const bevData = pantrySet.filter((item) => item.category === 'Beverages');
    const frozData = pantrySet.filter((item) => item.category === 'Frozen');
    const snackData = pantrySet.filter((item) => item.category === 'Snacks');
    const otherData = pantrySet.filter((item) => item.category === 'Other');
    
    return (
        <div className='pantry'>
            <div className='pantry-header'>
                <h1>Pantry</h1>
                <input type="text" value={search} onChange={handleSearch} placeholder='Search' className='search-bar' />
            </div>
            <div className='cat-bar'>
                <button onClick={() => setItems(pantrySet)} className='cat-button'>All</button>
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
                <div className='spacer' style={{height:'210px'}}></div>
            </div>
        </div>
    )
}

export default Grid;
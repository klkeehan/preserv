import '../App.css';

const Item = () => {
    return (
        <div>
            <div>
                <img></img>
                <aside>
                    <button>Edit</button>
                    <button>Trash</button>
                    <button>Cart</button>
                </aside>
            </div>
            <p>{item.status}</p>
            <h3>Item Name:</h3>
            <p>{item.name}</p>
            <h3>Amount:</h3>
            <p>{item.quantity}</p>
            <button>up</button>
            <button>down</button>
        </div>
    );
}

export default Item;
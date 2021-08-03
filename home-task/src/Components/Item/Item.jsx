import { useState } from 'react';
import './Item.scss';

function Item({ id, img, name, prise, title, sale, discount, callbackAddToCart }) {

    const [count, setCount] = useState(1)

    function addToCart() {
        callbackAddToCart(id - 1, count)
    }
    function addCount() {
        setCount(count + 1)
    }

    function subtractCount() {
        if (count < 1) {
            setCount(count)
        } else {
            setCount(count - 1)
        }
    }

    return (
        <div className="content">
            <div className="image">
                <img src={img} alt="pictures" />
            </div>
            <div className="description">
                <div className="name-item">
                    {name}
                </div>
                <div className="length-and-prise">
                    <h4>Choose your length</h4>
                    <select name="" id="">
                        <option value="50">50CM / 20 INCHES</option>
                        <option value="60">60CM / 24 INCHES</option>
                        <option value="70">70CM / 28 INCHES</option>
                        <option value="80">80CM / 31 INCHES</option>
                    </select>
                    <div className="prise">${discount}<span>Tax included</span></div>
                    <div className={`prise-not-sale ${sale}`}>${prise}</div>
                </div>
                <div className="add-to-cart">
                    <div className="count">
                        <div className="subtract" onClick={subtractCount}>-</div>
                        <div className="count-number">{count}</div>
                        <div className="add" onClick={addCount}>+</div>
                    </div>
                    <button onClick={addToCart}>Add To Cart</button>
                </div>
                <div className="title">
                    {title}
                </div>
            </div>
        </div>
    )
};

export default Item;
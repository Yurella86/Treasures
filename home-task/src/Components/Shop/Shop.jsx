import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Shop.scss';

function Shop({ id, img, name, prise, sale, discount, callbackOpenItem, callbackAddToCart }) {

    const [count, setCount] = useState(1)

    function openItem() {
        callbackOpenItem(id);
    }

    function addToCart() {
        callbackAddToCart(id - 1, count)
    }

    function addCount() {
        setCount(count + 1)
    }

    function subtractCount() {
        if (count < 2) {
            setCount(count)
        } else {
            setCount(count - 1)
        }
    }

    return (
        <div className="item">
            <div className="opacity-wrapper-item">
                <div className="button-open">
                    <NavLink to='/item' onClick={openItem}>Open</NavLink>
                </div>
            </div>

            <div className="item-image">
                <img src={`${img}`} alt="imag" />
                <div className={`sale ${sale}`}>SALE <span>-68%</span></div>
            </div>

            <div className="item-info">
                <div className="title">
                    {name}
                </div>
                <div className="length-and-prise">
                    <h5>Choose your length</h5>
                    <select name="" id="">
                        <option value="50">50CM / 20 INCHES</option>
                        <option value="60">60CM / 24 INCHES</option>
                        <option value="70">70CM / 28 INCHES</option>
                        <option value="80">80CM / 31 INCHES</option>
                    </select>
                    <div className="prise">${discount} <span className={`${sale}`}>${prise}</span> </div>
                </div>
                <div className="add-to-cart">
                    <div className="count">
                        <div className="subtract" onClick={subtractCount} >-</div>
                        <div className="count-number">{count}</div>
                        <div className="add" onClick={addCount}>+</div>
                    </div>
                    <button onClick={addToCart}>Add To Cart</button>
                </div>

            </div>

        </div >
    )
};

export default Shop;
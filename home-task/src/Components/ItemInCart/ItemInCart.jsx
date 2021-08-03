import { useEffect, useState } from 'react';
import './ItemInCart.scss';

function ItemInCart({ id, img, name, prise, sale, discount, delItemId, countItems }) {

    const [count, setCount] = useState(1)

    function add() {
        setCount(count + 1)
    }

    function subtract() {
        if (count < 2) {
            delItemId(id)
        } else {
            setCount(count - 1)
        }
    }

    useEffect(() => {
        setCount(Number(countItems))
    }, [countItems])

    return (
        <div className="wrapper-curt-item">
            <div className="curt-item">
                <div className="curt-item-image">
                    <img src={img} alt="pictures" />
                </div>

                <div className="curt-item-description">
                    <div className="description">
                        {name}
                    </div>
                    <div className="prise">${discount}<span className={`${sale}`}>${prise}</span></div>
                    <div className="quantity">
                        <div className="subtract" onClick={subtract}>-</div>
                        <div className="count-number">{count}</div>
                        <div className="add" onClick={add}>+</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ItemInCart;
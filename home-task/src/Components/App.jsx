import React, { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import './App.scss';
import Item from "./Item/Item";
import ItemInCart from "./ItemInCart/ItemInCart";
import Shop from "./Shop/Shop";

function App() {

  const getUrl = 'https://606efbdf0c054f001765814c.mockapi.io/api/v1/ancient-treasures'

  const [arrayJson, setArrayJson] = useState([])
  const [listInCart, setListInCart] = useState([])
  const [openPageItem, setOpenPageItem] = useState()
  const [windowCart, setWindowCart] = useState({ open: true, class: '' })

  function openCart() {
    if (windowCart.open) {
      setWindowCart({ open: windowCart.open = false, class: 'open-curt' })
    } else {
      setWindowCart({ open: windowCart.open = true, class: '' })
    }
  }

  function showNumberInCart() {
    if (listInCart.length) {
      return "show"
    }
  }

  function addToCartItem(addId, count) {
    arrayJson[addId].count = count
    setListInCart(arr => [...arr, arrayJson[addId]])
    console.log(arrayJson[addId]);
  }

  function handleRemoveItem(itemId) {
    setListInCart(listInCart.filter(el => el.id != itemId))
  }

  function getFetch() {
    fetch(getUrl)
      .then(response => response.json())
      .then(body => {
        setArrayJson(body);
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getFetch()
  }, [])

  return (<BrowserRouter>
    <div className={`wrapper ${windowCart.class}`}>

      <div className="wrapper-cart">
        <div className="cart">
          <div className="cart-header">
            <div className="quantity-items">CART ({listInCart.length} ITEMS)</div>
            <div className="icon-close" onClick={openCart}>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="cart-items">
            {listInCart.map((el) => {
              return <ItemInCart
                id={el.id}
                img={el.img}
                name={el.name}
                prise={el.prise}
                sale={el.sale}
                countItems={el.count}
                discount={el.sale ? el.prise / 100 * 32 : el.prise}
                delItemId={(ItemId) => handleRemoveItem(ItemId)} />
            })}
          </div>
          <div className="cart-footer">
            <div className="prise">
              <div>Subtotal</div>
              <div>$144.95</div>
            </div>
            <div className="buttons">
              <button>View cart</button>
              <button>Proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="header">
        <div className={`header-wrapper`}>
          <div className="burger">
            <div className="menu-icon">
              <span></span>
            </div>
          </div>
          <div className="logo">
            <NavLink to='/'>Start Shopping</NavLink>
          </div>
          <div className="nav-box">
            <div className="nav-item">
              <div><NavLink to='/shop'>Vikings</NavLink></div>
              <div><NavLink to='/shop'>Ancient Egypt</NavLink></div>
              <div><NavLink to='/shop'>Celtics</NavLink></div>
              <div><NavLink to='/sale'>Sale</NavLink></div>
            </div>
            <div className="search" ></div>
            <div className="basket" onClick={openCart} >
              <div className={`items-inside ${showNumberInCart()}`}><span>{`${listInCart.length}`}</span></div>
            </div>
          </div>
        </div>
      </div>

      <Route path='/sale'
        render={() =>
          <div className={`wrapper-items`}>
            {arrayJson.filter((e) => e.sale).map((e) => {
              return <Shop
                id={e.id}
                img={e.img}
                name={e.name}
                prise={e.prise}
                title={e.title}
                sale={e.sale}
                discount={e.sale ? e.prise / 100 * 32 : e.prise}
                callbackOpenItem={(whichItemId) => {
                  setOpenPageItem(arrayJson[whichItemId - 1])
                }}
                callbackAddToCart={(addId) => {
                  addToCartItem(addId)
                }}
              />
            })}
          </div>} />

      <Route path='/item'
        render={() =>
          <div className={`wrapper-item`}>
            <Item
              id={openPageItem.id}
              img={openPageItem.img}
              name={openPageItem.name}
              prise={openPageItem.prise}
              title={openPageItem.title}
              sale={openPageItem.sale}
              discount={
                openPageItem.sale ?
                  openPageItem.prise / 100 * 32 :
                  openPageItem.prise}
              callbackAddToCart={(addId, count) => {
                addToCartItem(addId, count)
              }}
            />
          </div>} />

      <Route path='/shop'
        render={() =>
          <div className={`wrapper-items `}>
            {arrayJson.map((e) => {
              return <Shop
                id={e.id}
                img={e.img}
                name={e.name}
                prise={e.prise}
                title={e.title}
                sale={e.sale}
                discount={e.sale ? e.prise / 100 * 32 : e.prise}
                callbackOpenItem={(whichItemId) => {
                  setOpenPageItem(arrayJson[whichItemId - 1])
                }}
                callbackAddToCart={(addId, count) => {
                  console.log(addId, count);
                  addToCartItem(addId, count)
                }}
              />
            })}
          </div>} />

      <div className={`wrapper-content`}>
        <div className="content">
          <div className={``}></div>
          <div className="front-gradient">
            <div className='gradient-left'></div>
            <div className='gradient-center'></div>
            <div className='gradient-right'></div>
          </div>
          <div className="content-center"></div>
          <div className='content-title'>
            <div className="title">
              Fenrir The Monster Wolf of Norse Mythology Necklace
            </div>
          </div>
          <div className="prise">$19.95<span>$29.95</span></div>
          <div className="button-box">
            <button><NavLink to='/shop'>Start Shopping</NavLink></button>
          </div>
        </div>

      </div>
    </div>
  </BrowserRouter>
  );

}

export default App;

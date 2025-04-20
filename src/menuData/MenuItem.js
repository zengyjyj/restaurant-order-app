import React, { useContext } from 'react';
import { CartContext } from '../context/PanierContext';
import './MenuItem.css';

const MenuItem = ({ name, description, image, temps, poids, prix,category }) => {
  const { addToCart, removeFromCart, cart } = useContext(CartContext);

  const quantity = cart[name]?.quantity || 0;

  return (
    <div className="menu-item">
      <img src={image} alt={name} className="menu-item-img" />
      <div className="menu-item-info">
        <p1><strong>{name}</strong> : {description} </p1>
        {category !== 'Bouillons' && (
          <>
            <p><strong>Temps :</strong> {temps} </p>
            <p><strong>Poids :</strong> {poids} </p>
          </>
        )}
        <p><strong>Prix :</strong> {prix} €</p>
        <div className="quantity-control">
          <button onClick={() => removeFromCart({ name })}>-</button>
          <span>{quantity}</span>
          <button onClick={() => addToCart({ name, description, image, temps, poids, prix,category })}>+</button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;

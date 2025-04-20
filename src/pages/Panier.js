import React, { useContext, useState } from 'react';
import { CartContext } from '../context/PanierContext';
import { Link } from 'react-router-dom';
import './Panier.css';

const Panier = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const orderedCategories = ['Bouillons', 'Viandes', 'Légumes', 'Accompagnements'];
  const [nbPersonnes, setNbPersonnes] = useState(1);

  const groupedItems = Object.values(cart).reduce((acc, item) => {
    const category = item.category || 'Autres';  
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const isEmpty = Object.keys(cart).length === 0;
  //compter les bouillons dans le panier
  const nombreBouillons = Object.values(cart).filter(item => item.category === 'Bouillons')
  .reduce((acc, item) => acc + item.quantity, 0);


  // Calcul le montant total
  const total = Object.values(cart).reduce((acc, item) => {
    return acc + item.prix * item.quantity;}, 0);


  return (
    <div className="panier-container">
      <div className="panier-headline">
        <h2>Mon Panier</h2>
      </div>
      <div className="bouillon-ligne">
        {/* Champ pour saisir le nombre de personnes */}
        <div className="champ-personnes">
            <label>Nombre de personnes :</label>
            <input
                type="number"
                min="1"
                value={nbPersonnes}
                onChange={(e) => setNbPersonnes(parseInt(e.target.value))}
            />
        </div>
        {/* Alerte si le nombre de bouillons est incorrect et lien vers le page bouillon */}
        {nombreBouillons !== nbPersonnes && (
            <p className="alerte-bouillon">
                Il faut choisir un seul bouillon par personne ({nombreBouillons}/{nbPersonnes})
            </p>
        )} 
        </div>

    {/* Panier vide */}
      {isEmpty ? (
        <div className="panier-vide">
          <p>Votre panier est vide 🛒</p>
          <Link to="/menu" className="retour-menu-btn">Voir le menu</Link>
        </div>
      ) : (
        <main className="panier-content">
         {orderedCategories.map((category) => {
            const items = groupedItems[category];

            return (
                /* Chaque categorie */
                <div key={category} className="panier-categorie-section">
                <div className="panier-categorie-header">
                    <Link to={`/menu#${category.toLowerCase()}`} className="panier-categorie-lien">
                    {category}
                    </Link>
                </div>

                {/* item d'une categorie */}
                {items ? (
                    <div className="panier-items-grid">
                    {items.map((item, i) => (
                        <div key={i} className="panier-item">
                        <img src={item.image} alt={item.name} className="panier-item-img" />
                        <div className="panier-item-info">
                            <h4>{item.name}</h4>
                            <p>Prix: {item.prix} €</p>
                            <div className="quantite-control">
                            <button onClick={() => removeFromCart({ name: item.name })}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => addToCart(item)}>+</button>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="categorie-vide-texte">Aucun article sélectionné.</p>
                )}
                </div>
            );
            })}
          <div className="panier-total">
            <h3>Total : {total.toFixed(2)} €</h3>
          </div>
        </main>
      )}
    </div>
  );
};

export default Panier;

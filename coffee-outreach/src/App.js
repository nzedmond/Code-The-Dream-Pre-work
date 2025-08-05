import React, { useState, useEffect } from 'react';

function App() {
  const [coffeeType, setCoffeeType] = useState(null); // Hot or Iced
  const [coffees, setCoffees] = useState([]); // List of coffees
  const [selectedCoffee, setSelectedCoffee] = useState(null); // Selected coffee
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch coffee data based on type (hot or iced)
  useEffect(() => {
    if (coffeeType) {
      setLoading(true);
      setError(null);
      const url = `https://api.sampleapis.com/coffee/${coffeeType.toLowerCase()}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch coffee data');
          return response.json();
        })
        .then((data) => {
          setCoffees(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [coffeeType]);

  // Handle coffee type selection
  const handleTypeSelect = (type) => {
    setCoffeeType(type);
    setSelectedCoffee(null); // Reset selected coffee when type changes
  };

  // Handle coffee selection
  const handleCoffeeSelect = (coffee) => {
    setSelectedCoffee(coffee);
  };

  return (
    <div className="app">
      <header>
        <h1>Free Coffee Outreach</h1>
        <p>Welcome to our community project! Enjoy a free coffee on us.</p>
      </header>

      {!coffeeType ? (
        <div className="selection">
          <h2>Would you like hot or iced coffee?</h2>
          <button onClick={() => handleTypeSelect('Hot')}>Hot Coffee</button>
          <button onClick={() => handleTypeSelect('Iced')}>Iced Coffee</button>
        </div>
      ) : (
        <div className="coffee-list">
          <h2>{coffeeType} Coffee Menu</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && coffees.length === 0 && (
            <p>No coffees available.</p>
          )}
          {!loading && !error && coffees.length > 0 && (
            <div>
              <p>Select a coffee (it's free!):</p>
              <div className="coffee-options">
                {coffees.map((coffee) => (
                  <button
                    key={coffee.id}
                    onClick={() => handleCoffeeSelect(coffee)}
                    className={selectedCoffee?.id === coffee.id ? 'selected' : ''}
                  >
                    {coffee.title}
                  </button>
                ))}
              </div>
            </div>
          )}
          {selectedCoffee && (
            <div className="coffee-details">
              <h3>{selectedCoffee.title}</h3>
              <p><strong>Ingredients:</strong> {selectedCoffee.ingredients.join(', ')}</p>
              <p><strong>Description:</strong> {selectedCoffee.description}</p>
              <p className="free">This coffee is free as part of our community outreach!</p>
            </div>
          )}
          <button className="back" id='backToMenu' onClick={() => setCoffeeType(null)}>
            Back to Coffee Type
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
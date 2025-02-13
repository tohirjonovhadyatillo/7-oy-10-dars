import React, { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-400 flex items-center gap-2">
            <Coins className="w-8 h-8" />
            CRYPTOFOLIO
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Watch List
          </button>
        </div>
      </header>

      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">CRYPTOFOLIO WATCH LIST</h1>
          <p className="text-xl text-gray-400 mb-8 text-center">
            Get All The Info Regarding Your Favorite Crypto Currency
          </p>

          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {coins.slice(0, 4).map((coin) => (
                <div key={coin.id} className="bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-10 h-10 mr-3"
                    />
                    <div>
                      <h3 className="font-bold">{coin.name}</h3>
                      <p className="text-gray-400">{coin.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">${coin.current_price.toLocaleString()}</div>
                  <div
                    className={`text-lg ${
                      coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h > 0 ? "▲" : "▼"}{" "}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Top Cryptocurrencies</h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-3 px-4 text-left">Coin</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-right">24h Change</th>
                  <th className="py-3 px-4 text-right">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin) => (
                  <tr
                    key={coin.id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                  >
                    <td className="py-4 px-4 flex items-center">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 mr-2"
                      />
                      <span className="font-medium">{coin.name}</span>
                      <span className="text-gray-400 ml-2">{coin.symbol.toUpperCase()}</span>
                    </td>
                    <td className="py-4 px-4 text-right">${coin.current_price.toLocaleString()}</td>
                    <td
                      className={`py-4 px-4 text-right ${
                        coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="py-4 px-4 text-right">${coin.market_cap.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 Cryptofolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

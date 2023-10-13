import React, { useState, useEffect, useContext } from 'react';

// MVC modelimiz
const Model = {
  data: [],
  fetchData: () => {
    // API'den veri çekme işlemi
    // Örnek: const response = await fetch('api/data');
    // Model.data = response.data;
  },
};

// View bileşeni
const View = () => {
  const { data, fetchData } = useContext(ModelContext);

  useEffect(() => {
    fetchData(); // Veriyi getirme işlemi
  }, []);

  return (
    <div>
      <h1>Veri Listesi</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Controller bileşeni
const Controller = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Model.fetchData();
    setData(Model.data);
  }, []);

  return (
    <ModelContext.Provider value={{ data, fetchData: Model.fetchData }}>
      <View />
    </ModelContext.Provider>
  );
};

const ModelContext = React.createContext();

function App() {
  return (
    <div className="App">
      <ModelContext.Provider value={Model}>
        <Controller />
      </ModelContext.Provider>
    </div>
  );
}

export default App;
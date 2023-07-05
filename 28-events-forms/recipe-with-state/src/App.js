import { useState } from 'react';
import ThemeContext from './contexts/Theme';
import Navbar from './Navbar';
import Content from './Content';

function App() {
  const [theme, setTheme] = useState('light');
  const [page, setPage] = useState('list');

  return (
    <ThemeContext.Provider value={theme}>
      <Navbar
        onThemeClick={() => {
          theme === 'light' ? setTheme('dark') : setTheme('light');
        }}
        onAddClick={() => {
          setPage('form');
        }}
      />
      <Content
        router={page}
        onReturnClick={() => {
          setPage('list');
        }}
      />
    </ThemeContext.Provider>
  );
}

export default App;

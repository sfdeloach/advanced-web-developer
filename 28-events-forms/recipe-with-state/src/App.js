import { useState } from 'react';
import ThemeContext from './contexts/Theme';
import Navbar from './Navbar';
import Content from './Content';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <Navbar
        onThemeClick={() => {
          theme === 'light' ? setTheme('dark') : setTheme('light');
        }}
      />
      <Content />
    </ThemeContext.Provider>
  );
}

export default App;

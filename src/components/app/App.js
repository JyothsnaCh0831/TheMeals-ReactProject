import './App.css';
import Meals from '../categories/categories';
import MainComponent from '../main-component/main-component';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <MainComponent />
    </CookiesProvider>
  );
}

export default App;

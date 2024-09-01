import './App.scss';
import { HeaderComponent } from './header/Header.component';
import { LeftBarComponent } from './leftbar/LeftBar.component';

function App() {
  return (
    <div className="page-container">
      <HeaderComponent />
      <div className="main-container">
        <LeftBarComponent />
      </div>
    </div>
  );
}

export default App;

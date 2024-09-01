import './App.scss';
import { DetailsComponent } from './details/Details.component';
import { HeaderComponent } from './header/Header.component';
import { LeftBarComponent } from './leftbar/LeftBar.component';

function App() {
  return (
    <div className="page-container">
      <HeaderComponent />
      <div className="main-container">
        <LeftBarComponent />
        <DetailsComponent />
      </div>
    </div>
  );
}

export default App;

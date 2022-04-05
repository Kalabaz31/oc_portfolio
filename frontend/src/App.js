import "./App.scss";

import { Hero, Navbar, Works,About, SmoothScroll, Contact } from "./components";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Works />
      <About />
      <Contact />
    </div>
  );
}

export default App;

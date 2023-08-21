// <<<<<<< HEAD
// import Login from "./components/Login/Login";
// import MainHeader from "./components/MainHeader/MainHeader";

// const App =()=>{
//   return <div>
//     <MainHeader />
//     <Login />
//   </div>
// =======

import LeftMenuBar from "./components/leftMenu/LeftMenuBar";
 import Login from "./components/Login/Login";


function App() {
  return (
    <div className="App">
      <LeftMenuBar />
      {/* <Login /> */}
    </div>
  );
  }

export default App;
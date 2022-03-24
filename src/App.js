import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import AddRegPayment from './components/AddRegPayment';
import AddSubjectPayment from './components/AddSubjectPayment';
import MyPendingPayments from './components/MyPendingPayments';
import ShowRegistrationPayments from './components/ShowRegistrationPayments';
import ReviewRegPayment from './components/ReviewRegPayment';
import ShowSubjectPayments from './components/ShowSubjectPayments';
import ReviewSubPayment from './components/ReviewSubPayment';

function App() {
  return (
    <Router>
      <div>
      <Header/>
      <Routes>
      <Route path="/regPayment" exact element={<AddRegPayment />} />
      <Route path="/subPayment" exact element={<AddSubjectPayment />} />
      <Route path="/pendingPayments" exact element={<MyPendingPayments />} />
      <Route path="/ShowRegistrationPayments" exact element={<ShowRegistrationPayments />} />
      <Route path="/ReviewRegPayment" exact element={<ReviewRegPayment />} />
      <Route path="/ShowSubjectPayments" exact element={<ShowSubjectPayments />} />
      <Route path="/ReviewSubPayment" exact element={<ReviewSubPayment />} />
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;

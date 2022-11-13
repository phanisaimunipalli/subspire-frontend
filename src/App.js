import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./components/pages/Home";
import CrudAdd from "./components/cruds/CrudAdd";
import CrudTable from "./components/cruds/CrudTable";
import CrudListView from "./components/cruds/CrudListView";
import CrudGridView from "./components/cruds/CrudGridView";
import CrudDetails from "./components/cruds/CrudDetails";
import CrudEdit from "./components/cruds/CrudEdit";
import CrudDelete from "./components/cruds/CrudDelete";
import Footer from "./components/common/Footer";
import Signup from "./components/cruds/Signup";
import Signin from "./components/cruds/Signin";
import LoginForm from "./components/cruds/LoginForm";
import Dashboard from "./components/cruds/Dashboard";
import Search from "./components/cruds/Search";
import Report from "./components/cruds/Report";
import Analysis from "./components/cruds/Analysis";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}

        <Routes>
          <Route exact path="/about" element={<Home />} />
          <Route exact path="/api/" element={<Home />} />
          <Route exact path="/cruds" element={<CrudTable />} />
          <Route exact path="/list-view" element={<CrudListView />} />
          <Route exact path="/dashboard" element={<CrudGridView />} />
          {/* <Route exact path="/auth-dashboard" element={<Dashboard />} /> */}

          <Route exact path="/" element={<Signin />} />
          {/* <Route exact path="/" element={<LoginForm />} /> */}
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/new" element={<CrudAdd />} />
          <Route exact path="/logout" element={<Signin />} />

          {/* <Route exact path="/analytics" element={<Search />} /> */}
          {/* <Route exact path="/analytics" element={<Report />} /> */}
          <Route exact path="/analytics" element={<Analysis />} />

          <Route exact path="/cruds/:_id" element={<CrudDetails />} />
          <Route exact path="/cruds/:_id/edit" element={<CrudEdit />} />
          <Route exact path="/cruds/:_id/delete" element={<CrudDelete />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

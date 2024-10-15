import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/main/Login";

import Signup from "./components/main/Signup";
import AdminProfile from "./components/admin/Profile";
import UserProfile from "./components/user/UserProfile";
import Header from "./components/main/Header";

import Main from "./components/main";
import User from "./components/user";

import Home from "./components/main/Home";

import NotFound from "./components/user/NotFound";
import ManageUser from "./components/admin/ManageUser";
import FileManager from "./components/user/FileManager";
import AudioBook from "./components/user/AudioBook";
import Summarizer from "./components/user/Summarizer";
import SentimentAnalysis from "./components/user/SentimentAnalysis";
import Admin from "./components/admin";
import { Toaster } from "react-hot-toast";
import UserAuth from "./components/UserAuth";
import AdminAuth from "./components/AdminAuth";
import Footer from "./components/main/Footer";
import Test from "./components/main/Test";
import ContactUs from "./components/main/ContactUs";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <div>
      <Toaster position="top-left" />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/main/home" />} />
          <Route element={<Main />} path="main">
            <Route path="home" element={<Home />} />

            <Route path="login" element={<Login />} />

            <Route path="signup" element={<Signup />} />
            <Route path="test" element={<Test />} />
            <Route path="contactus" element={<ContactUs />} />
          </Route>

          <Route
            element={
              <AdminAuth>
                <Admin />
              </AdminAuth>
            }
            path="admin"
          >
            <Route path="profile" element={<AdminProfile />} />
            <Route path="manageuser" element={<ManageUser />} />
          </Route>

          <Route
            element={
              <UserAuth>
                <User />
              </UserAuth>
            } 
            path="user"
          >
            <Route path="Userprofile" element={<UserProfile />} />
            <Route path="filemanager" element={<FileManager />} />
            <Route path="summarizer" element={<Summarizer />} />
            <Route path="sentiment" element={<SentimentAnalysis />} />
            <Route path="audiobook" element={<AudioBook />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardScreen from "./screens/admin/DashboardScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import LoginScreen from "./screens/Loginscreen";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <Routes>
                {/* Trang Login không có Sidebar */}
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/" element={<LoginScreen />} />

                {/* Các trang Admin có Sidebar */}
                <Route
                    path="/admin/*"
                    element={
                        <div className="d-flex">
                            <Sidebar />
                            <div
                                className="flex-grow-1 bg-light"
                                style={{
                                    marginLeft: "260px",
                                    minHeight: "100vh",
                                }}
                            >
                                <Header />
                                <Routes>
                                    <Route
                                        path="dashboard"
                                        element={<DashboardScreen />}
                                    />
                                    <Route
                                        path="productlist"
                                        element={<ProductListScreen />}
                                    />
                                    <Route
                                        path="userlist"
                                        element={<UserListScreen />}
                                    />
                                    <Route
                                        path="orderlist"
                                        element={<OrderListScreen />}
                                    />
                                </Routes>
                            </div>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;

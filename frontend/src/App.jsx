import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- CUSTOMER SCREENS ---
import HomeScreen from "./screens/customer/HomeScreen";
import ProductScreen from "./screens/customer/ProductScreen";
import CartScreen from "./screens/customer/CartScreen";
import LoginScreen from "./screens/Loginscreen";

// --- ADMIN SCREENS ---
import DashboardScreen from "./screens/admin/DashboardScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";

// --- COMPONENTS ---
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <Routes>
                {/* 1. TRANG ĐĂNG NHẬP (Giao diện sạch) */}
                <Route path="/login" element={<LoginScreen />} />

                {/* 2. CÁC TRANG KHÁCH HÀNG (Có Header ở trên) */}
                <Route
                    path="/*"
                    element={
                        <>
                            <Header />
                            <main>
                                <Routes>
                                    <Route path="/" element={<HomeScreen />} />
                                    <Route path="/product/:id" element={<ProductScreen />} />
                                    <Route path="/cart/:id?" element={<CartScreen />} />
                                </Routes>
                            </main>
                        </>
                    }
                />

                {/* 3. CÁC TRANG ADMIN (Có Sidebar bên trái + Header) */}
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
                                <div className="p-4">
                                    <Routes>
                                        <Route path="dashboard" element={<DashboardScreen />} />
                                        <Route path="productlist" element={<ProductListScreen />} />
                                        <Route path="userlist" element={<UserListScreen />} />
                                        <Route path="orderlist" element={<OrderListScreen />} />
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
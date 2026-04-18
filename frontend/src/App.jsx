import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// --- Screens dành cho Khách hàng ---
import HomeScreen from "./screens/customer/HomeScreen";
import ProductScreen from "./screens/customer/ProductScreen";
import CartScreen from "./screens/customer/CartScreen";
import LoginScreen from "./screens/LoginScreen";

// --- Screens dành cho Admin ---
import DashboardScreen from "./screens/admin/DashboardScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";

// --- Components chung ---
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <Routes>
                {/* 1. VÀO WEB LÀ PHẢI THẤY ĐĂNG NHẬP (Đường dẫn gốc "/") */}
                <Route path="/" element={<LoginScreen />} />
                <Route path="/login" element={<LoginScreen />} />

                {/* 2. LUỒNG KHÁCH HÀNG (Đổi nhà của khách sang đường dẫn "/home") */}
                <Route
                    path="/home/*"
                    element={
                        <>
                            <Header />
                            <main className="py-3">
                                <Routes>
                                    {/* Để path="" vì nó đã kế thừa chữ /home ở trên */}
                                    <Route path="" element={<HomeScreen />} />
                                    <Route path="product/:id" element={<ProductScreen />} />
                                    <Route path="cart/:id?" element={<CartScreen />} />
                                </Routes>
                            </main>
                        </>
                    }
                />

                {/* 3. LUỒNG ADMIN (Giữ nguyên như cũ) */}
                <Route
                    path="/admin/*"
                    element={
                        <div className="d-flex">
                            <Sidebar />
                            <div className="flex-grow-1 bg-light" style={{ marginLeft: "260px", minHeight: "100vh" }}>
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
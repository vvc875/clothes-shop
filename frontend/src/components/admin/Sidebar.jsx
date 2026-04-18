import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Sidebar = () => {
    const location = useLocation();
    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
        { name: "Sản phẩm", path: "/admin/productlist", icon: "📦" },
        { name: "Đơn hàng", path: "/admin/orderlist", icon: "🛒" },
        { name: "Khách hàng", path: "/admin/userlist", icon: "👥" },
    ];

    return (
        <div
            className="bg-white border-end vh-100 p-3 shadow-sm"
            style={{ width: "260px", position: "fixed" }}
        >
            <div className="mb-4 ps-3">
                <h4 className="fw-bold text-primary">Fashion Store</h4>
            </div>
            <Nav className="flex-column">
                {menuItems.map((item) => (
                    <Nav.Link
                        as={Link}
                        to={item.path}
                        key={item.path}
                        className={`mb-2 p-3 rounded-3 d-flex align-items-center ${
                            location.pathname === item.path
                                ? "bg-primary text-white shadow"
                                : "text-dark hover-light"
                        }`}
                    >
                        <span className="me-3">{item.icon}</span>
                        <span className="fw-medium">{item.name}</span>
                    </Nav.Link>
                ))}
            </Nav>
        </div>
    );
};

export default Sidebar;

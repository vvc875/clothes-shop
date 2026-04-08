import React from "react";
import { useNavigate } from "react-router-dom";
import { NavDropdown, Image, Navbar, Container } from "react-bootstrap";

const Header = () => {
    const navigate = useNavigate();

    // Lấy thông tin user từ localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const logoutHandler = () => {
        localStorage.removeItem("userInfo"); // Xóa token
        navigate("/login"); // Chuyển về trang đăng nhập
    };

    return (
        <Navbar
            bg="white"
            className="border-bottom py-2 shadow-sm"
            sticky="top"
        >
            <Container fluid className="justify-content-end px-4">
                <div className="d-flex align-items-center">
                    {/* Chữ chào hỏi bên cạnh icon */}
                    <div className="text-end me-3 d-none d-sm-block">
                        <div
                            className="fw-bold mb-0"
                            style={{ fontSize: "0.9rem" }}
                        >
                            {userInfo ? userInfo.name : "Quản trị viên"}
                        </div>
                        <small
                            className="text-muted"
                            style={{ fontSize: "0.75rem" }}
                        >
                            Admin
                        </small>
                    </div>

                    {/* Icon Tài khoản với Menu xổ xuống */}
                    <NavDropdown
                        title={
                            <div
                                className="d-inline-block rounded-circle bg-primary text-white text-center shadow-sm"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    lineHeight: "40px",
                                    fontSize: "1.1rem",
                                }}
                            >
                                {userInfo
                                    ? userInfo.name.charAt(0).toUpperCase()
                                    : "A"}
                            </div>
                        }
                        id="nav-dropdown"
                        align="end"
                        className="no-caret"
                    >
                        <NavDropdown.Header>
                            Tài khoản của tôi
                        </NavDropdown.Header>
                        <NavDropdown.Item
                            onClick={() => navigate("/admin/profile")}
                        >
                            👤 Thông tin tài khoản
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                            onClick={logoutHandler}
                            className="text-danger font-weight-bold"
                        >
                            🚪 Đăng xuất
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
            </Container>
        </Navbar>
    );
};

export default Header;

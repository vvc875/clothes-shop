import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // Đã xóa http://localhost:5000 vì đã có Vite Proxy lo việc nối đuôi
            const { data } = await axios.post("/api/users/login", { email, password });
            
            localStorage.setItem("userInfo", JSON.stringify(data));

            // PHÂN QUYỀN ĐIỀU HƯỚNG CHUẨN
            if (data.isAdmin) {
                navigate("/admin/dashboard"); // Admin thì vào trang quản trị
            } else {
                navigate("/home"); // Khách hàng thì đẩy thẳng ra màn hình Trang chủ (HomeScreen)
            }
        } catch (error) { 
            // Đã sửa 'err' thành 'error' để bắt lỗi chính xác
            const message = error.response && error.response.data.message
                    ? error.response.data.message
                    : "Tài khoản hoặc mật khẩu không đúng!";
            setError(message);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <h2>Đăng nhập</h2>
            {error && (
                <Alert variant="danger" className="py-2 text-center small">
                    {error}
                </Alert>
            )}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                    Đăng nhập
                </Button>
            </Form>
        </Container>
    );
};

export default LoginScreen;
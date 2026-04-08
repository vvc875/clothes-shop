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
            const { data } = await axios.post(
                "http://localhost:5000/api/users/login",
                { email, password },
            );
            localStorage.setItem("userInfo", JSON.stringify(data));

            if (data.isAdmin) {
                navigate("/admin/productlist");
            } else {
                alert("Bạn là khách hàng, hiện tại chưa có trang cho bạn!");
            }
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? err.response.data.message
                    : "Tai khoan hoac mat khau khong dung!";
            setError(message);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <h2>Login</h2>
            {error && (
                <Alert variant="danger" className="py-2 text-center smaill">
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
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Đăng nhập
                </Button>
            </Form>
        </Container>
    );
};
export default LoginScreen;

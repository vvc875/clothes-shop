import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate();

    // SỬA CHỖ NÀY: Phải check role để đẩy đi đúng hướng
    // useEffect(() => {
    //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //     if (userInfo) {
    //         if (userInfo.role === "admin") {
    //             navigate("/admin/dashboard");
    //         } else {
    //             navigate("/home");
    //         }
    //     }
    // }, [navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { data } = await axios.post("/api/users/login", { email, password });

            localStorage.setItem("userInfo", JSON.stringify(data));

            // PHÂN QUYỀN ĐIỀU HƯỚNG
            if (data.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/home");
            }
        } catch (err) {
            const message = err.response && err.response.data.message
                ? err.response.data.message
                : "Tài khoản hoặc mật khẩu không đúng!";
            setError(message);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <div className="card shadow p-4 rounded">
                <h2 className="text-center mb-4">Đăng nhập</h2>

                {error && (
                    <Alert variant="danger" className="py-2 text-center small">
                        {error}
                    </Alert>
                )}

                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="w-100 mt-2">
                        Đăng nhập
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default LoginScreen;
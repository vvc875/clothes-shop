import React, { useEffect, useState } from "react";
import { Row, Col, Card, Badge, Form, InputGroup } from "react-bootstrap";
import axios from "axios";

const UserListScreen = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Gọi API lấy danh sách User ở đây
    }, []);

    return (
        <div
            style={{
                marginLeft: "260px",
                padding: "30px",
                backgroundColor: "#f8f9fa",
            }}
        >
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-0">Quản lý khách hàng</h2>
                    <small className="text-muted">7 khách hàng</small>
                </div>
                <button className="btn btn-primary px-4">
                    + Thêm khách hàng
                </button>
            </div>

            <Card className="border-0 shadow-sm mb-4 p-2">
                <InputGroup>
                    <InputGroup.Text className="bg-white border-0">
                        🔍
                    </InputGroup.Text>
                    <Form.Control
                        className="border-0 shadow-none"
                        placeholder="Tìm kiếm khách hàng..."
                    />
                </InputGroup>
            </Card>

            <Row>
                {/* Sample Card */}
                <Col md={6} className="mb-4">
                    <Card className="border-0 shadow-sm p-4">
                        <div className="d-flex justify-content-between align-items-start">
                            <div className="d-flex align-items-center">
                                <div
                                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: "45px", height: "45px" }}
                                >
                                    Đ
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-0">Đỗ Văn G</h6>
                                    <small className="text-muted">#KH007</small>
                                </div>
                            </div>
                            <Badge
                                bg="success-subtle"
                                className="text-success border-0 px-3 py-2"
                            >
                                Hoạt động
                            </Badge>
                        </div>
                        <div className="mt-3 small text-muted">
                            <p className="mb-1">📧 dovang@email.com</p>
                            <p className="mb-0">📍 Nha Trang</p>
                        </div>
                        <hr />
                        <Row className="text-center">
                            <Col>
                                <div>Đơn hàng</div>
                                <strong>18</strong>
                            </Col>
                            <Col>
                                <div>Tổng chi</div>
                                <strong>15.6M</strong>
                            </Col>
                            <Col>
                                <div>Đơn cuối</div>
                                <strong>27/3</strong>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default UserListScreen;

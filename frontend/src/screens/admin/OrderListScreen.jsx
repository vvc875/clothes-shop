import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const OrderListScreen = () => {
    const [orders, setOrders] = useState([]);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = { header: { Authorization: `Bearer ${userInfo.token}` } };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Lấy token từ localStorage
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));

                // Nếu không có userInfo (chưa đăng nhập), đừng gọi API để tránh spam lỗi
                if (!userInfo) return;

                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                const { data } = await axios.get(
                    "http://localhost:5000/api/orders",
                    config,
                );
                setOrders(data);
            } catch (error) {
                console.error(
                    "Lỗi lấy đơn hàng:",
                    error.response?.data?.message || error.message,
                );
            }
        };

        fetchOrders();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case "Hoan thanh":
                return "success";
            case "Dang giao":
                return "primary";
            case "Cho xac nhan":
                return "warning";
            case "Da huy":
                return "danger";
            default:
                return "secondary";
        }
    };

    return (
        <div
            style={{
                marginLeft: "260px",
                padding: "30px",
                backgroundColor: "#f8f9fa",
                minHeight: "100vh",
            }}
        >
            <Row className="mb-4">
                <Col>
                    <h2 className="fw-bold">Quản lý đơn hàng</h2>
                    <small className="text-muted">
                        {orders.length} đơn hàng
                    </small>
                </Col>
            </Row>

            <Table
                hover
                responsive
                className="bg-white shadow-sm border-0 align-middle"
            >
                <thead className="bg-light">
                    <tr>
                        <th className="py-3 ps-4">MÃ ĐƠN</th>
                        <th>KHÁCH HÀNG</th>
                        <th>NGÀY ĐẶT</th>
                        <th>TỔNG TIỀN</th>
                        <th>TRẠNG THÁI</th>
                        <th>THAO TÁC</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td className="ps-4 fw-bold">
                                #{order._id.substring(0, 7).toUpperCase()}
                            </td>
                            <td>
                                {order.user
                                    ? order.user.name
                                    : "Khách vãng lai"}
                            </td>
                            <td>
                                {new Date(order.createdAt).toLocaleDateString(
                                    "vi-VN",
                                )}
                            </td>
                            <td className="fw-bold text-dark">
                                {order.totalPrice.toLocaleString()}đ
                            </td>
                            <td>
                                <Badge
                                    bg={getStatusBadge(order.status)}
                                    className="px-3 py-2 border-0 rounded-pill"
                                >
                                    {order.status}
                                </Badge>
                            </td>
                            <td>
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="me-2 shadow-sm"
                                >
                                    👁️ Xem
                                </Button>
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="shadow-sm"
                                >
                                    🖨️ In
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default OrderListScreen;

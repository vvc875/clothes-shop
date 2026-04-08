import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

const dataRevenue = [
    { name: "T1", val: 45 },
    { name: "T2", val: 52 },
    { name: "T3", val: 48 },
    { name: "T4", val: 61 },
    { name: "T5", val: 55 },
    { name: "T6", val: 68 },
];

const DashboardScreen = () => {
    return (
        <div
            style={{
                marginLeft: "260px",
                padding: "30px",
                backgroundColor: "#f8f9fa",
            }}
        >
            <h2 className="fw-bold mb-1">Dashboard</h2>
            <p className="text-muted mb-4">Tổng quan hoạt động cửa hàng</p>

            {/* Thẻ thống kê */}
            <Row className="mb-4">
                {[
                    {
                        label: "Tổng doanh thu",
                        val: "142,500,000đ",
                        color: "success",
                        icon: "💰",
                    },
                    {
                        label: "Đơn hàng",
                        val: "328",
                        color: "primary",
                        icon: "🛒",
                    },
                    {
                        label: "Sản phẩm",
                        val: "156",
                        color: "info",
                        icon: "📦",
                    },
                    {
                        label: "Khách hàng",
                        val: "1,248",
                        color: "warning",
                        icon: "👥",
                    },
                ].map((item, idx) => (
                    <Col md={3} key={idx}>
                        <Card className="border-0 shadow-sm p-3">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <small className="text-muted">
                                        {item.label}
                                    </small>
                                    <h4 className="fw-bold mt-1 mb-0">
                                        {item.val}
                                    </h4>
                                </div>
                                <div className={`fs-3 text-${item.color}`}>
                                    {item.icon}
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Biểu đồ */}
            <Row>
                <Col md={7}>
                    <Card className="border-0 shadow-sm p-4 mb-4">
                        <h6 className="fw-bold mb-4">
                            Doanh thu 6 tháng gần đây
                        </h6>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={dataRevenue}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="val"
                                    stroke="#0d6efd"
                                    strokeWidth={3}
                                    dot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col md={5}>
                    <Card className="border-0 shadow-sm p-4">
                        <h6 className="fw-bold mb-4">Sản phẩm theo danh mục</h6>
                        {/* Quân có thể thêm BarChart ở đây tương tự */}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardScreen;

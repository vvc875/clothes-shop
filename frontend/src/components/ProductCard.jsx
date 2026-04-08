import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <Card className="border-0 bg-transparent product-card mb-4">
            <div className="position-relative overflow-hidden bg-light rounded-2">
                {/* Nút yêu thích ở góc phải */}
                <button className="wishlist-btn">
                    <i className="far fa-heart"></i>
                </button>

                {/* Ảnh sản phẩm */}
                <Link to={`/product/${product._id}`}>
                    <Card.Img
                        variant="top"
                        src={`http://localhost:5000${product.image}`}
                        style={{
                            height: "350px",
                            objectFit: "contain",
                            padding: "20px",
                            transition: "transform 0.5s ease",
                        }}
                        className="product-image"
                    />
                </Link>
            </div>

            <Card.Body className="px-0 pt-3">
                <div className="fw-bold mb-1" style={{ fontSize: "1.1rem" }}>
                    {product.price.toLocaleString()}đ
                </div>
                <Card.Title as="div" className="product-title">
                    <Link
                        to={`/product/${product._id}`}
                        className="text-decoration-none text-dark"
                    >
                        {product.name}
                    </Link>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;

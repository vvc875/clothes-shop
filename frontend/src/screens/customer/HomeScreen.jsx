import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(Array.isArray(data) ? data : (data.products || []));
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : []; 

  return (
    <div className="d-flex flex-column min-vh-100">
      <section className="position-relative bg-light overflow-hidden py-5">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col md={8} lg={6}>
              <span className="badge bg-info text-dark mb-3 px-3 py-2 rounded-pill">Bộ Sưu Tập Mới</span>
              <h1 className="display-4 fw-bold text-dark mb-4">
                Khám Phá Phong Cách <br /><span className="text-primary">Đích Thực Của Bạn</span>
              </h1>
              <p className="lead text-secondary mb-4">Trải nghiệm mua sắm tuyệt vời với những xu hướng thời trang mới nhất.</p>
              <div className="d-flex gap-3">
                <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-4 fw-bold">Mua Ngay</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 flex-grow-1">
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold mb-2">Sản Phẩm Nổi Bật</h2>
            </div>
          </div>
          <Row className="g-4">
            {featuredProducts.map((product) => (
              <Col sm={12} md={6} lg={3} key={product._id}>
                {/* Yêu cầu phải có file ProductCard.jsx trong thư mục components */}
                <ProductCard product={product} /> 
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomeScreen;
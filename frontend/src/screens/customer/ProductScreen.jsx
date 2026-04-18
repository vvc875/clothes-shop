import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ProductScreen = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1); // Số lượng mua mặc định là 1

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Đã dùng đường dẫn rút gọn (nhờ Proxy cấu hình ban nãy)
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Lỗi khi tải chi tiết sản phẩm:', error);
      }
    };
    fetchProduct();
  }, [id]);

  // Hàm xử lý khi bấm nút "Thêm vào giỏ hàng"
  const addToCartHandler = () => {
    // Chuyển hướng sang trang giỏ hàng và mang theo ID + Số lượng
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Container className="py-5">
      <Link className="btn btn-outline-dark mb-4" to="/">
        <i className="bi bi-arrow-left me-2"></i> Quay lại
      </Link>
      
      <Row>
        <Col md={5}>
          {/* Ảnh sản phẩm */}
          <Image src={product.image} alt={product.name} fluid rounded shadow-sm />
        </Col>
        
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3 className="fw-bold">{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 className="text-danger fw-bold">
                {product.price?.toLocaleString()} đ
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <p className="mb-1 fw-bold">Mô tả sản phẩm:</p>
              <p className="text-muted">{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        
        <Col md={3}>
          <div className="card shadow-sm">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Trạng thái:</Col>
                  <Col className="fw-bold">
                    {product.countInStock > 0 ? (
                      <span className="text-success">Còn hàng</span>
                    ) : (
                      <span className="text-danger">Hết hàng</span>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* Chỉ hiện chọn số lượng nếu sản phẩm còn hàng */}
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row className="align-items-center">
                    <Col>Số lượng:</Col>
                    <Col>
                      <Form.Control 
                        as="select" 
                        value={qty} 
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item className="text-center">
                <Button 
                  onClick={addToCartHandler}
                  className="w-100 fw-bold py-2" 
                  type="button" 
                  variant="primary"
                  disabled={product.countInStock === 0}
                >
                  Thêm vào giỏ hàng
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductScreen;
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Card } from 'react-bootstrap';

const CartScreen = () => {
  const { id } = useParams(); // Lấy ID nếu có thêm sản phẩm mới vào giỏ
  const location = useLocation();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  // Tạm thời tạo mảng rỗng (Sẽ thay bằng dữ liệu Redux/Context sau)
  const cartItems = []; 

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          <h2 className="fw-bold mb-4">Giỏ hàng của bạn</h2>
          
          {cartItems.length === 0 ? (
            <div className="alert alert-info p-4">
              <i className="bi bi-cart-x me-2"></i>
              Giỏ hàng của bạn đang trống.{' '}
              <Link to="/" className="fw-bold text-decoration-none">
                Tiếp tục mua sắm ngay!
              </Link>
            </div>
          ) : (
            <ListGroup variant="flush">
              {/* Nơi hiển thị danh sách sản phẩm trong giỏ (Dành cho bản cập nhật sau) */}
              <ListGroup.Item>Đang tải giỏ hàng...</ListGroup.Item>
            </ListGroup>
          )}
        </Col>
        
        <Col md={4}>
          <Card className="shadow-sm">
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-light">
                <h4 className="fw-bold mb-0">Tạm tính</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between my-2">
                  <span>Tổng số sản phẩm:</span>
                  <span className="fw-bold">{cartItems.reduce((acc, item) => acc + item.qty, 0)} món</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Thành tiền:</span>
                  <span className="fw-bold text-danger fs-5">
                    {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString()} đ
                  </span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                <Button 
                  type="button" 
                  className="w-100 fw-bold py-2" 
                  disabled={cartItems.length === 0}
                  variant="dark"
                >
                  Tiến hành thanh toán
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
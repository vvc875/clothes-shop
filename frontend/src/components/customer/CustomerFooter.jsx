import { useNavigate } from 'react-router-dom';

export default function CustomerFooter() {
  const navigate = useNavigate();
  const colors = {
    footerBg: '#0f172a', // Nền xanh đen sang trọng
    primary: '#2563eb', // Màu xanh accent
    textLight: '#94a3b8'
  };

  const linkStyle = { 
    cursor: 'pointer', 
    transition: 'color 0.2s' 
  };

  const handleHover = (e, isOver) => {
    e.target.style.color = isOver ? 'white' : colors.textLight;
  };

  return (
    <footer style={{ backgroundColor: colors.footerBg, color: colors.textLight, padding: '80px 5% 30px 5%', fontSize: '15px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '50px', borderBottom: '1px solid #1e293b', paddingBottom: '50px', marginBottom: '30px' }}>
        
        {/* Cột 1: Thông tin shop */}
        <div style={{ flex: 2 }}>
          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0', letterSpacing: '1px' }}>
            KHIÊM <span style={{color: colors.primary}}>FASHION</span>
          </h2>
          <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
            Chúng tôi tự hào mang đến cho bạn những sản phẩm thời trang chất lượng, dẫn đầu xu hướng và phù hợp với mọi phong cách. Sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.
          </p>
          <div style={{ display: 'flex', gap: '15px', fontSize: '20px' }}>
            <i className="bi bi-facebook" style={{cursor: 'pointer'}}></i>
            <i className="bi bi-instagram" style={{cursor: 'pointer'}}></i>
            <i className="bi bi-tiktok" style={{cursor: 'pointer'}}></i>
          </div>
        </div>

        {/* Cột 2: Danh Mục - Đã sửa navigate sang /home/shop */}
        <div>
          <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '600' }}>Danh Mục</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <span 
              style={linkStyle} 
              onMouseOver={(e) => handleHover(e, true)} 
              onMouseOut={(e) => handleHover(e, false)}
              onClick={() => navigate('/home/shop')}
            >Áo Thun & Sơ Mi</span>
            <span 
              style={linkStyle} 
              onMouseOver={(e) => handleHover(e, true)} 
              onMouseOut={(e) => handleHover(e, false)}
              onClick={() => navigate('/home/shop')}
            >Quần Jean & Tây</span>
            <span 
              style={linkStyle} 
              onMouseOver={(e) => handleHover(e, true)} 
              onMouseOut={(e) => handleHover(e, false)}
              onClick={() => navigate('/home/shop')}
            >Phụ Kiện Thời Trang</span>
          </div>
        </div>

        {/* Cột 3: Chính Sách */}
        <div>
          <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '600' }}>Chính Sách</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <span style={linkStyle} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)}>Vận chuyển & Giao nhận</span>
            <span style={linkStyle} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)}>Bảo mật thông tin</span>
            <span style={linkStyle} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)}>Điều khoản dịch vụ</span>
            <span style={linkStyle} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)}>Chính sách đổi trả</span>
          </div>
        </div>

        {/* Cột 4: Liên Hệ - Đã cập nhật địa chỉ PTIT */}
        <div>
          <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '600' }}>Liên Hệ</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <span><i className="bi bi-geo-alt me-2"></i> Học viện Công nghệ Bưu chính Viễn thông, Hà Đông, Hà Nội</span>
            <span><i className="bi bi-telephone me-2"></i> +84 123 456 789</span>
            <span><i className="bi bi-envelope me-2"></i> support@khiemfashion.vn</span>
            <span><i className="bi bi-clock me-2"></i> 08:00 - 22:00 hàng ngày</span>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
        <span>© {new Date().getFullYear()} KHIÊM FASHION STORE. Phát triển bởi B23DCCN435.</span>
      </div>
    </footer>
  );
}
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CustomerHeader() {
  const [cartCount, setCartCount] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy thông tin user từ localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;

  const colors = {
    primary: '#000000', // Đổi sang màu đen cho sang trọng kiểu Fashion
    accent: '#2563eb',  // Màu xanh làm điểm nhấn cho nút hoặc số lượng
    text: '#1f2937',
    textLight: '#6b7280',
    border: '#f3f4f6',
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  };

  const fetchCartCount = async () => {
    if (userInfo) {
      try {
        // Giả sử API lấy số lượng item trong giỏ
        const { data } = await axios.get(`/api/cart/count/${userInfo._id}`);
        setCartCount(data.count || 0);
      } catch (error) {
        console.error('Lỗi lấy số lượng giỏ hàng:', error);
      }
    }
  };

  useEffect(() => {
    fetchCartCount();
    window.addEventListener('cartUpdated', fetchCartCount);
    return () => window.removeEventListener('cartUpdated', fetchCartCount);
  }, [userInfo]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
    setShowUserMenu(false);
  };

  const navLinkStyle = { 
    fontSize: '14px', 
    fontWeight: '600', 
    color: colors.text, 
    cursor: 'pointer', 
    textTransform: 'uppercase', // Chữ in hoa cho chuẩn Fashion
    letterSpacing: '0.5px',
    transition: 'all 0.3s' 
  };
  
  const navLinkActiveStyle = { ...navLinkStyle, color: colors.accent, borderBottom: `2px solid ${colors.accent}` };

  return (
    <nav style={{ 
      backgroundColor: 'white', 
      padding: '0 5%', 
      height: '80px',
      display: 'grid', 
      gridTemplateColumns: '1fr auto 1fr', 
      alignItems: 'center', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      boxShadow: colors.shadow 
    }}>
      
      {/* LOGO - Đã đổi thành KHIÊM FASHION */}
      <div style={{ justifySelf: 'start' }}>
        <h1 
          style={{ margin: 0, fontSize: '24px', color: '#000', fontWeight: '900', letterSpacing: '2px', cursor: 'pointer' }} 
          onClick={() => navigate('/home')}
        >
          KHIÊM <span style={{color: colors.accent}}>FASHION</span>
        </h1>
      </div>
      
      {/* MENU ĐIỀU HƯỚNG */}
      <div style={{ display: 'flex', gap: '35px', height: '100%', alignItems: 'center' }}>
        <span style={location.pathname === '/home' ? navLinkActiveStyle : navLinkStyle} onClick={() => navigate('/home')}>Trang Chủ</span>
        <span style={location.pathname.includes('/shop') ? navLinkActiveStyle : navLinkStyle} onClick={() => navigate('/home/shop')}>Cửa Hàng</span>
        <span style={location.pathname.includes('/collection') ? navLinkActiveStyle : navLinkStyle} onClick={() => navigate('/home/collection')}>Bộ Sưu Tập</span>
        <span style={location.pathname.includes('/about') ? navLinkActiveStyle : navLinkStyle} onClick={() => navigate('/home/about')}>Về Chúng Tôi</span>
      </div>

      {/* ICONS & USER */}
      <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Nút Tìm Kiếm (Thêm cho giống Fashion Store) */}
        <div style={{ cursor: 'pointer', color: colors.text }}>
          <i className="bi bi-search fs-5"></i>
        </div>

        {/* GIỎ HÀNG */}
        <div onClick={() => navigate('/home/cart')} style={{ position: 'relative', cursor: 'pointer', padding: '5px' }}>
          <i className="bi bi-bag fs-4" style={{ color: location.pathname.includes('/cart') ? colors.accent : colors.text }}></i>
          {cartCount > 0 && (
            <span style={{ 
              position: 'absolute', top: '0', right: '-2px', 
              backgroundColor: colors.accent, color: 'white', 
              borderRadius: '50%', width: '18px', height: '18px', 
              display: 'flex', justifyContent: 'center', alignItems: 'center', 
              fontSize: '10px', fontWeight: 'bold' 
            }}>
              {cartCount}
            </span>
          )}
        </div>
        
        {/* DROPDOWN USER */}
        <div style={{ position: 'relative', marginLeft: '10px' }}>
          <div onClick={() => setShowUserMenu(!showUserMenu)} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ 
              width: '35px', height: '35px', 
              border: `1px solid ${colors.border}`, 
              borderRadius: '50%', display: 'flex', 
              justifyContent: 'center', alignItems: 'center' 
            }}>
              <i className="bi bi-person fs-5"></i>
            </div>
            {userInfo && <span style={{fontSize: '14px', fontWeight: '500'}}>{userInfo.name}</span>}
          </div>

          {showUserMenu && (
            <div style={{ 
              position: 'absolute', top: '50px', right: '0', 
              backgroundColor: 'white', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
              borderRadius: '8px', width: '200px', overflow: 'hidden', 
              border: `1px solid ${colors.border}`, zIndex: 2000 
            }}>
              <div 
                onClick={() => { navigate('/home/profile'); setShowUserMenu(false); }} 
                style={{ padding: '12px 15px', cursor: 'pointer', fontSize: '14px', transition: '0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                Tài khoản của tôi
              </div>
              <div 
                onClick={() => { navigate('/home/orders'); setShowUserMenu(false); }} 
                style={{ padding: '12px 15px', cursor: 'pointer', fontSize: '14px', transition: '0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                Đơn mua
              </div>
              <div 
                onClick={handleLogout} 
                style={{ 
                  padding: '12px 15px', color: '#ef4444', 
                  cursor: 'pointer', fontSize: '14px', 
                  borderTop: `1px solid ${colors.border}` 
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                Đăng xuất
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
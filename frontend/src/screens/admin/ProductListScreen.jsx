import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    Button,
    Row,
    Col,
    Modal,
    Form,
    Image,
    Pagination,
    InputGroup,
    Badge,
} from "react-bootstrap";

const ProductListScreen = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);

    // State cho phân trang và tìm kiếm
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [keyword, setKeyword] = useState("");

    // --- QUẢN LÝ SIZE ---
    const [sizes, setSizes] = useState([{ size: "S", quantity: 0 }]);

    const addSizeField = () => setSizes([...sizes, { size: "", quantity: 0 }]);
    const removeSizeField = (index) =>
        setSizes(sizes.filter((_, i) => i !== index));
    const handleSizeChange = (index, field, value) => {
        const newSizes = [...sizes];
        newSizes[index][field] = value;
        setSizes(newSizes);
    };

    // State cho phóng to ảnh
    const [showImageModal, setShowImageModal] = useState(false);
    const [enlargedImage, setEnlargedImage] = useState("");

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:5000/api/products?keyword=${keyword}&pageNumber=${page}`,
                config,
            );
            setProducts(data.products);
            setPage(data.page);
            setPages(data.pages);
        } catch (error) {
            console.error("Lỗi lấy dữ liệu: " + error.message);
        }
    };

    const searchHandler = (e) => {
        e.preventDefault();
        setPage(1);
        fetchProducts();
    };

    const deleteHandler = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            await axios.delete(
                `http://localhost:5000/api/products/${id}`,
                config,
            );
            fetchProducts();
        }
    };

    const handleShowModal = (product = null) => {
        if (product) {
            setIsEdit(true);
            setProductId(product._id);
            setName(product.name);
            setPrice(product.price);
            setCategory(product.category);
            setBrand(product.brand || "GenZ Store");
            setImage(product.image || "");
            setSizes(
                product.sizes && product.sizes.length > 0
                    ? product.sizes
                    : [{ size: "S", quantity: 0 }],
            );
        } else {
            setIsEdit(false);
            setProductId("");
            setName("");
            setPrice(0);
            setCategory("");
            setBrand("");
            setImage("");
            setSizes([{ size: "S", quantity: 0 }]);
        }
        setShowModal(true);
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                },
            );
            setImage(data);
            setUploading(false);
        } catch (error) {
            setUploading(false);
            alert("Lỗi upload ảnh");
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        // Tính tổng tồn kho từ các size
        const totalStock = sizes.reduce(
            (acc, item) => acc + Number(item.quantity),
            0,
        );

        try {
            const productData = {
                name,
                price: Number(price),
                category,
                brand: brand || "GenZ Store",
                image,
                sizes, // Gửi mảng size lên
                countInStock: totalStock,
                description: "Mô tả sản phẩm",
            };

            if (isEdit) {
                await axios.put(
                    `http://localhost:5000/api/products/${productId}`,
                    productData,
                    config,
                );
            } else {
                await axios.post(
                    "http://localhost:5000/api/products",
                    productData,
                    config,
                );
            }
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            alert(
                "Lỗi lưu dữ liệu: " +
                    (error.response?.data?.message || error.message),
            );
        }
    };

    const handleImageClick = (imageUrl) => {
        setEnlargedImage(imageUrl);
        setShowImageModal(true);
    };

    return (
        <div className="container mt-4">
            <Row className="align-items-center mb-3">
                <Col>
                    <h1>Quản lý Cửa hàng</h1>
                </Col>
                <Col className="text-end">
                    <Button onClick={() => handleShowModal()}>
                        + Thêm sản phẩm
                    </Button>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <Form onSubmit={searchHandler}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Tìm theo tên hoặc danh mục..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <Button type="submit" variant="primary">
                                Tìm kiếm
                            </Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>

            {products.length === 0 ? (
                <div className="text-center p-5 shadow-sm bg-white rounded border">
                    <h5 className="text-muted">
                        📦 Hiện tại không có sản phẩm nào.
                    </h5>
                    <Button className="mt-2" onClick={() => handleShowModal()}>
                        Thêm ngay
                    </Button>
                </div>
            ) : (
                <Table
                    striped
                    bordered
                    hover
                    responsive
                    className="align-middle"
                >
                    <thead>
                        <tr>
                            <th>ẢNH</th>
                            <th>TÊN</th>
                            <th>GIÁ</th>
                            <th>DANH MỤC</th>
                            <th>SIZE & TỒN KHO</th>
                            <th>THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td style={{ width: "100px" }}>
                                    <Image
                                        src={`http://localhost:5000${product.image}`}
                                        alt={product.name}
                                        rounded
                                        thumbnail
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            objectFit: "cover",
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            handleImageClick(
                                                `http://localhost:5000${product.image}`,
                                            )
                                        }
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.price.toLocaleString()}đ</td>
                                <td>{product.category}</td>
                                <td>
                                    {product.sizes &&
                                    product.sizes.length > 0 ? (
                                        product.sizes.map((s, idx) => (
                                            <Badge
                                                key={idx}
                                                bg="info"
                                                className="me-1 text-dark"
                                            >
                                                {s.size}: {s.quantity}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-danger small">
                                            Chưa có size
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <Button
                                        variant="light"
                                        className="btn-sm me-2"
                                        onClick={() => handleShowModal(product)}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() =>
                                            deleteHandler(product._id)
                                        }
                                    >
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {pages > 1 && (
                <Pagination className="justify-content-center mt-4">
                    {[...Array(pages).keys()].map((x) => (
                        <Pagination.Item
                            key={x + 1}
                            active={x + 1 === page}
                            onClick={() => setPage(x + 1)}
                        >
                            {x + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            )}

            {/* MODAL THÊM/SỬA */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Giá (VNĐ)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Danh mục</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ảnh sản phẩm</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={image}
                                        readOnly
                                        placeholder="Đường dẫn ảnh"
                                    />
                                    <Form.Control
                                        type="file"
                                        className="mt-2"
                                        onChange={uploadFileHandler}
                                    />
                                    {uploading && (
                                        <p className="text-info">
                                            Đang xử lý ảnh...
                                        </p>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col md={6} className="border-start">
                                <Form.Label className="fw-bold">
                                    Quản lý Size & Tồn kho
                                </Form.Label>
                                {sizes.map((item, index) => (
                                    <Row
                                        key={index}
                                        className="mb-2 g-2 align-items-center"
                                    >
                                        <Col xs={5}>
                                            <Form.Control
                                                placeholder="Size"
                                                value={item.size}
                                                onChange={(e) =>
                                                    handleSizeChange(
                                                        index,
                                                        "size",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                        </Col>
                                        <Col xs={5}>
                                            <Form.Control
                                                type="number"
                                                placeholder="Số lượng"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleSizeChange(
                                                        index,
                                                        "quantity",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                        </Col>
                                        <Col xs={2}>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() =>
                                                    removeSizeField(index)
                                                }
                                            >
                                                X
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={addSizeField}
                                    className="w-100 mt-2"
                                >
                                    + Thêm Size
                                </Button>
                            </Col>
                        </Row>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100 mt-4 py-2"
                        >
                            {isEdit ? "Lưu thay đổi" : "Tạo sản phẩm ngay"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* MODAL PHÓNG TO ẢNH */}
            <Modal
                show={showImageModal}
                onHide={() => setShowImageModal(false)}
                centered
                size="lg"
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                    <Image src={enlargedImage} alt="Enlarged" fluid />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProductListScreen;

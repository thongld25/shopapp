import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Register from './pages/Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vm]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/orders' element={<Orders/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Hàm kiểm tra API
//   const testApiCall = async () => {
//     const token = localStorage.getItem("token");  // Lấy token từ localStorage

//     if (!token) {
//       alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
//       return;
//     }

//     setLoading(true);  // Bắt đầu loading
//     setError(null);  // Reset lỗi
//     setResult(null);  // Reset kết quả trước khi gửi yêu cầu

//     try {
//       const response = await axios.post("http://localhost:9193/api/v1/cartItems/item/add?productId=6&quantity=1&size=S", {
//         headers: {
//           "Authorization": `Bearer ${token}`  // Gửi token qua header Authorization
//         }
//       });

//       // Kiểm tra mã trạng thái HTTP
//       if (response.status === 200) {
//         setResult(response.data);
//       } else {
//         setError(`API gọi không thành công, mã trạng thái: ${response.status}`);
//       }
//     } catch (err) {
//       // Kiểm tra các loại lỗi
//       if (err.response) {
//         // Lỗi do API trả về (401, 403, 404, 500...)
//         setError(`Lỗi API: Mã trạng thái - ${err.response.status}`);
//       } else if (err.request) {
//         // Lỗi khi không nhận được phản hồi từ server
//         setError("Không nhận được phản hồi từ server.");
//       } else {
//         // Lỗi khác
//         setError(`Lỗi trong quá trình gọi API: ${err.message}`);
//       }
//     } finally {
//       setLoading(false);  // Dừng loading
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Kiểm Tra API Call</h1>
//       <button onClick={testApiCall} disabled={loading}>
//         {loading ? 'Đang kiểm tra...' : 'Kiểm Tra API'}
//       </button>

//       <div id="result" style={{ marginTop: '20px' }}>
//         {result && (
//           <div>
//             <h3>API gọi thành công!</h3>
//             <pre>{JSON.stringify(result, null, 2)}</pre>
//           </div>
//         )}

//         {error && (
//           <div>
//             <h3 style={{ color: 'red' }}>Có lỗi xảy ra:</h3>
//             <pre>{error}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

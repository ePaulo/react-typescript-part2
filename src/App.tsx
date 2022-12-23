import './App.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/navbar.comp'
import HomePage from './containers/home/home.page'
import CreateProductPage from './containers/create-product/create-product.page'
import ListProductsPage from './containers/list-products/list-products.page'
import ProductDetailsPage from './containers/product-details/product-details.page'
import NotFoundPage from './containers/not-found/not-found.page'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products'>
          <Route index element={<ListProductsPage />} />
          <Route path='create' element={<CreateProductPage />} />
          <Route path=':id' element={<ProductDetailsPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App

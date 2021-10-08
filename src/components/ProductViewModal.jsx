import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { remove} from '../redux/product-modal/product-modal-slice'
import productData from '../assest/fakeData/products'
import ProductView from '../components/ProductView';
import Button from './button';

const ProductViewModal = () => {
    const dispatch = useDispatch()
    const slug = useSelector((state)=> state.productModal.value)
    const  [product, setProduct] = useState(undefined)
    useEffect(()=>{
        setProduct(productData.getProductBySlug(slug))
    },[slug])

    
    return (
        <div className={`product-view__modal ${product === undefined?"":"active"}`}>
            <div className="product-view__modal__content">
                <ProductView product={product} />
                <div className="product-view__modal__content__close">
                    <Button size='sm'
                     onclick={() => dispatch(remove())}>
                        Đóng
                    </Button>
                </div>
            </div>

        </div>
    )
}



export default ProductViewModal

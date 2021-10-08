import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import {addItem} from '../redux/shopping-cart/cartItemsSlice'
import Button from './button';
import { numberWithCommas } from '../utils/numberWithCommas'
import { useHistory } from 'react-router';

const ProductView = props => {

    const dispatch = useDispatch()
    let product = props.product;
    const history = useHistory()
    if(product === undefined) product={
        title: "",
        price: '',
        image01: null,
        image02: null,
        categorySlug: "",
        colors: [],
        slug: "",
        size: [],
        description: ""
    }
   
    const [productPreview, setProductReview] = useState(product.image01);
    const [descriptionExpad, setDescriptionExpad] = useState(false);
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        setProductReview(product.image01)
        setQuantity(1)
        setColor(null)
        setSize(null)
    }, [product])

    const check = () => {
        if (color === null) {
            alert('Vui lòng chọn màu bạn muốn mua');
            return false
        }
        if (size === null) {
            alert('Vui lòng chọn kích cỡ bạn muốn mua');
            return false
        }
        return true
    }

    const addToCart = () => {
        if (check()){
            dispatch(addItem({
                slug: product.slug,
                color: color,
                size: size,
                quantity: quantity,
                price: product.price
            }))
            alert("Success")
        }
        
    }
    const goToCart = () => {
        if (check()) {
            dispatch(addItem({
                slug: product.slug,
                color: color,
                size: size,
                quantity: quantity,
                price: product.price
            }))
            history.push('/cart')
        }
    }
    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div className="product__images__list__item" onClick={() => setProductReview(product.image01)}>
                        <img src={product.image01} alt="" />
                    </div>
                    <div className="product__images__list__item" onClick={() => setProductReview(product.image02)}>
                        <img src={product.image02} alt="" />
                    </div>
                </div>
                <div className="product__images__main">
                    <img src={productPreview} alt="" />
                </div>
                <div className={`product__desc  ${descriptionExpad ? 'expand' : ""}`}>
                    <div className="product__desc__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product__desc__content" dangerouslySetInnerHTML={
                        { __html: product.description }
                    }></div>
                    <div className="product__desc__toggle">
                        <Button size="sm"
                            onclick={() => setDescriptionExpad(!descriptionExpad)}>
                            {descriptionExpad ? "Thu gọn" : "Xem thêm"}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">
                    {product.title}
                </h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(product.price)}
                    </span>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Màu sắc
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.colors.map((item, index) => <div key={index} className={`product__info__item__list__item ${color === item ? 'active' : ''}`}>
                                <div onClick={() => color === item ? setColor(null) : setColor(item)}
                                    className={`circle bg-${item}`}></div>
                            </div>
                            )
                        }
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích Cỡ
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.size.map((item, index) => <div key={index} className={`product__info__item__list__item ${size === item ? 'active' : ''}`}>
                                <div
                                    onClick={() => size === item ? setSize(null) : setSize(item)}
                                    className='circle'>
                                    <span>{item}</span>
                                </div>
                            </div>
                            )
                        }
                    </div>
                </div>

                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Số lượng
                    </div>
                    <div className="product__info__item__quantity">
                        <div
                            onClick={() => quantity <= 1 ? setQuantity(1) : setQuantity(quantity - 1)}
                            className="product__info__item__quantity__btn">
                            <i className='bx bx-minus'></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div
                            onClick={() => setQuantity(quantity + 1)}
                            className="product__info__item__quantity__btn">
                            <i className='bx bx-plus'></i>
                        </div>
                    </div>
                </div>
                <div className="product__info__item">
                    <Button onclick={addToCart} size='sm'>Thêm vào giỏ hàng</Button>
                    <Button size='sm' onclick={goToCart} >Mua ngay</Button>
                </div>
            </div>
            <div className={`product__desc mobile ${descriptionExpad ? 'expand' : ""}`}>
                <div className="product__desc__title">
                    Chi tiết sản phẩm
                </div>
                <div className="product__desc__content" dangerouslySetInnerHTML={
                    { __html: product.description }
                }></div>
                <div className="product__desc__toggle">
                    <Button size="sm"
                        onclick={() => setDescriptionExpad(!descriptionExpad)}>
                        {descriptionExpad ? "Thu gọn" : "Xem thêm"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object.isRequired
}

export default ProductView

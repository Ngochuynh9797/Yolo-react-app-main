import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from './button'
import {numberWithCommas } from '../utils/numberWithCommas'
import {useDispatch} from 'react-redux'
import {set} from '../redux/product-modal/product-modal-slice'


const ProductCard = props => {
    const dispatch = useDispatch()
    return (
        <div className="product-card">
            <Link to= {`/catalog/${props.slug}`}>
                <div className="product-card__img">
                    <img src={props.img1} alt="" />
                    <img src={props.img2} alt="" />
                </div>
                <h3 className = 'product-card__name'>{props.name}</h3>
                <div className="product-card__price">
                    {numberWithCommas(props.price)}
                    <span className="product-card__price__old">
                        <del> {numberWithCommas(399000)}</del>
                    </span>
                </div>
            </Link>
            <div className="product-card__btn">
                <Button
                    size="small"
                    animate={true}
                    icon='bx bx-cart'
                    onclick={()=> dispatch(set(props.slug))}
                >
                    Chọn mua
                </Button>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    img1: PropTypes.string.isRequired,
    img2: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
}

export default ProductCard

import React, { useCallback, useEffect, useState, useRef } from 'react';
import Helmet from '../components/Helmet';
import CheckBox from '../components/CheckBox';
import Button from '../components/button';
import InfinityList from '../components/InfinityList';
import productData from '../assest/fakeData/products';
import category from '../assest/fakeData/category';
import colors from '../assest/fakeData/product-color';
import size from '../assest/fakeData/product-size';

const Catalog = () => {

    const initFilter = {
        category: [],
        color: [],
        size: []
    }
    const productList = productData.getAllProducts();
    const [filter, setFilter] = useState(initFilter);
    const [products, setProducts] = useState(productList);
    const clearFilter = () => setFilter(initFilter);

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case "CATEGORY":
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] })
                    break;
                case "COLOR":
                    setFilter({ ...filter, color: [...filter.color, item.color] })
                    break;
                case "SIZE":
                    setFilter({ ...filter, size: [...filter.size, item.size] })
                    break;
                default:
                    return filter;
            }
        } else {
            switch (type) {
                case "CATEGORY":
                    setFilter({
                        ...filter, category: filter.category.filter(i => {
                            return (item.categorySlug !== i)
                        })
                    })
                    break;
                case "COLOR":
                    setFilter({
                        ...filter, color: filter.color.filter(i => {
                            return (item.color !== i)
                        })
                    })
                    break;
                case "SIZE":
                    setFilter({
                        ...filter, size: filter.size.filter(i => {
                            return (item.size !== i)
                        })
                    })
                    break;
                default:
                    return filter;
            }
        }
    }
    const updateProducts = useCallback(
    () => {
        let temp = productList;
        if(filter.category.length>0) {
            temp = temp.filter(item => {
                return filter.category.includes(item.categorySlug)
            })
        }
        if(filter.color.length>0) {
          temp = temp.filter(item => {
              const check = item.colors.find(color => filter.color.includes(color))
              return check !== undefined
          })
        }
        if(filter.size.length>0) {
            temp = temp.filter(item => {
                const check = item.size.find(i => filter.size.includes(i))
                return check !== undefined
            })
        }
      
        setProducts(temp)
    },[filter, productList])
    
    useEffect(()=>{
        updateProducts()
    }, [updateProducts])

    const filterRef = useRef(null)

    const toggleFilter = () => filterRef.current.classList.toggle('active')

    return (
        <Helmet title={`Sản phẩm`}>
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" >
                        <i className='bx bx-left-arrow-alt' onClick={toggleFilter}></i>
                    </div>
                    {/* category filter */}
                    <div className="catalog__filter__widget__title">
                        Danh mục sản phẩm
                    </div>
                    <div className="catalog__filter__widget__content">
                        {
                            category.map((item, index) =>
                                <div className="catalog__filter__widget__content__item" key={index}>
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('CATEGORY', input, item)}
                                        checked={filter.category.includes(item.categorySlug)}
                                    ></CheckBox></div>
                            )
                        }
                    </div>
                    {/* color filter */}
                    <div className="catalog__filter__widget__title">
                        Màu Sắc
                    </div>
                    <div className="catalog__filter__widget__content">
                        {
                            colors.map((item, index) =>
                                <div className="catalog__filter__widget__content__item" key={index}>
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('COLOR', input, item)}
                                        checked={filter.color.includes(item.color)}
                                    ></CheckBox></div>
                            )
                        }
                    </div>
                    {/* size filter */}
                    <div className="catalog__filter__widget__title">
                        Kích Cỡ
                    </div>
                    <div className="catalog__filter__widget__content">
                        {
                            size.map((item, index) =>
                                <div className="catalog__filter__widget__content__item" key={index}>
                                    <CheckBox
                                        label={item.display}
                                        checked={filter.size.includes(item.size)}
                                        onChange={(input) => filterSelect('SIZE', input, item)}
                                    ></CheckBox>
                                </div>
                            )
                        }
                    </div>
                    {/* clear filter button */}
                    <div className="catalog__filter__widget__title">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onclick={clearFilter}> Xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size = 'sm' onclick={toggleFilter}> Bộ lọc</Button>
                </div>
                {/* Content */}
                <div className="catalog__content">
                   <InfinityList data={products}/> 
                </div>
            </div>
        </Helmet>
    )
};

export default Catalog;
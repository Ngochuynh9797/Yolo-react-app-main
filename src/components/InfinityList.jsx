import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Grid from '../components/Grid';
import ProductCard from './ProductCard';




const InfinityList = props => {
    const data =props.data;
    const perload = 6;
    const [pageIndex, setPageIndex] = useState(0);
    const [datalist, setDatalist] = useState()
    const listRef = useRef(null)
    const [load, setLoad] = useState(false)

    useEffect(() => {
     setDatalist(data.slice(0, perload))
       
    }, [data])
  
    useEffect(() => {
        if(listRef&&listRef.current) {
            window.addEventListener('scroll', () => {
                if(window.scrollY + window.innerHeight >= listRef.current.offsetTop + listRef.current.clientHeight + 200){
                    setLoad(true)
                }
            })
        }
       
    }, [listRef])

    useEffect(() => {
      const getData = () => {
          const pages = Math.floor(data.length/perload)
          const maxPage = data.length%perload === 0 ? pages: pages +1
          if(load && pageIndex <= maxPage){
              const startIndex = perload*pageIndex
              const endIndex = pageIndex === maxPage ? data.length -1: startIndex + perload;
              setDatalist(
                  datalist.concat(data.slice(startIndex, endIndex))
              )
              setLoad(false)
              setPageIndex(pageIndex+1)
          }
      }
      getData()
    }, [data, load, datalist,pageIndex])

    return (
        <div ref={listRef}>
            <Grid
                        col={3}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            data.map((product, index) =>
                                <ProductCard
                                    key={index}
                                    img1={product.image01}
                                    img2={product.image02}
                                    name={product.title}
                                    price={Number(product.price)}
                                    slug={product.slug}

                                />
                            )
                        }
                    </Grid>
        </div>
    )
}

InfinityList.propTypes = {
    data: PropTypes.array.isRequired
}

export default InfinityList

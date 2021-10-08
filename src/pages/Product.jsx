import React,{useState, useEffect} from 'react';

import Helmet from '../components/Helmet';
import Section, { SectionBody, SectionTitle } from '../components/Section';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductCard';
import ProductView  from '../components/ProductView';

import productData from '../assest/fakeData/products'

const Product = (props) => {

  const product = productData.getProductBySlug(props.match.params.slug)
  const relatedProducts = productData.getProducts(8)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])
  return (
    <Helmet title={product.title}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>
      <SectionTitle>
        KHÁM PHÁ THÊM
      </SectionTitle>
      <SectionBody>
        <Grid
          col={4}
          mdCol={2}
          smCol={1}
          gap={20}
        >
          {
            relatedProducts.map((product, index) => {
              return <ProductCard
                key={index}
                img1={product.image01}
                img2={product.image02}
                name={product.title}
                price={Number(product.price)}
                slug={product.slug}
              />
            })
          }
        </Grid>
      </SectionBody>
    </Helmet>
  )
};

export default Product;
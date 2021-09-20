import React from 'react';
import Helmet from '../components/Helmet';
import HeroSlider from './../components/HeroSlider';
import heroSliderData from './../assest/fakeData/hero-slider';
import Section, { SectionTitle, SectionBody } from '../components/Section';
import policy from '../assest/fakeData/policy';
import PolicyCard from '../components/PolicyCard';
import Grid from '../components/Grid';
import { Link } from 'react-router-dom';
import productData from '../assest/fakeData/products'
import ProductCard from '../components/ProductCard';
import banner from '../assest/images/Slider/banner.png'
 



const Home = () => {
    return (
        <Helmet title='Trang chủ'>
            {/* hero slider */}
            <HeroSlider
                data={heroSliderData}
                control={true}
                auto={false}
                timeOut={3000} />
            {/*policy card  */}
            <Section>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={10}
                    >

                        {
                            policy.map((item, index) =>
                                <Link to='/policy'  key={index}>
                                    <PolicyCard
                                       
                                        name={item.name}
                                        description={item.description}
                                        icon={item.icon}
                                    />
                                </Link>
                            )
                        }
                    </Grid>
                </SectionBody>
            </Section>

            <Section>

                <SectionTitle> Top sản phẩm bán chạy trong tuần</SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={10}>
                        {
                            productData.getProducts(4).map((item, index) =>
                                <ProductCard
                                    key={index}
                                    img1={item.image01}
                                    img2={item.image02}
                                    name={item.title}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                />

                            )
                        }
                    </Grid>
                </SectionBody>
            </Section>
        
            <Section>
                <SectionTitle> Sản phẩm mới</SectionTitle>
                <SectionBody>
                <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={10}>
                        {
                            productData.getProducts(8).map((item, index) =>
                                <ProductCard
                                    key={index}
                                    img1={item.image01}
                                    img2={item.image02}
                                    name={item.title}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                />
                            )
                        }
                    </Grid>
                </SectionBody>
            </Section>

           <Section>
               <SectionBody>
                   <Link to ="/catalog">
                   <img src = {banner} alt ="" ></img>
                   </Link>
               </SectionBody>
             </Section>             
        
        </Helmet>

    )
};

export default Home;
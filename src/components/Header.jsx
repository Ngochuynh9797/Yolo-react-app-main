import React, {useEffect, useRef} from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assest/images/Logo.png';



const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Sản phẩm",
        path: "/catalog"
    },
    {
        display: "Phụ kiện",
        path: "/aceessories"
    },
    {
        display: "Liên hệ",
        path: "/contact"
    }
]

const Header = () => {

    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(item => item.path === pathname)

    const headerRef = useRef(null);
    const menuRef = useRef(null);
    
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
                headerRef.current.classList.add("shrink")
            } else {
                headerRef.current.classList.remove("shrink")
            }
        })
        return () => {
            window.removeEventListener('scroll')
        }
    },[])

    const toggleMenu = () => {
        menuRef.current.classList.toggle('active')
    }
    return (
        <div className="header" ref = {headerRef}>
            <div className="container">
                <div className="header__logo">
                    <img src={logo} alt="logo yody" />
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={toggleMenu}>
                    <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuRef}>
                        <div className="header__menu__left__close" onClick={toggleMenu}>
                        <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => {
                                return (
                                    <div key={index} className={`header__menu__left__item header__menu__item ${activeNav === index ? 'active':'' }`} onClick={toggleMenu}>
                                        <Link to={item.path}>
                                            <span>{item.display}</span>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__right__item header__menu__item"  >
                        <i className="bx bx-search"></i>
                        </div>
                        <div className="header__menu__right__item header__menu__item">
                            <Link to="/cart">
                            <i className="bx bx-shopping-bag"></i>
                            </Link>
                        </div>
                        <div className="header__menu__right__item header__menu__item">
                        <i className="bx bx-user"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Header

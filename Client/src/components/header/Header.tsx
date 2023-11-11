import './header.css';
import Logo from '../../assets/svgs/logo.svg';

const Header = () => {
  return (
    <>
    <header>
        <div className="header header--light">
            <div className="header__left">
                  <img className='logo' src={Logo}/>
            </div>
            <div className="header__mid">
                <nav className='nav'>
                    <a href="#" className='nav__link'>My Feed</a>
                    <a href="#" className='nav__link'>Discussions</a>
                    <a href="#" className='nav__link'>Headless</a>
                    <a href="#" className='nav__link'>Rix</a>
                    <a href="#" className='nav__link'>More</a>
                </nav>
            </div>
            <div className="header__right">
              
            </div>
        </div>
    </header>
    </>
  )
}

export default Header

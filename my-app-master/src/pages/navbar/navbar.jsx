import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className="App">
        <div className="special">
            <ul className="special-menu-list">
                    <Link to="home" className="special-menu-list-item home-li">Home</Link>
                    <Link to="master-rooms" className="special-menu-list-item home-li">Master Rooms</Link>
                    <Link to="menu"className="special-menu-list-item home-li ">Menu</Link>
                    <Link to="blog" className="special-menu-list-item home-li ">Blog</Link>                    
            </ul>
        </div>
    </div>
  );
}

export default Navbar;

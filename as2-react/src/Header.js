import {Link} from 'react-router-dom';


// Function Component
function Header() {
    const headerStyle = {
        minHeight: '15vh',
        backgroundColor: '#2C3E50',
    };

    const taglineStyle = {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem',
    };

    // Component UI: HTML Rendering
    return (
        <header className="row" style={headerStyle}>
            <div className="col-12 col-md-12 col-lg-8" style={taglineStyle}>
                Phone Fix Booking System
            </div>
            <div className="col-12 col-md-12 col-lg-4">
                <div className="row">
                    <Link to="/" className="col-6 bg-info p-0 m-0 border border-dark text-white text-center">
                        HOME
                    </Link>
                    <Link to="/" className="col-6 bg-info p-0 m-0 border border-dark text-white text-center">
                        EXTENSION
                    </Link>
                </div>
            </div>
        </header>
    );
}

// Export this component to the entire app, can be re-used or hooked into other Components
export default Header;

import { Link } from 'react-router-dom';

const index = () => {
    return (
        <div className="hidden lg:block w-64 h-screen bg-gray-100">
            <div>
                <Link to={'/dashboard'}>Dashboard</Link>
            </div>
            <div>
                <Link to={'/post'}>Post</Link>
            </div>
        </div>
    );
};

export default index;

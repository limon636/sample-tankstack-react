import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../src/assets/scss/app.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        {/* <Provider store={store}> */}

        <App />
        {/* </Provider> */}
    </BrowserRouter>
);

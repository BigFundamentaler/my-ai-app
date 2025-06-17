import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './style.css';
import './wdyr.tsx';
const App = () => {
    return <>
        <div>
            <h1>Welcome to My AI App</h1>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <p>This is a simple React application with TypeScript.</p>
        </div>
    </>
}

const container = document.getElementById('root');
if (!container) {
    throw new Error('Root container not found');
}
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
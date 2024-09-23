import "./App.css";
import router from "./router.tsx";
import { ContextProvider } from "./contexts/contextProvider.tsx";
import { RouterProvider } from "react-router-dom";

function App() {
    return (
        <>
            <ContextProvider>
                <RouterProvider router={router} />
            </ContextProvider>
        </>
    );
}

export default App;

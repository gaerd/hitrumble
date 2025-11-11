import { createRoot } from "react-dom/client";
import App from "./App";
/* HITRUMBLE START - Import design tokens and global styles */
import "./styles/tokens.css";
import "./styles/globals.css";
/* HITRUMBLE END */
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

function resolvePage(name) {
    const nameSplit = name.split("::");
    const [page, module] =
        nameSplit.length > 1 ? nameSplit.reverse() : nameSplit;

    const pagePath = module
        ? `../../Modules/${module}/Resources/js/Pages/${page}.jsx`
        : `./Pages/${page}.jsx`;

    const pages = module
        ? import.meta.glob("../../Modules/**/Resources/js/Pages/**/*.jsx")
        : import.meta.glob("./Pages/**/*.jsx");

    if (!pages[pagePath]) {
        const errorMessage = `Página não encontrada: ${pagePath}`;
        console.log(errorMessage);
        throw new Error(errorMessage);
    }

    return typeof pages[pagePath] === "function"
        ? pages[pagePath]()
        : pages[pagePath];
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePage(`${name}`),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});

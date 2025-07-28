//export { Report, type Props as ReportProps } from './report';

//import ReactDOM from "react-dom";
import { bootstrap } from 'safetest/react';
import App from "../App";
import { createRoot } from 'react-dom/client';


const container = document.getElementById("app");
const element = <App />;
//const root = createRoot(container);

const isDev = process.env.NODE_ENV !== 'production';

bootstrap({
  //element,
  //render: (element) => ReactDOM.render(element, container),
  //root.render(element);
  // If using React 18:
  //render: (element) => ReactDOM.createRoot(container).render(element),
  
  element,
  render: (element) => {
    if (container) {
      createRoot(container).render(element);
    } else {
      throw new Error("No se encontró el elemento con id 'app'");
    }
  },
  // Add one of the following depending on your bundler...

  // Webpack:
  //webpackContext: isDev && import.meta.webpackContext('.', {
  //  recursive: true,
  //  regExp: /\.safetest$/,
  //  mode: 'lazy'
  //})

  // Vite:
   importGlob: isDev && import.meta.glob('./**/*.safetest.{j,t}s{,x}'),

  // Using the `npx safetest generate-import-map src/Bootstrap.tsx src > src/imports.tsx` syntax:
   //imports, // Where imports is defined as `import imports from './imports';`

  // Other:
   //import: isDev && async (s) => import(`${s.replace(/.*src/, '.').replace(/\.safetest$/, '')}.safetest`),

});
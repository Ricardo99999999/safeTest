# Explicaciones safeTest

## Objetivo del documento
El objetivo de este documento es proporcionar un paso por paso de los distintos puntos que se deben de realizar con safeTest a la hora de utilizar su apartado examples. Esto es debido a que dentro de la [documentación de safeTest](https://github.com/kolodny/safetest/blob/main/README.md) no queda claro. Particularmente, nos centraremos en el example "vite-react-ts"

## Pasos a realizar
Para que el apartado examples funcione , se deben de seguir los siguientes pasos :
1. Seguir la documentación oficial: [https://github.com/kolodny/safetest/blob/main/README.md](https://github.com/kolodny/safetest/blob/main/README.md)
2. Descargar el código del repositorio [https://github.com/kolodny/safetest/tree/main](https://github.com/kolodny/safetest/tree/main) , tal y como se indica en el paso 1 de la documentación.
3. En el paso 2, he realizado modificaciones en la información que se indica en la documentación dado que no funciona correctamente con el proyecto vite-react-ts. Es por eso que estos cambios se realizarán en el package.json de este proyecto, no en el monorepo padre. Lo que cambiaremos serán las siguientes líneas : 

```json
"scripts": {
	"safetest": "cross-env OPT_URL=http://localhost:3000 vitest run --inspect --config vite.safetest.config",
    "safetest:ci:test": "rm -f artifacts.json && OPT_URL=https://safetest-two.vercel.app/vite-react-ts OPT_CI=1 OPT_DOCKER=1 OPT_ARTIFACTS=artifacts.json npm run safetest -- --run --bail=5",
    "safetest:ci": "rm -f artifacts.json && OPT_URL=${DEPLOYED_URL} OPT_CI=1 OPT_DOCKER=1 npm run safetest -- --watchAll=false --ci=1 --json --outputFile=results.json",
    "safetest:regenerate-screenshots": "cross-env OPT_DOCKER=1 npm run safetest -- --watchAll=false --update-snapshot",
}
```

4. **Paso 3** : Crear archivo setup-safetest.tsx tal y como se indica en la documentación (dentro del proyecto vite-react-ts)
5. **Paso 3** : Crear archivo vitest.safetest.config.ts que tendrá exactamente la misma información que el archivo vite.safetest.config.ts (dentro del proyecto vite-react-ts , y en la ruta que indica la documentación). Este archivo no es necesario al ya disponer de vite.safetest.config.ts , pero igualmente, dado que se indica en la documentación, lo creamos.
6. **Paso 4** : Se puede crear el archivo index.tsx. Dado que ya se dispone del archivo main.tsx (dentro del proyecto vite-react-ts), no lo crearía. Es importante modificar el archivo main.tsx para que las pruebas funcionen correctamente. Lo modificaremos al completo por lo siguiente : 
```json
	   import React from 'react';
	   import ReactDOM from 'react-dom/client';
	   import App from './App.tsx';
	   
	   import { bootstrap } from 'safetest/react';
	   // import { Bootstrap } from 'safetest/react';
	   import './index.css';
	   
	   const root = ReactDOM.createRoot(document.getElementById('root')!);
	   
	   bootstrap({
	   element: (
	   	<React.StrictMode>
	   	<App />
	   	</React.StrictMode>
	   ),
	   importGlob: import.meta.glob('./**/*.safetest.{j,t}s{,x}'),
	   render: (element) => root.render(element),
   });
```
7. En el monorepo (proyecto padre) , se debe de modificar el package.json para evitar errores. Las principales que pueden dar problemas son (todas dentro de devDependencies) : 
	1. "@types/react": "^18.3.23",
	2. "react": "^18.2.0",
	3. "@types/react-dom": "^19.1.6",
	4. "typescript": "5.2.2",
8. En el proyecto vite-react-ts, añadir en la parte de dependencies del package.json "safetest": "file:../.."
9. Eliminar tanto en el monorepo padre como en el proyecto vite-react-ts node_module , y package-lock.json.
10. Hacer en el monorepo npm install --legacy-peer-deps
11. Hacer en el hijo npm install --force
12. Todo lo anterior ha tenido que funcionar correctamente. En este punto, ya solo queda hacer los pasos finales que nos indican desde safeTest.
	1. Abre una consola y ejecuta npm run build -- --watch en el monorepo padre.
	2. Abre una consola y ejecuta npm run dev -- --force
	3. npx cross-env OPT_HEADED=1 npm run safetest
	Nota : Si no da ningún problema, podrás ver como se ejecutan pruebas automatizadas. Es posible que varias fallen. Esto será debido a dependencias conflictivas.

## Otras consideraciones a tener en cuenta
1. Si quieres tener el proyecto limpio, puedes eliminar todas las subcarpetas de examples a excepción de vite-react-ts
2. Notese que dispone de un gran número de dependencias. Esto puede hacer que algunas características fallen dado que pueden entrar en conflicto y porque recogerá la última versión disponible que no tiene porqué ser compatibles entre ellas y todas sus subdependencias. Mucho cuidado porque será el error más común que os encontrareis.
3. Se proporcionan los principales comandos indicados en la documentación oficial.
```json
			# Session 1 is used to build the library (this is run in the root of the project)
			npm run build -- --watch

			# Session 2 is used to run the example app (this is run in the examples/vite-react-ts folder)
			npm run dev -- --force # Force vite to not use the cache

			# Session 3 is used to run the tests (this is run in the examples/vite-react-ts folder)
			npx cross-env OPT_HEADED=1 npm run safetest
```



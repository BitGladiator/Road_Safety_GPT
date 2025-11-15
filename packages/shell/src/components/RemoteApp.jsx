import React, { useState, useEffect } from "react";

export default function RemoteApp({ scope, module, url }) {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const initializeComponent = async () => {
      try {
        if (window[scope]) {
          const componentModule = await loadComponent(scope, module);
          if (isMounted && componentModule && componentModule.default) {
            setComponent(() => componentModule.default);
          }
          return;
        }
        const script = document.createElement("script");
        script.src = url;
        
        script.onload = async () => {
          if (isMounted) {
            try {
              const componentModule = await loadComponent(scope, module);
              if (componentModule && componentModule.default) {
                setComponent(() => componentModule.default);
              }
            } catch (error) {
              console.error("Error loading component module:", error);
            }
          }
        };

        script.onerror = () => {
          console.error(`Failed to load script: ${url}`);
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error("Error loading remote component:", error);
      }
    };

    initializeComponent();

    return () => {
      isMounted = false;
    };
  }, [scope, module, url]);
  return Component ? <Component /> : null;
}

async function loadComponent(scope, module) {
  await __webpack_init_sharing__("default");
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  const factory = await window[scope].get(module);
  const moduleObject = factory();
  return moduleObject;
}
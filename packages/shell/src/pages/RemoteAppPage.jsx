import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RemoteApp from "../components/RemoteApp";
import api from "../services/api";

export default function RemoteAppPage() {
  const { appId } = useParams();
  const [appConfig, setAppConfig] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppConfig();
  }, [appId]);

  const fetchAppConfig = async () => {
    try {
      const response = await api.get("/me/screens");
      const app = response.data.find((s) => s.id === appId);

      if (!app) {
        setError("App not found");
      } else {
        setAppConfig(app);
      }
    } catch (err) {
      setError("Failed to load app configuration");
    }
  };

  if (error) {
    return (
      <div style={styles.error}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  
  if (!appConfig) {
    return null; 
  }

  return (
    <div>
      <RemoteApp
        scope={appConfig.scope}
        module={appConfig.module}
        url={appConfig.url}
      />
    </div>
  );
}

const styles = {
  error: {
    padding: "24px",
    background: "white",
    borderRadius: "8px",
    color: "#c33",
  },
}; 
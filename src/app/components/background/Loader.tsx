"use client"

import { Html, useProgress } from "@react-three/drei";

// CanvasLoader : Loader spécifique à React Three Fiber
export const CanvasLoader = () => {
  const { progress } = useProgress(); // Récupère la progression du chargement

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff", // Assure-toi que le texte est bien visible sur ton fond
      }}
    >
      {/* Affiche un cercle de progression animé si tu veux */}
      <div
        className="canvas-loader"
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid #12DD88", // Tu peux ajuster les couleurs ici
          borderTop: "5px solid transparent",
          borderRadius: "50%",
          animation: "spin 2s linear infinite", // Animation de rotation
        }}
      />
      <p
        style={{
          fontSize: "14px",
          color: "#F1F1F1",
          fontWeight: "800",
          marginTop: "20px",
        }}
      >
        {progress.toFixed(2)}%
      </p>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Html>
  );
};

// BasicLoader : Loader basique en texte
export const BasicLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#12DD88",
      }}
    >
      Loading...
    </div>
  );
};
import { useNavigate } from 'react-router-dom';
import fondo from '../components/image/Imagen.jpg';

export const LoginPage = () => {
  const navigate = useNavigate();

  const styles = {
    pageContainer: {
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    imageContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${fondo})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: -1, // Imagen detrás del formulario
    },
    loginContainer: {
      background: "rgba(255, 255, 255, 0.0)", // Fondo más transparente
      padding: "40px",
      borderRadius: "10px",
      //boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
    },
    heading: {
      color: "#333",
      marginBottom: "30px",
      fontSize: "24px",
      fontWeight: "bold",
    },
    inputGroup: {
      marginBottom: "20px",
      textAlign: "left",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "none",
      borderBottom: "1px solid #9a5ea7",
      boxSizing: "border-box",
      background: "rgba(255, 255, 255, 0.0)",
    },
    button: {
      background: "#8e44ad",
      color: "white",
      border: "none",
      padding: "12px 30px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "10px",
    },
    buttonHover: {
      background: "#732d91",
    },
    links: {
      marginTop: "20px",
    },
    link: {
      color: "#8e44ad",
      textDecoration: "none",
      fontSize: "14px",
    },
    linkHover: {
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.pageContainer}>
      {/* Imagen de fondo */}
      <div style={styles.imageContainer}></div>

      {/* Formulario de inicio de sesión */}
      <div style={styles.loginContainer}>
        <h1 style={styles.heading}>Inicio de Sesión</h1>
        <div style={styles.inputGroup}>
          <label htmlFor="usuario" style={styles.label}>
            Usuario:
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="contrasena" style={styles.label}>
            Contraseña:
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            style={styles.input}
          />
        </div>
        <button
          type="button"
          style={styles.button}
          onClick={() => navigate("/HomePage")}
        >
          Ingresar
        </button>
        <div style={styles.links}>
          <a href="/Recover" style={styles.link}>
            ¿Olvidaste tu contraseña?
          </a>
          <br />
          <span style={{ color: "#666", fontSize: "14px" }}>
            ¿No tienes una cuenta?{" "}
          </span>
          <a href="/Register" style={styles.link}>
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
};

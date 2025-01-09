import { useNavigate } from 'react-router-dom';
import fondo from '../components/image/Imagen.jpg';

export const RegisterPage = () => {
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
      borderBottom: "1px solid #8e44ad",
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
        <h1 style={styles.heading}>Crear Cuenta</h1>
        <div style={styles.inputGroup}>
          <label htmlFor="usuario" style={styles.label}>
            Nombre:
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
            Correo:
          </label>
          <input
            type="email"
            id="contrasena"
            name="contrasena"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="contrasena" style={styles.label}>
            Telefono:
          </label>
          <input
            type="tel"
            id="contrasena"
            name="contrasena"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="contrasena" style={styles.label}>
            Direccion:
          </label>
          <input
            type="text"
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
          Registrarse
        </button>
        <div style={styles.links}>
          <span style={{ color: "#666", fontSize: "14px" }}>
            ¿Ya tienes una cuenta?{" "}
          </span>
          <a href="/" style={styles.link}>
            Inicia Sesion
          </a>
        </div>
      </div>
    </div>
  );
};
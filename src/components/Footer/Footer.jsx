import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>Developed by Yuriy Nesterenko</p>
      <p>{currentYear}</p>
    </footer>
  );
}

export default Footer;

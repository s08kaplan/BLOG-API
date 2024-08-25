import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import footerStyle from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={footerStyle.footer}>
      <main className={footerStyle.container}>
        <h6 className={footerStyle.message} data-test="footerMessage">
          Express Yourself Freely
        </h6>
        <div className={footerStyle["footer-icons"]} data-test="footerIcons">
          <div className={`${footerStyle.icon} ${footerStyle.iconWhatsapp}`}>
            <IoLogoWhatsapp />
          </div>
          <div className={`${footerStyle.icon} ${footerStyle.iconFacebook}`}>
            <FaFacebook />
          </div>
          <div className={`${footerStyle.icon} ${footerStyle.iconInstagram}`}>
            <IoLogoInstagram />
          </div>
          <div className={`${footerStyle.icon} ${footerStyle.iconTelegram}`}>
            <FaTelegram />
          </div>
          <div className={`${footerStyle.icon} ${footerStyle.iconTwitter}`}>
            <FaXTwitter />
          </div>
        </div>
      </main>
    </footer>
  );
};

export default Footer;

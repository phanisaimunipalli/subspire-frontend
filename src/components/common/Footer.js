const Footer = () => {
  const link = "https://subspire.us";
  const target = "_blank";

  return (
    <div className="footer">
      Copyright © <small>{new Date().getFullYear()}</small> Team Maverick{" "}
      <a href={link} target={target}>
        subspire.us
      </a>
    </div>
  );
};

export default Footer;

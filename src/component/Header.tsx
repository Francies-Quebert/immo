import React from "react";

interface Props {
  title: string;
  Image: string | undefined;
}
// Header Component
const Header: React.FC<Props> = ({ title = "", Image = undefined }) => {
  return (
    <div className="header">
      <div className="header__container">
        {/* header image */}
        <img className="header__logo" src={Image} alt="Immo Logo" />
      </div>
      {/* header title */}
      <div className="header__title">
        <div className="header__title--container">{title}</div>
      </div>
    </div>
  );
};

export default Header;

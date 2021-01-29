import React from "react";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import "./index.css";

const Header = ({ token, setUser }) => {
  const history = useHistory();

  return (
    <div className="header-container">
      <div
        onClick={() => {
          history.push("/");
        }}
      >
        <img className="header-logo" src={logo} alt="vinted" />
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des articles"
        />
        <FontAwesomeIcon icon="search" className="search-input-icon" />
      </div>
      {token ? (
        <button
          onClick={() => {
            setUser(null);
          }}
          className="button-logout"
        >
          Se déconnecter
        </button>
      ) : (
        <div>
          <button
            onClick={() => {
              history.push("/signup");
            }}
            className="header-button button-login-signup button-signup"
          >
            S'inscrire
          </button>
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="header-button button-login-signup"
          >
            Se connecter
          </button>
        </div>
      )}
      <button
        onClick={() => {
          history.push("/publish");
        }}
        className="header-button button-sold"
      >
        Vends tes articles
      </button>
    </div>
  );
};

export default Header;

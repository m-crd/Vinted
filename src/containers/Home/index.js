import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";
import tear from "../../assets/images/tear.svg";
import Loader from "react-loader-spinner";

import "./index.css";

const Home = () => {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <Loader
      className="home-loader"
      type="Puff"
      color="#2CB1BA"
      height={80}
      width={80}
    />
  ) : (
    <>
      <div className="home-hero-bg-img">
        <img src={tear} alt="forme" className="home-hero-forme" />
        <div>
          <div className="home-hero-ready">
            Prêts à faire du tri dans vos placards ?
            <button
              onClick={() => {
                history.push("/publish");
              }}
            >
              Commencer à vendre
            </button>
          </div>
        </div>
      </div>

      <div className="home-card-wrapper">
        {data.offers.map((card, index) => {
          return <Card key={index} data={card} />;
        })}
      </div>
    </>
  );
};

export default Home;

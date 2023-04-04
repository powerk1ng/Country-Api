import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HashLoader } from "react-spinners";


const SingleCountryInfo = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then((res) => setCountry(res.data[0]))
      .catch((error) => {
        console.log(error);
      });
  }, [name]);

  useEffect(() => {
    if (country && country.borders) {
      Promise.all(
        country.borders
          .filter((border) => border !== "ARM")
          .map((border) =>
            axios.get(`https://restcountries.com/v3.1/alpha/${border}`)
          )
      )
        .then((res) =>
          setBorderCountries(
            res.map((borderCountry) => borderCountry.data[0].name.common)
          )
        )
        .catch((error) => {
          console.log(error);
        });
    } else {
      setBorderCountries([]);
    }
  }, [country]);

  if (!country) {
    return <div className="pt-24 h-screen flex justify-center items-center text-3xl w-full bg-dark dark:text-white">Loaidng...<HashLoader color="#36d7b7" /></div>;
  }

  const currencyArray = Object.values(country.currencies);

  return (
    <div className="pt-28 px-5 pb-5 min-h-screen bg-dark dark:text-white">
      <button
        className="border-2 py-1 px-2 border-black md:hover:bg-black md:hover:text-white duration-300 flex items-center gap-x-2 dark:border-white dark:hover:bg-white dark:hover:text-black"
        onClick={() => navigate(-1)}
      >
        <AiOutlineArrowLeft />
        Go Back
      </button>

      <div className="flex gap-10 md:items-center mt-8 max-md:flex-col">
        {/* flag */}
        <div>
          <img
            className="h-[250px] w-[480px] object-cover border-2 border-black dark:border-white"
            src={country.flags?.png || country.flags?.svg}
            alt={country.name.common}
          />
        </div>

        <div>
          {/* capital */}
          <h2 className="text-3xl font-bold mb-4 italic">
            {country.name.common}
          </h2>

            {/* Native name */}
            <p>
            <span className="font-semibold">Capital:</span>{" "}
            <span className="text-gray-400">
              {country.capital}
            </span>
          </p>

          {/* Native name */}
          <p>
            <span className="font-semibold">Native name:</span>{" "}
            <span className="text-gray-400">
              {Object.values(country?.name?.nativeName)[0]?.common || "N/A"}
            </span>
          </p>

          {/* Population */}
          <p>
            <span className="font-semibold">Population:</span>{" "}
            <span className="text-gray-400">
              {country.population.toLocaleString()}
            </span>
          </p>

          {/* Region */}
          <p>
            <span className="font-semibold">Region:</span>{" "}
            <span className="text-gray-400">{country.region}</span>
          </p>

          {/* Sub Region */}
          <p>
            <span className="font-semibold">Sub Region:</span>{" "}
            <span className="text-gray-400">{country.subregion}</span>
          </p>

          {/* Capital */}
          <p>
            <span className="font-semibold">Capital:</span>{" "}
            <span className="text-gray-400">{country.capital.join(", ")}</span>
          </p>

          {/* Domain */}
          <p>
            <span className="font-semibold">Top Level Domain:</span>{" "}
            <span className="text-gray-400">{country.tld[0]}</span>
          </p>

          {/* currencies */}
          <p>
            <span className="font-semibold">Currencies:</span>{" "}
            <span className="text-gray-400">
              {currencyArray.map((currency) => `${currency.name}`)}
            </span>
          </p>

          {/* languages */}
          <p>
            <span className="font-semibold">Languages:</span>{" "}
            <span className="text-gray-400">
              {Object.values(country.languages).join(", ")}
            </span>
          </p>
        </div>
      </div>

      {/* bordering countries */}
      <h2>
        <span className="font-semibold">Bordering Countries</span>:
      </h2>
      <div className="flex gap-x-4 gap-y-2 flex-wrap mt-2">
        {country.borders
          ? borderCountries.map((border) => (
              <Link
                className="border-2 border-black/50 px-2 md:hover:bg-black/60 md:hover:text-white duration-300 dark:border-white dark:hover:text-black dark:hover:bg-white"
                key={border}
                to={`/country/${border}`}
              >
                {border}
              </Link>
            ))
          : "N/A"}
      </div>

      <h2 className="border-t-2 border-t-black dark:border-t-white  pt-1 text-xl font-bold max-w-[600px] mt-20 max-sm:mt-10 max-sm:text-lg dark:text-white font-mono">Challenge your friends in how many attempts you can get to other continent or specific country by clicking on bordering countries! :)</h2>
    </div>
  );
};

export default SingleCountryInfo;

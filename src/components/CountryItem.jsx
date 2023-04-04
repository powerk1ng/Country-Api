import { Link } from "react-router-dom";

const CountryItem = ({
  flags,
  capital,
  name,
  region,
  population,
}) => {
  
  
  return (
    <Link to={`/country/${name.common}`} className="bg-white border-2 shadow-lg shadow-black/30 rounded-lg hover:-translate-y-2.5 transition-transform duration-500 dark:shadow-white/50">
      {/* card-top img */}
      <div className="sm:h-[200px] max-[640px]:h-[280px]">
        <img
          className="h-full object-cover w-full rounded-t-lg"
          src={flags?.png}
          alt={flags?.alt}
        />
      </div>

      {/* card-bottom info */}
      <div className="p-2.5">
        {/* country name */}
        <h2 className="text-lg font-bold mb-3">{name.common}</h2>

        {/* Population */}
        <p>
          <span className="font-semibold">Population:</span>{" "}
          <span className="text-gray-400">{population.toLocaleString() ?? "unknown"}</span>
        </p>

        {/* Capital */}
        <p>
          <span className="font-semibold">Capital</span>:{" "}
          <span className="text-gray-400">{capital?.join(", ") || "Absent"}</span>
        </p>

        {/* Region */}
        <p>
          <span className="font-semibold">Region:</span>{" "}
          <span className="text-gray-400">{region}</span>
        </p>
      </div>
    </Link>
  );
};

export default CountryItem;

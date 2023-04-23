import CountryItem from "./CountryItem";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import FiltersDropdown from "./FiltersDropdown";
import Skeleton from "./Skeleton";
import { DotLoader } from 'react-spinners';

const Hero = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [inputData, setInputData] = useState([]);
  const [limit, setLimit] = useState(12);
  const [cardsLoad, setCardsLoading] = useState(false)

  const showMoreCards = () => {
    setCardsLoading(true);

    setTimeout(() => {
      setLimit(prevLimit => prevLimit + 20);
      setCardsLoading(false);
    }, 2000);
  };

  const url = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(url)
        .then((res) => {
          setData(
            res.data
              .filter((country) => country.name.common !== "Armenia")
              .sort((a, b) => a.name.common.localeCompare(b.name.common))
          );
        })
        .then(setLoading(false))
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, 2000);
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    setInputData(filteredData);
  }, [filteredData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchValue = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    const filteredCountries = filteredData.filter((country) =>
      country.name.common.toLowerCase().startsWith(value.toLowerCase())
    );
    setInputData(filteredCountries);
  };

  return (
    <div className="w-full relative pt-28 pb-8 bg-dark">
      {/* input / filter dropdown */}
      <div className="flex sm:justify-between md:mx-auto px-5 max-sm:gap-y-5 max-sm:flex-col max-sm:items-end">
        {/* input */}
        <form
          className="shadow-md shadow-black/30 sm:w-[300px] h-14 flex gap-2 items-center pl-3 w-full dark:border-white dark:border-2 dark:text-white"
          onSubmit={handleFormSubmit}
        >
          <BsSearch size={20} />
          <input
            onChange={handleSearchValue}
            value={searchValue}
            className="w-full h-full outline-none pr-5 font-mono bg-dark"
            type="text"
            placeholder="Search for a country.."
          />
        </form>

        {/*filtration dropdown */}
        <div className="max-sm:w-full">
          <FiltersDropdown
            initialData={data}
            setData={setFilteredData}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
            setSearchValue={setSearchValue}
          />
        </div>
      </div>

      {/* loading element */}
      {loading && (
        <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-10 px-5 mx-auto mt-8">
          {[
            ...Array(10)
              .fill()
              .map((_, index) => <Skeleton key={index} />),
          ]}
        </div>
      )}

      {/* Country Cards Body */}
      <div className="grid grid-cols-4 max-xl:grid-cols-3  max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 gap-10 px-5 mx-auto mt-8">
        {inputData.slice(0, limit).map((item) => (
          <CountryItem key={item.name.common} {...item} data={inputData} />
        ))}
      </div>

          {/* Button Show More */}
      {limit < inputData.length &&
        <div className="text-center mt-8">
          <button
            onClick={showMoreCards}
            className={`py-4 px-5 bg-blue-500 text-white hover:bg-blue-400 duration-300 active:scale-[0.98] outline-none dark:bg-black dark:border-2 dark:border-white dark:hover:bg-white dark:hover:text-black`}>
            {cardsLoad ? 'Loading More Countries..' : 'Show More Countries'}
            {cardsLoad && <DotLoader className="ml-2" color="red" size={20}/>}            
          </button>
        </div>
      }
    </div>
  );
};

export default Hero;

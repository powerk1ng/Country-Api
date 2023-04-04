import { Dropdown, Space, Typography } from "antd";
import items from "../assets/filters.js";
import { BsChevronDown } from "react-icons/bs";


const FiltersDropdown = ({ setData, initialData, setSelectedFilter, selectedFilter, setSearchValue }) => {
  
  const handleClick = ({ key}) => {
    const selectedFilterValue = items[key - 1].label;
    setSelectedFilter(selectedFilterValue);

    if (selectedFilterValue === "All") {
      setData(initialData);
      setSearchValue('');
    } else {
      const filteredRegion = initialData.filter(
        (country) => country.region === selectedFilterValue
      );
      setData(filteredRegion);
      setSearchValue('');
    }
  };

  return (
    <Dropdown
      className="shadow-md shadow-black/30 h-14 flex gap-2 items-center pl-3 px-2 sm:w-[250px] dark:border-white dark:border-2"
      menu={{
        items,
        selectable: true,
        onClick: handleClick,
      }}
    >
      <Typography.Link>
        <Space className="text-black font-mono dark:text-white">
          Filter by Region: {selectedFilter}
          <BsChevronDown />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};

export default FiltersDropdown;

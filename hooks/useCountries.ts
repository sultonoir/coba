import countries from "world-countries";

const formattedCountres = countries.map((county) => ({
  value: county.cca2,
  label: county.name.common,
  flag: county.flag,
  latling: county.latlng,
  region: county.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountres;

  const getByValue = (value: string) => {
    return formattedCountres.find((item) => item.value === value);
  };
  return {
    getAll,
    getByValue,
  };
};

export default useCountries;

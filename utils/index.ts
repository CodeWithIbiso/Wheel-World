import { CarProps, FilterProps } from "@types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  // Set the required headers for the API request
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  // Set the required headers for the API request
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  // Parse the response as JSON
  // const result = await response.json();
  const result = [
    {
      city_mpg: 19,
      class: 'minivan',
      combination_mpg: 22,
      cylinders: 6,
      displacement: 3.5,
      drive: 'fwd',
      fuel_type: 'gas',
      highway_mpg: 28,
      make: 'honda',
      model: 'odyssey',
      transmission: 'a',
      year: 2022
    },
    {
      city_mpg: 21,
      class: 'midsize car',
      combination_mpg: 24,
      cylinders: 4,
      displacement: 2.5,
      drive: 'awd',
      fuel_type: 'gas',
      highway_mpg: 29,
      make: 'kia',
      model: 'stinger awd',
      transmission: 'a',
      year: 2022
    },
    {
      city_mpg: 22,
      class: 'midsize car',
      combination_mpg: 25,
      cylinders: 4,
      displacement: 2.5,
      drive: 'rwd',
      fuel_type: 'gas',
      highway_mpg: 32,
      make: 'kia',
      model: 'stinger rwd',
      transmission: 'a',
      year: 2022
    },
    {
      city_mpg: 17,
      class: 'midsize car',
      combination_mpg: 20,
      cylinders: 6,
      displacement: 3.3,
      drive: 'awd',
      fuel_type: 'gas',
      highway_mpg: 24,
      make: 'kia',
      model: 'stinger awd',
      transmission: 'a',
      year: 2022
    },
    {
      city_mpg: 18,
      class: 'midsize car',
      combination_mpg: 20,
      cylinders: 6,
      displacement: 3.3,
      drive: 'rwd',
      fuel_type: 'gas',
      highway_mpg: 25,
      make: 'kia',
      model: 'stinger rwd',
      transmission: 'a',
      year: 2022
    },
    {
      city_mpg: 19,
      class: 'minivan',
      combination_mpg: 22,
      cylinders: 6,
      displacement: 3.5,
      drive: 'fwd',
      fuel_type: 'gas',
      highway_mpg: 26,
      make: 'kia',
      model: 'carnival',
      transmission: 'a',
      year: 2022
    },
    {
      city_mpg: 19,
      class: 'small sport utility vehicle',
      combination_mpg: 22,
      cylinders: 6,
      displacement: 3.5,
      drive: 'fwd',
      fuel_type: 'gas',
      highway_mpg: 26,
      make: 'acura',
      model: 'mdx fwd',
      transmission: 'a',
      year: 2022
    },
    {
      city_mpg: 26,
      class: 'small sport utility vehicle',
      combination_mpg: 29,
      cylinders: 4,
      displacement: 2.5,
      drive: 'fwd',
      fuel_type: 'gas',
      highway_mpg: 33,
      make: 'hyundai',
      model: 'tucson fwd',
      transmission: 'a',
      year: 2022
    },
    {
      city_mpg: 25,
      class: 'small sport utility vehicle',
      combination_mpg: 26,
      cylinders: 4,
      displacement: 1.5,
      drive: 'fwd',
      fuel_type: 'gas',
      highway_mpg: 28,
      make: 'mitsubishi',
      model: 'eclipse cross 2wd',
      transmission: 'a',
      year: 2022
    },
    {
      city_mpg: 26,
      class: 'small sport utility vehicle',
      combination_mpg: 27,
      cylinders: 4,
      displacement: 1.5,
      drive: 'fwd',
      fuel_type: 'gas',
      highway_mpg: 29,
      make: 'mitsubishi',
      model: 'eclipse cross es 2wd',
      transmission: 'a',
      year: 2022
    }
  ]
  
  return result;
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 

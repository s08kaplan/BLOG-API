import { useEffect, useState } from "react"

const useDebounce = (value, delay=250) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
const timer = setTimeout(()=> setDebouncedValue(value),delay)

return () => { clearTimeout(timer)}
  }, [value, delay])
  
  return debouncedValue
}

export default useDebounce

// import { useEffect, useState } from "react";

// const useDebounce = (value, delay = 250) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const timer = setTimeout(() => setDebouncedValue(value), delay);

//     return () => clearTimeout(timer);
//   }, [value, delay]);

//   return [debouncedValue, setDebouncedValue];
// };

// export default useDebounce;
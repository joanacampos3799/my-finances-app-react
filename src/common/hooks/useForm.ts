import { useState } from "react";

const useForm = <T>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  function handleChange<K extends keyof T>(name: K, value: T[K]) {
    setValues((prev) => {
      if (prev[name] === value) return prev;
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function resetForm() {
    setValues(initialValues);
  }

  return {
    values,
    handleChange,
    resetForm,
    setValues,
  };
};

export default useForm;

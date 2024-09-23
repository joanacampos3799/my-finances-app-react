import { useState } from "react";

const useForm = <T>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  function handleChange(name: string, value: number | string | object) {
    setValues({
      ...values,
      [name]: value,
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

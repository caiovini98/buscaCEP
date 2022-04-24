import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const { register, handleSubmit, setValue, setFocus } = useForm();

  const onSubmit = (e: any) => {
    console.log(e);
  };

  const checkCEP = async (e: any) => {
    if (!e.target.value) return;
    const cep = e.target.value.replace(/\D/g, "");
    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("rua", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
        setFocus("numero");
      })
      .catch((err: any) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        CEP: <input type="text" {...register("cep")} onBlur={checkCEP} />
      </label>
      <label>
        Rua: <input type="text" {...register("rua")} />
      </label>
      <label>
        Número: <input type="text" {...register("numero")} />
      </label>
      <label>
        Bairro: <input type="text" {...register("bairro")} />
      </label>
      <label>
        Cidade: <input type="text" {...register("cidade")} />
      </label>
      <label>
        Estado: <input type="text" {...register("estado")} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default App;

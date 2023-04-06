import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputDetail from "../../komponen/InputDetail";

const DetailTransaksi = () => {
  let { id } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const url = `http://localhost:1312/createPembayaran`;

    try {
      let result = await axios.post(url, values);
      console.log(result);
      navigate("/overview");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(register("nama"));

  return (
    <div className="h-screen w-screen py-4 px-6">
      <p className="text-center text-lg font-semibold">Detail Transaksi</p>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid h-full w-full grid-cols-3 gap-10">
            <InputDetail label={"Invoice"} {...register("invoice")} />
            <InputDetail label={"Nama Paket"} {...register("id_paket")} />
            <InputDetail label={"Berat Cucian"} {...register("qty")} />
            <InputDetail label={"Keterangan"} {...register("keterangan")} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailTransaksi;

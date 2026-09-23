import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddWisata() {
    const [formData, setFormData] = useState({
        nama_wisata: "",
        deskripsi: "",
        harga_tiket: "",
        id_kategori: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch("http://localhost:3001/wisata", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("Wisata berhasil ditambahkan!");
                navigate("/wisata");
            } else {
                const data = await res.json();
                alert(data.message || "Gagal menambahkan wisata");
            }
            } catch (err) {
                console.log("Error:", err);
                alert("Terjadi kesalahan saat menambah wisata");
            }
        };

        return (
            <div className="container mt-4">
                <h2 className="mb-3">Tambah Wisata</h2>
                <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                    <div className="mb-3">
                        <label className="form-label">Nama Wisata</label>
                        <input
                          type="text"
                          name="nam_wisata"
                          value={formData.nama_wisata}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Masukkan nama wisata"
                          required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Deskripsi</label>
                        <textarea
                          name="deskripsi"
                          value={formData.deskripsi}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Masukkan deskripsi wisata"
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Harga Tiket</label>
                        <input
                          type="number"
                          name="harga_tiket"
                          value={formData.harga_tiket}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Masukkan harga tiket"
                          required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">ID Kategori</label>
                        <select
                          type="number"
                          name="id_kategori"
                          value={formData.id_kategori}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Masukkan ID kategori"
                        >
                          <option value="">--Pilih Kategori--</option>
                          <option value="1">Alam</option>
                          <option value="2">Budaya</option>
                          <option value="3">Religi Wash</option>
                          <option value="4">Kuliner</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success">Simpan</button>
                </form>
            </div>
        );
    }

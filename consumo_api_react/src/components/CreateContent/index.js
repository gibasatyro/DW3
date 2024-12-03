import axios from "axios";
import styles from "@/components/CreateContent/CreateContent.module.css";
import url from "@/services/url";
import { useState } from "react";
import { useRouter } from "next/router";

const CreateContent = () => {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [genre, setGenre] = useState("");
    const [platform, setPlatform] = useState("");
    const [rating, setRating] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title && year && price && genre && platform && rating) {
        const game = {
            title,
            year: parseInt(year),
            price: parseFloat(price.replace(",", ".")),
            descriptions: {
            genre,
            platform,
            rating,
            },
        };

        // Recupera o token JWT do localStorage
        const token = localStorage.getItem("authToken");

        try {
            // Envia o token no cabeçalho da requisição
            const response = await axios.post(`${url}/game`, game, {
                headers: {
                    // Passando o token no cabeçalho Authorization
                    Authorization: `Bearer ${token}`, 
                },
            });

            if (response.status === 201) {
                // Redireciona após o cadastro
                router.push("/home"); 
            }

        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar jogo. Tente novamente.");
        }

        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    const handleYearChange = (e) => {
        // Apenas números (máximo 4 dígitos)
        const value = e.target.value.replace(/\D/g, "").slice(0, 4); 
        setYear(value);
    };

    const handlePriceChange = (e) => {
        const value = e.target.value
          .replace(/\D/g, "") // Remove caracteres não numéricos
          .replace(/(\d)(\d{2})$/, "$1,$2") // Adiciona vírgula para centavos
          .replace(/(?=(\d{3})+(\D))\B/g, "."); // Adiciona ponto como separador de milhar
        setPrice(value);
    };

    return (
        <div className={styles.createContent}>
            <div className="title">
                <h2>Cadastrar novo jogo</h2>
            </div>
            <form id="createForm" className="formPrimary" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Insira o título do jogo"
                    className="inputPrimary"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    name="genre"
                    id="genre"
                    placeholder="Insira o gênero do jogo"
                    className="inputPrimary"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <input
                    type="text"
                    name="platform"
                    id="platform"
                    placeholder="Insira a plataforma do jogo"
                    className="inputPrimary"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                />
                <input
                    type="text"
                    name="rating"
                    id="rating"
                    placeholder="Insira a classificação do jogo"
                    className="inputPrimary"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <input
                    type="text"
                    name="year"
                    id="year"
                    placeholder="Insira o ano"
                    className="inputPrimary"
                    value={year}
                    onChange={handleYearChange}
                />
                <input
                    type="text"
                    name="price"
                    id="price"
                    placeholder="Insira o preço"
                    className="inputPrimary"
                    value={price}
                    onChange={handlePriceChange}
                />
                <input
                    type="submit"
                    value="Cadastrar"
                    id="createBtn"
                    className="btnPrimary"
                />
            </form>
        </div>
    );
};

export default CreateContent;

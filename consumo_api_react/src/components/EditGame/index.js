import axios from "axios";
import styles from "@/components/EditGame/EditGame.module.css";
import url from "@/services/url";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditGame = ({ id }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState({
        title: "",
        year: "",
        price: "",
        descriptions: [{ genre: "", platform: "", rating: "" }],
    });

    useEffect(() => {
        const fetchGame = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${url}/game/${id}`);
                    const selectedGame = response.data.game;
                    setFormValues({
                        title: selectedGame.title,
                        year: selectedGame.year,
                        price: selectedGame.price,
                        descriptions: selectedGame.descriptions || [
                        { genre: "", platform: "", rating: "" },
                        ],
                    });
                } catch (error) {
                    console.error("Erro ao carregar jogo:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchGame();
    }, [id]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;

        // Atualiza os valores do campo `descriptions`
        if (name.startsWith("descriptions")) {
            const [_, fieldName] = name.split(".");
            setFormValues((prevValues) => {
                const updatedDescriptions = [...prevValues.descriptions];
                updatedDescriptions[index][fieldName] = value;
                return { ...prevValues, descriptions: updatedDescriptions };
            });

        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    const handleAddDescription = () => {
        setFormValues((prevValues) => ({
        ...prevValues,
        descriptions: [
            ...prevValues.descriptions,
            { genre: "", platform: "", rating: "" },
        ],
        }));
    };

    const handleRemoveDescription = (index) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            descriptions: prevValues.descriptions.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`${url}/game/${id}`, formValues);
            if (response.status === 200) {
                alert("Jogo atualizado com sucesso!");
                router.push("/home");
            }

        } catch (error) {
            console.error("Erro ao atualizar o jogo:", error);
            alert("Erro ao salvar alterações. Tente novamente.");
        }
    };

    if (loading) {
        return <div>Carregando dados do jogo...</div>;
    }

    return (
        <div className={styles.editGame}>
            <h2>Editar Jogo</h2>
            <form id="editForm" className="formPrimary" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Título do jogo"
                    className="inputPrimary"
                    value={formValues.title}
                    onChange={(e) => handleChange(e)}
                    required
                />
                <input
                    type="number"
                    name="year"
                    placeholder="Ano de lançamento"
                    className="inputPrimary"
                    value={formValues.year}
                    onChange={(e) => handleChange(e)}
                    required
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Preço"
                    className="inputPrimary"
                    value={formValues.price}
                    onChange={(e) => handleChange(e)}
                    required
                />

                <h3>Descrições</h3>
                {formValues.descriptions.map((desc, index) => (
                <div key={index} className={styles.editGame}>
                    <input
                        type="text"
                        name={`descriptions.genre`}
                        placeholder="Gênero"
                        className="inputPrimary"
                        value={desc.genre}
                        onChange={(e) => handleChange(e, index)}
                        required
                    />
                    <input
                        type="text"
                        name={`descriptions.platform`}
                        placeholder="Plataforma"
                        className="inputPrimary"
                        value={desc.platform}
                        onChange={(e) => handleChange(e, index)}
                        required
                    />
                    <input
                        type="text"
                        name={`descriptions.rating`}
                        placeholder="Avaliação"
                        className="inputPrimary"
                        value={desc.rating}
                        onChange={(e) => handleChange(e, index)}
                        required
                    />
                    <button
                        type="button"
                        className="btnPrimary"
                        onClick={() => handleRemoveDescription(index)}
                        >
                        Remover
                    </button>
                </div>
                ))}

                <button
                    type="button"
                    className="btnPrimary"
                    onClick={handleAddDescription}
                    >
                    Adicionar Descrição
                </button>

                <input type="submit" value="Salvar Alterações" className="btnPrimary" />
            </form>
        </div>
    );
};

export default EditGame;

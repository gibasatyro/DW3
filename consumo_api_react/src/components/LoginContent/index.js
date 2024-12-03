import axios from "axios";
import styles from "@/components/LoginContent/LoginContent.module.css";
import url from "@/services/url";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginContent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Envia as credenciais para a API de login
            const response = await axios.post(`${url}/auth`, {
                email,
                password,
            });

            if (response.status === 200) {
                // Armazena o token no localStorage
                localStorage.setItem("authToken", response.data.token);
                // Redireciona para a página principal após login bem-sucedido
                router.push("/home");
            }

        } catch (err) {
            console.error(err);
            setError("Credenciais inválidas ou erro ao tentar fazer login.");
        }
    };

    return (
        <>
            <div className={styles.loginContent}>

                {/* IMAGEM DO LOGO */}
                <div className={styles.logo}>
                    <img
                        src="/images/thegames_logo.png"
                        alt="The Games"
                        className={styles.logoImg}
                    />
                </div>

                {/* LOGIN CARD */}
                <div className={styles.loginCard}>
                    <div className={styles.loginCardHeader}>
                        <h3>Faça seu login:</h3>
                    </div>
                    
                    {/* FORMULÁRIO */}
                    <div className={styles.loginCardBody}>
                        <form className="formPrimary" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Digite seu e-mail"
                                className={`${styles.input} ${"inputPrimary"}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Digite sua senha"
                                className={`${styles.input} ${"inputPrimary"}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="submit"
                                value="Entrar"
                                className={`${styles.input} ${"btnPrimary"}`}
                            />
                        </form>
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginContent;

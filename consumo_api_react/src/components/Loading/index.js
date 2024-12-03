import styles from "@/components/Loading/Loading.module.css";

const Loading = () => {
    return (
        <>
        <link rel="stylesheet" href="Loading.css" />

        <div className={styles.loading}>
            <img src="images/loading.gif" alt="Carregando" />
            <p>Carregando...</p>
        </div>
        </>
    );
};

export default Loading;

import styles from "@/components/Footer/Footer.module.css"

const Footer = () => {
    return (
        <>
            <div className={styles.footerContent}>
                {/* Lado Esquerdo */}
                <div className={styles.footerLeft}>
                    <ul className={styles.footerItems}>
                        <li>Português (Brasil)</li>
                        <li>English (US)</li>
                        <li>Español</li>
                        <li>Français (France)</li>
                        <li>Italiano</li>
                    </ul>
                </div>

                {/* Lado Direito */}
                <div className={styles.footerRight}>
                    <ul>
                        <li>The games &copy; 2024</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Footer;
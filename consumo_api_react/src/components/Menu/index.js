import styles from "@/components/Menu/Menu.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Menu = () => {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        router.push("/");
    };

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <Link href="/">
                        <img src="images/thegames_symbol.png" alt="The Games" />
                    </Link>
                </div>
                <div className={styles.menu}>
                    <ul className={styles.menuItems} id="menuItems">
                        <li>
                            <Link href="/home">Home</Link>
                        </li>
                        <li>
                            <Link href="/create">Cadastrar jogos</Link>
                        </li>
                        <li>
                            <a href="/"  onClick={handleLogout}>Logout</a>            
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Menu;

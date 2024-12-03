import { useRouter } from "next/router";
import { useEffect } from "react";
import EditGame from "@/components/EditGame";

export default function Edit() {
    const router = useRouter();
    // Captura o parâmetro 'id' da URL
    const { id } = router.query; 

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            // Se não houver token, redireciona para a página de login
            router.push("/");
        }
    }, [router]);

    if (!id) {
        // Renderiza algo enquanto o ID ainda não está disponível
        return <div>Carregando...</div>; 
    }

    return (
        <main>
            <EditGame id={id} />
        </main>
    );
}

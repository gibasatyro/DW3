import Head from "next/head";
import Container from "@/components/Container";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import CreateContent from "@/components/CreateContent";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Homepage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            // Se não houver token, redireciona para a página de login
            router.push("/");
        }
    }, [router]);

    return (
        <>
            <Head>
                <title>The Games &copy; 2024</title>
                <meta name="description" content="Consumo API de Games" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Menu />
                <Container>
                    <CreateContent />
                </Container>
            </main>

            <Footer />
        </>
    );
}

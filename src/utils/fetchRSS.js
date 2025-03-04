export async function fetchRSS(url) {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        return new window.DOMParser().parseFromString(data.contents, "text/xml");  

    } catch (error) {
        console.error("Erreur lors du chargement du flux RSS :", error);
        throw new Error("Impossible de charger le flux RSS. Veuillez vérifier l'URL ou réessayer plus tard.");
    }
}



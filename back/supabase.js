require("dotenv").config();

// config supabase
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://aeyokqlrkmsdphrayffh.supabase.co";
const supabaseKey = process.env.API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// requests functions
const fetchMeublesHomePage = async () => {
    try {
        let { data: meubles, error } = await supabase //api de supabase pour fetch les données d'une table
            .from("meubles")
            .select("id, nom, image, type, prix, description")
            .eq("statut", "Disponible");
        if (error) {
            throw error;
        }
        return meubles;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des meubles:",
            error.message
        );
        throw error;
    }
};

const fetchMeubleAdmin = async () => {
    try {
        let { data: meubles, error } = await supabase
            .from("meubles")
            .select("id, nom, image, statut, prix");
        if (error) {
            throw error;
        }
        return meubles;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des meubles:",
            error.message
        );
        throw error;
    }
};

const signInUser = async (email, password) => {
    try {
        // Récupérer les informations de l'utilisateur à partir de la base de données
        const { data: users, error } = await supabase
            .from("admin")
            .select("*")
            .eq("email", email)
            .eq("password", password)
            .limit(1);

        // Vérifier s'il y a une erreur
        if (error) {
            throw error;
        }

        // Vérifier si l'utilisateur existe
        if (users.length === 0) {
            console.log("Utilisateur non trouvé");
            return { error: "Utilisateur non trouvé" };
        }

        // Si l'utilisateur est trouvé, renvoyer l'utilisateur connecté
        //console.log("Utilisateur connecté:", users[0]);
        return { user: users[0] };
    } catch (error) {
        console.error("Erreur lors de la connexion:", error.message);
        return { error: "Erreur interne du serveur" };
    }
};

async function changeState(id) {
    try {
        const { error } = await supabase
            .from("countries")
            .update({ name: "Australia" })
            .eq("id", 1);
    } catch (error) {
        console.error(
            "Erreur lors de la mise à jour du statut:",
            error.message
        );
        return { error: "Erreur interne du serveur" };
    }
}

module.exports = {
    fetchMeublesHomePage,
    fetchMeubleAdmin,
    signInUser,
    changeState,
};

// const apiKey = "https://ebcuqyxwtszamhldxsep.supabase.co"; // Remplacez par votre clé API Supabase
// const apiUrl =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViY3VxeXh3dHN6YW1obGR4c2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2NjUyMDIsImV4cCI6MjAwNzI0MTIwMn0.jjGBK0yAgpJ-VCFbedUYr5-ko64IhuCMOBEIa6NNvDY"; // Remplacez par l'URL de votre table

console.log(keys);

const apiKey = keys.apiKey;
const apiUrl = keys.apiUrl;
const database = supabase.createClient(apiKey, apiUrl);

async function fetchTable() {
  try {
    let { data: nomtable, error } = await database
      .from("snake-scores")
      .select("pseudo, score"); // Remplacez par les colonnes que vous souhaitez récupérer

    if (error) {
      console.error("Erreur lors de la récupération des données:", error);
      return;
    }

    // Utilisez les données récupérées
    console.log("Données récupérées:", nomtable);
    createList(nomtable);
    // Vous pouvez maintenant traiter les données et les afficher dans votre application
  } catch (error) {
    console.error("Erreur:", error);
  }
}

fetchTable();

async function sendData(pseudo, score) {
  try {
    const { error } = await database
      .from("snake-scores")
      .insert({ pseudo: pseudo, score: score })
      // même chose pour plusieurs données
      //   .insert([{ name: "Riqaq3", email: "riqaq3@gmail.com" }, { name: "Riqaq4", email: "riqaq4@gmail.com"}])
      .select();

    if (error) {
      console.error("Erreur lors de la récupération des données:", error);
      alert("Ce pseudo existe déjà");
      return;
    }
    dataSorted.push({ pseudo: inputPseudo.value, score: score });
    createList(dataSorted);
    formulaire.style.display = "none";
    listScores.style.display = "block";
    titleScores.style.display = "flex";
    // else {
    //     formulaire.style.display = "none";
    // }

    console.log("Données récupérées:", "name*** créé");
  } catch (error) {
    console.error("Erreur:", error);
  }
}
// sendData("test", 800000);

// Appelez la fonction pour récupérer et afficher les données

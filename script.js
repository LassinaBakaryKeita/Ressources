/**
 * Gestionnaire principal de la page Ressources
 * - Recherche de modules
 * - Sélection des options de formulaire
 * - Soumission de documents
 */



/**
 * Liste des modules disponibles avec leurs chemins 
 * @type {Array<{nom: string, cheminZip: string}>}
 */
const modules = [
    {
        nom: "Java",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1tKoryYBn8a8c6Yt6TQIrsvj56YbQyf22"
    },
    {
        nom: "Architecture des proccesseurs",
        cheminZip: "https://drive.google.com/drive/u/1/folders/15vGw4ooFqZtUsvqR2fB3729Dw5ydUQqQ"
    },
    {
        nom: "Compétences Numériques & Informatiques",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1KwFzlR2EIuFxCj6f74R1_VMQpsPcYDnJ"
    },
    {
        nom: "Examens S1",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1CgBCfCf4lsgDx3DYU30G5uiBQbkuSqz_"
    },
    {
        nom: "Linux",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1wPebyBb0pN6bbMWZGRkWWwaG4nnIXhP8"
    },
    {
        nom: "Reseaux",
        cheminZip: "https://drive.google.com/drive/u/1/folders/17sKam0ha95DhGMtRB6-ecfk2QLw7Fns7"
    },
    {
        nom: "Technologies Web Frontend et Developpement Mobile",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1zv6jZGK_rHqHmxGXE3rjIk-BBBU0aZe5"
    },
    {
        nom: "Statistiques Descriptives & Probabilités Avancées",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1qhEv9pXblCF7zaICz2uiI10Rze1D0qFC"
    },
    {
        nom: "TEC S1",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1_2p7DMZqzrEbwlyNApUuNC6A_kyYlvYF"
    },
    {
        nom: "anglais S2",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1b4WqArz13sDSDmLdco6IXN7MCOHdwe1U"
    },
    {
        nom: "Arabe",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1ko6M_20xtRahKTg5jRgBwLe8CrH-p4ID"
    },
    {
        nom: "Python et Frameworks IA",
        cheminZip: "https://drive.google.com/drive/u/1/folders/19BjxDlf6gCZvs81QiSpRk9a08sBmF6Aw"
    },
    {
        nom: "Système d'information et Bases de données",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1N5LtmgN12RWjfzGZYlImAYqINiP6iIJT"
    },
    {
        nom: "TEC S2",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1adOCz5-9Q0tWc3lyc-SU0fDZdmZPDBEf"
    },
    {
        nom: "Technologies Web Backend",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1r0HUlYXcCa5GstRFB6bhjdPnWEv693sV"
    },
    {
        nom: "Traitement de signal",
        cheminZip: "https://drive.google.com/drive/u/1/folders/1DEmbxYI3B4Y83BZYbZe50NSUPX62UgWE"
    },
    {
        nom: "Statistiques Inferentielles",
        cheminZip: "https://drive.google.com/drive/u/1/folders/12mVHS16msUF4m0o1udI9kdpHsSOZHZGJ"
    }
];



// Initialisation après chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la recherche de modules
    const searchInput = document.getElementById('search');
    const resultsContainer = document.getElementById('module-results');
    
    // Gestion de l'événement de recherche
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        resultsContainer.innerHTML = '';
        
        if (searchTerm.length < 2) return;

        // Filtrage des modules
        const filteredModules = modules.filter(module => 
            module.nom.toLowerCase().includes(searchTerm)
        );

        // Affichage des résultats
        if (filteredModules.length > 0) {
            filteredModules.forEach(module => {
                const moduleElement = document.createElement('div');
                moduleElement.className = 'module-card';
                moduleElement.innerHTML = `
                    <h3>${module.nom}</h3>
                    <a href="${module.cheminZip}" download class="download-btn">
                        Télécharger le module complet (.ZIP)
                    </a>
                `;
                resultsContainer.appendChild(moduleElement);
            });
        } else {
            resultsContainer.innerHTML = '<p class="no-results">Aucun module trouvé</p>';
        }
    });
});



// Gestion de la sélection des options dans le formulaire
document.querySelectorAll('[data-type="format"]').forEach(button => {
    button.addEventListener('click', function() {
        // Marquer le bouton comme sélectionné
        document.querySelectorAll('[data-type="format"]').forEach(btn => 
            btn.classList.remove('selected'));
        this.classList.add('selected');
        
        // Afficher la section upload
        document.getElementById('upload-section').style.display = 'block';
    });
});

// Réinitialisation si l'utilisateur change d'avis
document.querySelectorAll('[data-type="semestre"], [data-type="doc-type"]').forEach(button => {
    button.addEventListener('click', function() {
        // Cacher la section upload si on change le semestre ou le type
        document.getElementById('upload-section').style.display = 'none';
        document.querySelectorAll('[data-type="format"]').forEach(btn => 
            btn.classList.remove('selected'));
    });
});


// Fonction générique pour gérer la sélection par catégorie
function setupSelection(category) {
    const buttons = document.querySelectorAll(`[data-type="${category}"]`);
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Enlever la sélection sur tous les boutons de cette catégorie
            buttons.forEach(btn => btn.classList.remove('selected'));
            
            // Activer uniquement celui qu'on vient de cliquer
            this.classList.add('selected');

            // Cas spécial : afficher la zone upload uniquement pour "format"
            if (category === "format") {
                document.getElementById('upload-section').style.display = 'block';
            }
        });
    });
}

// Initialisation des 3 catégories
setupSelection("semestre");
setupSelection("doc-type");
setupSelection("format");









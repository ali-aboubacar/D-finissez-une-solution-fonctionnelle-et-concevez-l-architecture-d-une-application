-- TABLE Utilisateur
CREATE TABLE Utilisateur (
    id_utilisateur       BIGINT PRIMARY KEY AUTO_INCREMENT,
    nom                  VARCHAR(100),
    prenom               VARCHAR(100),
    email                VARCHAR(150) UNIQUE NOT NULL,
    password             VARCHAR(255) NOT NULL,
    date_naissance       DATE,
    adresse_postale      TEXT,
    pays                 VARCHAR(100),
    telephone            VARCHAR(20),
    langue_affichage     VARCHAR(50),
    devise               VARCHAR(10),
    fuseau_horaire       VARCHAR(50),
    compte_supprime      BOOLEAN DEFAULT FALSE
);

-- TABLE Document
CREATE TABLE Document (
    id_document          INT PRIMARY KEY AUTO_INCREMENT,
    type_document        VARCHAR(100),
    fichier              TEXT,
    statut_validation    VARCHAR(50),
    date_soumission      DATETIME,
    id_utilisateur       BIGINT NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur)
);

-- TABLE Agence
CREATE TABLE Agence (
    id_agence            INT PRIMARY KEY AUTO_INCREMENT,
    nom                  VARCHAR(150),
    adresse              TEXT,
    ville                VARCHAR(100),
    pays                 VARCHAR(100),
    longitude            DECIMAL(9,6),
    latitude             DECIMAL(9,6),
    services_disponibles TEXT
);

-- TABLE CategorieVehicule
CREATE TABLE Categorie (
    id_categorie INT PRIMARY KEY AUTO_INCREMENT,
    code_acriss VARCHAR(10) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    description TEXT
);

-- TABLE Vehicule
CREATE TABLE Vehicule (
    id_vehicule          INT PRIMARY KEY AUTO_INCREMENT,
    marque               VARCHAR(100),
    modele               VARCHAR(100),
    annee                INT,
    categorie_acriss     VARCHAR(4),
    transmission         VARCHAR(50),
    carburant            VARCHAR(50),
    capacite             INT,
    equipements          TEXT,
    id_agence            INT NOT NULL,
    id_categorie         INT NOT NULL,
    FOREIGN KEY (id_agence) REFERENCES Agence(id_agence),
    FOREIGN KEY (id_categorie) REFERENCES Categorie(id_categorie)
);

-- TABLE Offre
CREATE TABLE Offre (
    id_offre BIGINT PRIMARY KEY AUTO_INCREMENT,
    date_debut DATETIME,
    date_fin DATETIME,
    tarif_base DECIMAL(10,2),
    permis_requis BOOLEAN,
    condition_specifiques TEXT,
    id_vehicule          INT NOT NULL,
    id_agence_depart     INT NOT NULL,
    id_agence_retour     INT NOT NULL,
    FOREIGN KEY (id_vehicule) REFERENCES Vehicule(id_vehicule),
    FOREIGN KEY (id_agence_depart) REFERENCES Agence(id_agence),
    FOREIGN KEY (id_agence_retour) REFERENCES Agence(id_agence)
);

-- TABLE Reservation
CREATE TABLE Reservation (
    id_reservation       INT PRIMARY KEY AUTO_INCREMENT,
    date_reservation     DATETIME,
    date_debut           DATETIME,
    date_fin             DATETIME,
    montant_total        DECIMAL(10, 2),
    methode_paiement     VARCHAR(50),
    contrat_pdf          TEXT,
    date_annulation      DATETIME,
    id_utilisateur       BIGINT NOT NULL,
    id_offre             BIGINT NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur),
    FOREIGN KEY (id_offre) REFERENCES Offre(id_offre)
);

-- TABLE Roles
CREATE TABLE roles (
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    name ENUM('ROLE_USER', 'ROLE_ADMIN','ROLE_MODERATOR') NOT NULL
);

-- TABLE Utilisateur
CREATE TABLE users_roles (
    user_id BIGINT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES Utilisateur(id_utilisateur),
    FOREIGN KEY (role_id) REFERENCES roles(id_role)
);

-- TABLE chat
CREATE TABLE chat (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    recipient_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Utilisateur(id_utilisateur),
    FOREIGN KEY (recipient_id) REFERENCES Utilisateur(id_utilisateur)
);

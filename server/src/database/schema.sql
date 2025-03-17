-- Suppression et création de la base avec un jeu de caractères adapté
DROP DATABASE IF EXISTS my_database;
CREATE DATABASE my_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE my_database;

-- Table des développeurs

DROP TABLE IF EXISTS Developers;
CREATE TABLE Developers (
    dev_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;


-- Table des applications

DROP TABLE IF EXISTS Applications;
CREATE TABLE Applications (
    app_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    dev_id INT DEFAULT NULL,
    FOREIGN KEY (dev_id) REFERENCES Developers(dev_id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Table des versions d'applications

DROP TABLE IF EXISTS Application_Versions;
CREATE TABLE Application_Versions (
    app_version_id INT AUTO_INCREMENT PRIMARY KEY,
    app_id INT NOT NULL,
    version_number VARCHAR(50) NOT NULL,
    release_date DATE,
    notes TEXT,
    FOREIGN KEY (app_id) REFERENCES Applications(app_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Table des systèmes d'exploitation

DROP TABLE IF EXISTS Operating_Systems;
CREATE TABLE Operating_Systems (
    os_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
) ENGINE=InnoDB;


-- Table des versions d'OS

DROP TABLE IF EXISTS OS_Versions;
CREATE TABLE OS_Versions (
    os_version_id INT AUTO_INCREMENT PRIMARY KEY,
    os_id INT NOT NULL,
    version_number VARCHAR(50) NOT NULL,
    release_date DATE,
    notes TEXT,
    FOREIGN KEY (os_id) REFERENCES Operating_Systems(os_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Table des emplacements de traces (UID)

DROP TABLE IF EXISTS Trace_Locations;
CREATE TABLE Trace_Locations (
    trace_id INT AUTO_INCREMENT PRIMARY KEY,
    app_version_id INT DEFAULT NULL,
    os_version_id INT NOT NULL,
    trace_path VARCHAR(255) NOT NULL,
    trace_description TEXT,
    uid VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (app_version_id) REFERENCES Application_Versions(app_version_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (os_version_id) REFERENCES OS_Versions(os_version_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Table des scripts de parsing associés aux traces

DROP TABLE IF EXISTS Trace_Parsers;
CREATE TABLE Trace_Parsers (
    parser_id INT AUTO_INCREMENT PRIMARY KEY,
    trace_id INT NOT NULL,
    parser_script_link VARCHAR(255) NOT NULL,
    notes TEXT,
    FOREIGN KEY (trace_id) REFERENCES Trace_Locations(trace_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Table des utilisateurs

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    auth_provider VARCHAR(50) NOT NULL,  -- Ex : 'GitHub', 'SwitchEdu-ID', etc.
    auth_provider_id VARCHAR(255) NOT NULL,  -- Identifiant unique fourni par le SSO
    is_admin BOOLEAN DEFAULT FALSE,
    user_role VARCHAR(50) DEFAULT 'reader'  -- 'reader', 'contributor', 'admin'
) ENGINE=InnoDB;


-- Table des notations entre utilisateurs

DROP TABLE IF EXISTS User_Ratings;
CREATE TABLE User_Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,            -- Utilisateur évalué
    rated_by_user_id INT NOT NULL,    -- Utilisateur qui évalue
    rating FLOAT NOT NULL,
    CHECK (rating BETWEEN 0 AND 5),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (rated_by_user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Table des notations des UID (traces)

DROP TABLE IF EXISTS UID_Ratings;
CREATE TABLE UID_Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    uid VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    rating FLOAT NOT NULL,
    comment TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    CHECK (rating BETWEEN 0 AND 5),
    FOREIGN KEY (uid) REFERENCES Trace_Locations(uid)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Table des notations des scripts de parsing

DROP TABLE IF EXISTS Parser_Ratings;
CREATE TABLE Parser_Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    parser_id INT NOT NULL,
    user_id INT NOT NULL,
    rating FLOAT NOT NULL,
    comment TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    CHECK (rating BETWEEN 0 AND 5),
    FOREIGN KEY (parser_id) REFERENCES Trace_Parsers(parser_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Table des contributions des utilisateurs

DROP TABLE IF EXISTS User_Contributions;
CREATE TABLE User_Contributions (
    contribution_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    trace_id INT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    rating FLOAT,
    verification_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (trace_id) REFERENCES Trace_Locations(trace_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Table pour enregistrer les activités des utilisateurs (logs)

DROP TABLE IF EXISTS User_Metadata;
CREATE TABLE User_Metadata (
    metadata_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_type VARCHAR(50) NOT NULL,  -- Ex : 'login', 'contribution', 'rating', etc.
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Table des tags (mots-clés)

DROP TABLE IF EXISTS Tags;
CREATE TABLE Tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;


-- Table de liaison entre traces et tags

DROP TABLE IF EXISTS Trace_Tags;
CREATE TABLE Trace_Tags (
    trace_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (trace_id, tag_id),
    FOREIGN KEY (trace_id) REFERENCES Trace_Locations(trace_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Table de liaison entre scripts et tags

DROP TABLE IF EXISTS Script_Tags;
CREATE TABLE Script_Tags (
    parser_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (parser_id, tag_id),
    FOREIGN KEY (parser_id) REFERENCES Trace_Parsers(parser_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Table pour enregistrer les logs des appels API

DROP TABLE IF EXISTS API_Logs;
CREATE TABLE API_Logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL,
    endpoint VARCHAR(255) NOT NULL,
    request_method VARCHAR(10) NOT NULL,  -- Ex : 'GET', 'POST', etc.
    status_code INT NOT NULL,
    response_time_ms INT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE SET NULL
) ENGINE=InnoDB;
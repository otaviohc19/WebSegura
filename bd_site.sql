-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BD_Site` DEFAULT CHARACTER SET utf8 ;
USE `BD_Site` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_Site`.`Usuarios` (
  `idUsuarios` INT NOT NULL,
  `Nome_usuarios` VARCHAR(45) NOT NULL,
  `Email_usuarios` VARCHAR(45) NOT NULL,
  `Senha_usuarios` VARCHAR(45) NOT NULL,
  `Acesso_usuarios` ENUM('user', 'admin', 'moderador') NOT NULL,
  PRIMARY KEY (`idUsuarios`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_Site`.`Categorias` (
  `idCategorias` INT NOT NULL,
  `Nome_da_categoria` VARCHAR(45) NOT NULL COMMENT 'por exemplo: phishing, esquemas de pirâmide, falsificação',
  PRIMARY KEY (`idCategorias`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Contatos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_Site`.`Contatos` (
  `idContatos` INT NOT NULL,
  `Nome_contatos` VARCHAR(45) NOT NULL,
  `Email_contatos` VARCHAR(45) NOT NULL,
  `Telefone_contatos` VARCHAR(45) NOT NULL,
  `Outras_info_contatos` VARCHAR(45) NULL,
  PRIMARY KEY (`idContatos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Golpes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_Site`.`Golpes` (
  `idGolpes` INT NOT NULL,
  `Titulo_golpes` VARCHAR(45) NOT NULL,
  `Descricao_golpes` TEXT NOT NULL,
  `Metodo_golpes` VARCHAR(45) NOT NULL COMMENT 'por exemplo: phishing por e-mail, fraude telefônica',
  `URL_golpes` VARCHAR(150) NULL COMMENT 'URL do Site de Golpe (se aplicável)',
  `Data_golpes` DATE NOT NULL,
  `Status_golpes` ENUM('em análise', 'resolvido', 'em andamento') NOT NULL,
  `Usuarios_idUsuarios` INT NOT NULL,
  `Categorias_idCategorias` INT NOT NULL,
  `Contatos_idContatos` INT NOT NULL,
  PRIMARY KEY (`idGolpes`),
  INDEX `fk_Golpes_Usuarios_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  INDEX `fk_Golpes_Categorias1_idx` (`Categorias_idCategorias` ASC) VISIBLE,
  INDEX `fk_Golpes_Contatos1_idx` (`Contatos_idContatos` ASC) VISIBLE,
  CONSTRAINT `fk_Golpes_Usuarios`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `BD_Site`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Golpes_Categorias1`
    FOREIGN KEY (`Categorias_idCategorias`)
    REFERENCES `BD_Site`.`Categorias` (`idCategorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Golpes_Contatos1`
    FOREIGN KEY (`Contatos_idContatos`)
    REFERENCES `BD_Site`.`Contatos` (`idContatos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Evidencias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_Site`.`Evidencias` (
  `idEvidencias` INT NOT NULL,
  `Descrição_da_evidencia` TEXT NOT NULL,
  `Data_e_Hora` TIMESTAMP NOT NULL COMMENT 'Data e Hora da Submissão da Evidência',
  `status_de_verificacao` ENUM('verificado', 'não verificado') NOT NULL,
  `Golpes_idGolpes` INT NOT NULL,
  PRIMARY KEY (`idEvidencias`),
  INDEX `fk_Evidencias_Golpes1_idx` (`Golpes_idGolpes` ASC) VISIBLE,
  CONSTRAINT `fk_Evidencias_Golpes1`
    FOREIGN KEY (`Golpes_idGolpes`)
    REFERENCES `BD_Site`.`Golpes` (`idGolpes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`Alvos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_Site`.`Alvos` (
  `idAlvos` INT NOT NULL,
  `Nome_alvos` VARCHAR(45) NOT NULL,
  `Email_alvos` VARCHAR(45) NOT NULL,
  `Telefone_alvos` VARCHAR(45) NOT NULL,
  `Outras_info_alvos` VARCHAR(45) NULL,
  `Golpes_idGolpes` INT NOT NULL,
  PRIMARY KEY (`idAlvos`),
  INDEX `fk_Alvos_Golpes1_idx` (`Golpes_idGolpes` ASC) VISIBLE,
  CONSTRAINT `fk_Alvos_Golpes1`
    FOREIGN KEY (`Golpes_idGolpes`)
    REFERENCES `BD_Site`.`Golpes` (`idGolpes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_Site`.`Comentarios` (
  `idComentarios` INT NOT NULL,
  `Texto_comentario` VARCHAR(255) NOT NULL,
  `DataHora_comentario` DATETIME NOT NULL,
  `Golpes_idGolpes` INT NOT NULL,
  `Usuarios_idUsuarios` INT NOT NULL,
  PRIMARY KEY (`idComentarios`),
  INDEX `fk_Comentarios_Golpes1_idx` (`Golpes_idGolpes` ASC) VISIBLE,
  INDEX `fk_Comentarios_Usuarios1_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  CONSTRAINT `fk_Comentarios_Golpes1`
    FOREIGN KEY (`Golpes_idGolpes`)
    REFERENCES `BD_Site`.`Golpes` (`idGolpes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentarios_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `BD_Site`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Acoes_Tomadas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_Site`.`Acoes_Tomadas` (
  `idAcoes_Tomadas` INT NOT NULL,
  `Descricao_acaotomada` VARCHAR(255) NOT NULL COMMENT 'Descrição da Ação Tomada (por exemplo, alerta aos usuários, encerramento do site de golpe)',
  `DataHora_acaotomada` DATETIME NOT NULL,
  `Golpes_idGolpes` INT NOT NULL,
  `Usuarios_idUsuarios` INT NOT NULL,
  PRIMARY KEY (`idAcoes_Tomadas`),
  INDEX `fk_Acoes_Tomadas_Golpes1_idx` (`Golpes_idGolpes` ASC) VISIBLE,
  INDEX `fk_Acoes_Tomadas_Usuarios1_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  CONSTRAINT `fk_Acoes_Tomadas_Golpes1`
    FOREIGN KEY (`Golpes_idGolpes`)
    REFERENCES `BD_Site`.`Golpes` (`idGolpes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Acoes_Tomadas_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `BD_Site`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Localizacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_Site`.`Localizacao` (
  `idLocalizacao` INT NOT NULL,
  `Pais_localizacao` VARCHAR(45) NOT NULL,
  `Estado_localizacao` VARCHAR(45) NOT NULL,
  `Cidade_localizacao` VARCHAR(45) NOT NULL,
  `CEP_localizacao` VARCHAR(45) NOT NULL,
  `Golpes_idGolpes` INT NOT NULL,
  PRIMARY KEY (`idLocalizacao`),
  INDEX `fk_Localizacao_Golpes1_idx` (`Golpes_idGolpes` ASC) VISIBLE,
  CONSTRAINT `fk_Localizacao_Golpes1`
    FOREIGN KEY (`Golpes_idGolpes`)
    REFERENCES `BD_Site`.`Golpes` (`idGolpes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_Site`.`Feedback` (
  `idFeedback` INT NOT NULL,
  `Classificacao_feedback` VARCHAR(45) NOT NULL,
  `Comentario_feedback` VARCHAR(255) NOT NULL,
  `DataHora_feedback` DATETIME NOT NULL,
  `Golpes_idGolpes` INT NOT NULL,
  `Usuarios_idUsuarios` INT NOT NULL,
  PRIMARY KEY (`idFeedback`),
  INDEX `fk_Feedback_Golpes1_idx` (`Golpes_idGolpes` ASC) VISIBLE,
  INDEX `fk_Feedback_Usuarios1_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  CONSTRAINT `fk_Feedback_Golpes1`
    FOREIGN KEY (`Golpes_idGolpes`)
    REFERENCES `BD_Site`.`Golpes` (`idGolpes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Feedback_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `BD_Site`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Inserir dados na tabela Usuarios
INSERT INTO `BD_Site`.`Usuarios` (`idUsuarios`, `Nome_usuarios`, `Email_usuarios`, `Senha_usuarios`, `Acesso_usuarios`) VALUES
(1, 'Usuario1', 'usuario1@example.com', 'senha123', 'user'),
(2, 'Usuario2', 'usuario2@example.com', 'senha456', 'admin'),
(3, 'Usuario3', 'usuario3@example.com', 'senha789', 'moderador');

-- Inserir dados na tabela Categorias
INSERT INTO `BD_Site`.`Categorias` (`idCategorias`, `Nome_da_categoria`) VALUES
(1, 'Phishing'),
(2, 'Esquemas de pirâmide'),
(3, 'Falsificação');

-- Inserir dados na tabela Contatos
INSERT INTO `BD_Site`.`Contatos` (`idContatos`, `Nome_contatos`, `Email_contatos`, `Telefone_contatos`, `Outras_info_contatos`) VALUES
(1, 'Contato1', 'contato1@example.com', '123456789', 'Informações adicionais 1'),
(2, 'Contato2', 'contato2@example.com', '987654321', 'Informações adicionais 2');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

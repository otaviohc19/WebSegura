-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22/01/2025 às 21:24
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bd_site`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descricao` text DEFAULT NULL,
  `criado_em` datetime DEFAULT current_timestamp(),
  `atualizado_em` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `categorias`
--

INSERT INTO `categorias` (`id`, `nome`, `descricao`, `criado_em`, `atualizado_em`) VALUES
(1, 'Golpe de Phishing', 'Golpes que envolvem o roubo de dados pessoais através de e-mails falsos', '2025-01-12 16:44:50', '2025-01-12 16:44:50'),
(2, 'Golpe de Investimento', 'Golpes que prometem retornos financeiros altos e rápidos', '2025-01-12 16:44:50', '2025-01-12 16:44:50'),
(3, 'Golpe de Suporte Técnico', 'Golpes que fingem ser suporte técnico de empresas conhecidas', '2025-01-12 16:44:50', '2025-01-12 16:44:50');

-- --------------------------------------------------------

--
-- Estrutura para tabela `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `golpe_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `texto` text NOT NULL,
  `data` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `comentarios`
--

INSERT INTO `comentarios` (`id`, `golpe_id`, `usuario_id`, `texto`, `data`) VALUES
(1, 1, 2, 'Esse golpe é muito comum, devemos ficar atentos aos detalhes do e-mail', '2025-01-12 16:44:50'),
(2, 2, 1, 'Cuidado com investimentos em criptomoedas, é sempre bom pesquisar antes de investir', '2025-01-12 16:44:50'),
(3, 3, 2, 'Já recebi esse tipo de ligação, é importante não fornecer dados pessoais', '2025-01-12 16:44:50'),
(4, 1, 1, 'teste', '2025-01-22 16:19:37'),
(5, 1, 1, 'as', '2025-01-22 16:19:42'),
(6, 1, 1, 'abc', '2025-01-22 16:21:37'),
(7, 2, 1, 'sim', '2025-01-22 16:25:29'),
(8, 2, 1, 'asb', '2025-01-22 16:25:36');

-- --------------------------------------------------------

--
-- Estrutura para tabela `fposts`
--

CREATE TABLE `fposts` (
  `id` int(11) NOT NULL,
  `ftopico_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `texto` text NOT NULL,
  `imagens` text DEFAULT NULL,
  `criado_em` datetime DEFAULT current_timestamp(),
  `atualizado_em` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `fposts`
--

INSERT INTO `fposts` (`id`, `ftopico_id`, `usuario_id`, `texto`, `imagens`, `criado_em`, `atualizado_em`) VALUES
(1, 1, 2, 'Alguém mais já caiu nesse golpe? Preciso de mais informações.', 'img1.jpg', '2025-01-12 16:44:50', '2025-01-12 16:44:50'),
(2, 2, 1, 'Eu caí nesse golpe há um tempo atrás, tomei cuidado ao fazer uma pesquisa sobre o site', 'img2.jpg', '2025-01-12 16:44:50', '2025-01-12 16:44:50'),
(3, 3, 2, 'Esse tipo de ligação acontece com bastante frequência, fiquem atentos.', 'img3.jpg', '2025-01-12 16:44:50', '2025-01-12 16:44:50');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ftopicos`
--

CREATE TABLE `ftopicos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `respostas` int(11) DEFAULT 0,
  `criado_em` datetime DEFAULT current_timestamp(),
  `atualizado_em` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `ftopicos`
--

INSERT INTO `ftopicos` (`id`, `titulo`, `categoria_id`, `usuario_id`, `respostas`, `criado_em`, `atualizado_em`) VALUES
(1, 'Golpe de Phishing com e-mail falso', 1, 1, 0, '2025-01-12 16:44:50', '2025-01-12 16:44:50'),
(2, 'Golpe de Investimento em Criptomoedas', 2, 2, 0, '2025-01-12 16:44:50', '2025-01-12 16:44:50'),
(3, 'Golpe de Suporte Técnico do Windows', 3, 3, 0, '2025-01-12 16:44:50', '2025-01-12 16:44:50');

-- --------------------------------------------------------

--
-- Estrutura para tabela `golpes`
--

CREATE TABLE `golpes` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `data` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `golpes`
--

INSERT INTO `golpes` (`id`, `titulo`, `descricao`, `categoria_id`, `usuario_id`, `data`) VALUES
(1, 'Golpe de Phishing com e-mail falso', 'Recebemos um e-mail que parece ser da instituição bancária, mas era falso.', 1, 1, '2025-01-12 16:44:50'),
(2, 'Golpe de Investimento em Criptomoedas', 'Ofereceram uma plataforma de investimentos em criptomoedas com promessas de altos lucros', 2, 2, '2025-01-12 16:44:50'),
(3, 'Golpe de Suporte Técnico do Windows', 'Recebemos uma ligação de alguém dizendo ser da Microsoft oferecendo ajuda com erros no computador', 3, 3, '2025-01-12 16:44:50');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` enum('user','admin','moderador') DEFAULT 'user',
  `criado_em` datetime DEFAULT current_timestamp(),
  `atualizado_em` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `tipo`, `criado_em`, `atualizado_em`) VALUES
(1, 'Admin User', 'admin@exemplo.com', 'senha_segura', 'admin', '2025-01-12 16:44:50', '2025-01-12 16:44:50'),
(2, 'Moderador User', 'moderador@exemplo.com', 'senha_segura', 'moderador', '2025-01-12 16:44:50', '2025-01-12 16:44:50'),
(3, 'Comum User', 'usuario@exemplo.com', 'senha_segura', 'user', '2025-01-12 16:44:50', '2025-01-12 16:44:50');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Índices de tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `golpe_id` (`golpe_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `fposts`
--
ALTER TABLE `fposts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ftopico_id` (`ftopico_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `ftopicos`
--
ALTER TABLE `ftopicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `golpes`
--
ALTER TABLE `golpes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `fposts`
--
ALTER TABLE `fposts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `ftopicos`
--
ALTER TABLE `ftopicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `golpes`
--
ALTER TABLE `golpes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`golpe_id`) REFERENCES `golpes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `fposts`
--
ALTER TABLE `fposts`
  ADD CONSTRAINT `fposts_ibfk_1` FOREIGN KEY (`ftopico_id`) REFERENCES `ftopicos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fposts_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `ftopicos`
--
ALTER TABLE `ftopicos`
  ADD CONSTRAINT `ftopicos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ftopicos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `golpes`
--
ALTER TABLE `golpes`
  ADD CONSTRAINT `golpes_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `golpes_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


-- Remove tabelas na ordem inversa de dependência
DROP TABLE IF EXISTS historico_solicitacao CASCADE;
DROP TABLE IF EXISTS solicitacao CASCADE;
DROP TABLE IF EXISTS cliente CASCADE;
DROP TABLE IF EXISTS funcionario CASCADE;
DROP TABLE IF EXISTS categoria CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;
 
-- um ENUM pras solicitações baterem com os requisitos 

DROP TYPE IF EXISTS perfil_usuario;
DROP TYPE IF EXISTS estado_solicitacao;
 
CREATE TYPE perfil_usuario AS ENUM ('CLIENTE', 'FUNCIONARIO');
 
CREATE TYPE estado_solicitacao AS ENUM (
    'ABERTA',
    'ORCADA',
    'APROVADA',
    'REJEITADA',
    'REDIRECIONADA',
    'ARRUMADA',
    'PAGA',
    'FINALIZADA'
);
 
 
CREATE TABLE usuario (
    id            BIGSERIAL       PRIMARY KEY,
    email         VARCHAR(255)    NOT NULL UNIQUE,
    senha         VARCHAR(64)     NOT NULL,           -- SHA-256 = 64 chars hex
    salt          VARCHAR(32)     NOT NULL,           -- SALT aleatório
    perfil        perfil_usuario  NOT NULL,
    ativo         BOOLEAN         NOT NULL DEFAULT TRUE,
    criado_em     TIMESTAMP       NOT NULL DEFAULT NOW()
);
 
CREATE TABLE categoria (
    id    BIGSERIAL     PRIMARY KEY,
    nome  VARCHAR(100)  NOT NULL UNIQUE,
    ativo BOOLEAN       NOT NULL DEFAULT TRUE
);

CREATE TABLE cliente (
    id           BIGSERIAL     PRIMARY KEY,
    id_usuario   BIGINT        NOT NULL UNIQUE REFERENCES usuario(id),
    cpf          VARCHAR(11)   NOT NULL UNIQUE,
    nome         VARCHAR(255)  NOT NULL,
    telefone     VARCHAR(11)   NOT NULL,
    -- Endereço completo (RF001 - todos os dados do ViaCEP armazenados)
    cep          VARCHAR(8)    NOT NULL,
    logradouro   VARCHAR(255)  NOT NULL,
    numero       VARCHAR(10)   NOT NULL,
    complemento  VARCHAR(100),
    bairro       VARCHAR(100)  NOT NULL,
    cidade       VARCHAR(100)  NOT NULL,
    estado       VARCHAR(2)    NOT NULL
);

CREATE TABLE funcionario (
    id               BIGSERIAL    PRIMARY KEY,
    id_usuario       BIGINT       NOT NULL UNIQUE REFERENCES usuario(id),
    nome             VARCHAR(255) NOT NULL,
    data_nascimento  DATE         NOT NULL
);

CREATE TABLE solicitacao (
    id                    BIGSERIAL          PRIMARY KEY,
    id_cliente            BIGINT             NOT NULL REFERENCES cliente(id),
    id_categoria          BIGINT             NOT NULL REFERENCES categoria(id),
    -- Dados do equipamento
    equipamento           VARCHAR(255)       NOT NULL,
    desc_defeito          TEXT               NOT NULL,
    -- Controle de estado
    estado                estado_solicitacao NOT NULL DEFAULT 'ABERTA',
    data_hora             TIMESTAMP          NOT NULL DEFAULT NOW(),
    -- Orçamento (preenchido pelo funcionário)
    valor_orcamento       NUMERIC(10, 2),
    id_func_orcamento     BIGINT             REFERENCES funcionario(id),
    data_hora_orcamento   TIMESTAMP,
    -- Manutenção (preenchido no RF014)
    desc_manutencao       TEXT,
    orientacoes_cliente   TEXT,
    id_func_manutencao    BIGINT             REFERENCES funcionario(id),
    data_hora_manutencao  TIMESTAMP,
    -- Pagamento (RF010)
    data_hora_pagamento   TIMESTAMP,
    -- Finalização (RF016)
    id_func_finalizacao   BIGINT             REFERENCES funcionario(id),
    data_hora_finalizacao TIMESTAMP,
    -- Redirecionamento atual (RF015)
    id_func_destino       BIGINT             REFERENCES funcionario(id)
);

CREATE TABLE historico_solicitacao (
    id               BIGSERIAL          PRIMARY KEY, --controle com bigserial mas aqui eu segui meu coração
    id_solicitacao   BIGINT             NOT NULL REFERENCES solicitacao(id),
    id_funcionario   BIGINT             REFERENCES funcionario(id),   -- NULL se ação foi do cliente
    estado_anterior  estado_solicitacao,
    estado_novo      estado_solicitacao NOT NULL,
    data_hora        TIMESTAMP          NOT NULL DEFAULT NOW(),
    observacao       TEXT,                                            -- motivo de rejeição, etc.
    -- Para redirecionamento 
    id_func_origem   BIGINT             REFERENCES funcionario(id),
    id_func_destino  BIGINT             REFERENCES funcionario(id)
);
 
 
-- Solicitações por cliente (RF003)
CREATE INDEX idx_sol_cliente      ON solicitacao(id_cliente);
 
-- Solicitações por estado (RF011, RF013)
CREATE INDEX idx_sol_estado       ON solicitacao(estado);
 
-- Solicitações por data (RF013 - filtro por período)
CREATE INDEX idx_sol_data_hora    ON solicitacao(data_hora);
 
-- Histórico por solicitação (RF008)
CREATE INDEX idx_hist_solicitacao ON historico_solicitacao(id_solicitacao);
 
-- Solicitações redirecionadas para um funcionário (RF013)
CREATE INDEX idx_sol_func_destino ON solicitacao(id_func_destino);
 
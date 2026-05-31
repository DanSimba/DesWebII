-- =============================================================
--  MOCK DATA – Sistema de Manutenção
--  2 Funcionários | 4 Clientes | 5 Categorias | 25 Solicitações
-- =============================================================

-- -------------------------------------------------------------
-- USUÁRIOS
-- -------------------------------------------------------------
INSERT INTO usuario (id, email, senha, salt, perfil, ativo) VALUES
(1, 'maria@maintec.com', 'prwCj4u/D7I+CoKzlEOw9N1qs5V0OSkFAIvMP+WCVM8=', 'Dbrm5DARwEFhRRICCibiIQ==', 'FUNCIONARIO', TRUE),
(2, 'mario@maintec.com', '7jCHtnMfa30qvgMyDFb69CAdeq3BtLZPgJI2NLQT86Y=', 'GMvISiVtM7OH7dHKSqHIag==', 'FUNCIONARIO', TRUE),
(3, 'joao@email.com', 'kvsH2BTxLG/8Kmagr5OY5XOmhlpoJrLNlpOxcxEwBZw=', 'jOT+JORhq3xN9K7lqGH6mg==', 'CLIENTE',     TRUE),
(4, 'jose@email.com', 'VEFoxERSrb39RjzdX66zrb1O38A5BrIMAI53cU/59uU=', 'FglaIh2ZBUsnkTVi0+XStw==', 'CLIENTE',     TRUE),
(5, 'joana@email.com', 'nyR9Mz7fb4VF7NPMkkqEEKd1k1KqOiHa/ilk/vTXRws=', 'Vg7O1wGLHVzDqwLu/rE8CQ==', 'CLIENTE',     TRUE),
(6, 'joaquina@email.com', 'b+WpDvKYCNQKL+intc5zab9M2MjA46R3pjyBqLUucIU=', '91CXd+pjN97Fu4gnxuPjZA==', 'CLIENTE',     TRUE);

SELECT setval('usuario_id_seq', 6);

-- -------------------------------------------------------------
-- CATEGORIAS
-- -------------------------------------------------------------
INSERT INTO categoria (id, nome, ativo) VALUES
(1, 'Notebook',   TRUE),
(2, 'Desktop',    TRUE),
(3, 'Impressora', TRUE),
(4, 'Mouse',      TRUE),
(5, 'Teclado',    TRUE);

SELECT setval('categoria_id_seq', 5);

-- -------------------------------------------------------------
-- FUNCIONÁRIOS
-- -------------------------------------------------------------
INSERT INTO funcionario (id, id_usuario, nome, data_nascimento, cargo_funcionario, ativo) VALUES
(1, 1, 'Maria Silva', '1990-03-15', 'Técnica de Manutenção', TRUE),
(2, 2, 'Mário Souza', '1985-07-22', 'Técnico de Manutenção', TRUE);

SELECT setval('funcionario_id_seq', 2);

-- -------------------------------------------------------------
-- CLIENTES
-- -------------------------------------------------------------
INSERT INTO cliente (id, id_usuario, cpf, nome, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado) VALUES
(1, 3, '11122233344', 'João Oliveira',   '44999110001', '87020010', 'Av. Colombo',             '5790', 'Bloco B',  'Zona 7',        'Maringá',  'PR'),
(2, 4, '22233344455', 'José Santos',     '44999110002', '87013000', 'Rua Dom Pedro',           '320',  NULL,       'Centro',        'Maringá',  'PR'),
(3, 5, '33344455566', 'Joana Pereira',   '44999110003', '87025000', 'Rua Pioneiro João Rego',  '180',  'Apto 12',  'Zona 3',        'Maringá',  'PR'),
(4, 6, '44455566677', 'Joaquina Mendes', '44999110004', '87035000', 'Rua Joubert de Carvalho', '900',  NULL,       'Jardim Alvorada','Maringá', 'PR');

SELECT setval('cliente_id_seq', 4);

-- -------------------------------------------------------------
-- SOLICITAÇÕES 
-- -------------------------------------------------------------
INSERT INTO solicitacao (
    id, id_cliente, id_categoria, equipamento, desc_defeito,
    estado, data_hora,
    valor_orcamento, id_func_orcamento, data_hora_orcamento,
    desc_manutencao, orientacoes_cliente, id_func_manutencao, data_hora_manutencao,
    data_hora_pagamento,
    id_func_finalizacao, data_hora_finalizacao,
    id_func_destino, motivo_rejeicao
) VALUES

-- ── ABERTAS (aguardando orçamento) ──────────────────────────
-- 1
(1,  1, 1, 'Notebook Dell Inspiron 15',    'Não liga após queda da mesa',
 'ABERTA', '2025-01-05 08:30:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),

-- 2
(2,  2, 3, 'Impressora Epson L3150',       'Imprime com listras horizontais',
 'ABERTA', '2025-01-06 10:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),

-- 3
(3,  3, 4, 'Mouse Logitech MX Master 3',   'Scroll wheel não funciona',
 'ABERTA', '2025-01-07 14:15:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),

-- ── ORÇADAS (aguardando aprovação do cliente) ────────────────
-- 4
(4,  4, 2, 'Desktop HP Compaq 8200',       'Tela azul ao iniciar o Windows',
 'ORCADA', '2025-01-03 09:00:00',
 280.00, 1, '2025-01-04 10:30:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),

-- 5
(5,  1, 5, 'Teclado Mecânico HyperX',      'Tecla "Enter" travando',
 'ORCADA', '2025-01-04 11:00:00',
 95.00, 2, '2025-01-05 09:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),

-- 6
(6,  2, 1, 'Notebook Lenovo IdeaPad 3',    'Bateria descarrega em 30 min',
 'ORCADA', '2025-01-02 13:00:00',
 210.00, 1, '2025-01-03 11:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),

-- ── APROVADAS (aguardando início da manutenção) ──────────────
-- 7
(7,  3, 2, 'Desktop Lenovo ThinkCentre',   'Computador reinicia sozinho sob carga',
 'APROVADA', '2024-12-20 08:00:00',
 320.00, 2, '2024-12-21 09:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),

-- 8
(8,  4, 3, 'Impressora HP LaserJet M107',  'Papel enrola e encrenca na saída',
 'APROVADA', '2024-12-22 10:00:00',
 150.00, 1, '2024-12-23 09:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),

-- 9
(9,  1, 4, 'Mouse sem fio Microsoft Arc',  'Cursor pula aleatoriamente pela tela',
 'APROVADA', '2024-12-28 14:00:00',
 70.00, 2, '2024-12-29 10:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),

-- ── REJEITADAS (cliente recusou orçamento) ───────────────────
-- 10
(10, 2, 1, 'Notebook Acer Aspire 5',       'Tela com manchas e linhas verticais',
 'REJEITADA', '2024-12-01 09:00:00',
 750.00, 1, '2024-12-02 10:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
 'Valor acima do esperado pelo cliente'),

-- 11
(11, 3, 5, 'Teclado Sem Fio Multilaser',   'Várias teclas não respondem',
 'REJEITADA', '2024-11-15 11:00:00',
 130.00, 2, '2024-11-16 09:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
 'Cliente preferiu comprar um teclado novo'),

-- ── REDIRECIONADAS (func. repassou para outro) ───────────────
-- 12
(12, 4, 3, 'Impressora Brother DCP-T520W', 'Wi-Fi não conecta a nenhuma rede',
 'REDIRECIONADA', '2024-12-10 08:00:00',
 190.00, 1, '2024-12-11 09:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL),

-- 13
(13, 1, 2, 'Desktop Positivo Master D570', 'Fonte emitindo ruído e cheiro de queimado',
 'REDIRECIONADA', '2024-12-15 10:00:00',
 380.00, 2, '2024-12-16 09:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL),

-- ── ARRUMADAS (manutenção concluída, aguardando pagamento) ───
-- 14
(14, 2, 1, 'Notebook Samsung Book',        'Superaquecimento, desliga após 10 min',
 'ARRUMADA', '2024-11-20 09:00:00',
 310.00, 1, '2024-11-21 10:00:00',
 'Cooler substituído e pasta térmica reaplicada',
 'Evite usar em superfícies que bloqueiem a ventilação',
 1, '2024-11-25 15:00:00',
 NULL, NULL, NULL, NULL, NULL),

-- 15
(15, 3, 4, 'Mouse Gamer Redragon Cobra',   'Clique duplo involuntário no botão esquerdo',
 'ARRUMADA', '2024-11-22 11:00:00',
 85.00, 2, '2024-11-23 10:00:00',
 'Microswitch substituído por Omron D2FC-F-7N',
 'Evite pressionar o botão com força excessiva',
 2, '2024-11-26 14:00:00',
 NULL, NULL, NULL, NULL, NULL),

-- 16
(16, 4, 5, 'Teclado Gamer RGB Corsair K55', 'LEDs completamente apagados',
 'ARRUMADA', '2024-11-10 08:00:00',
 115.00, 1, '2024-11-11 09:00:00',
 'Controlador de LEDs trocado e firmware atualizado',
 'Não use softwares não oficiais para controle de iluminação',
 1, '2024-11-14 16:00:00',
 NULL, NULL, NULL, NULL, NULL),

-- ── PAGAS (aguardando entrega/finalização) ───────────────────
-- 17
(17, 1, 2, 'Desktop Dell OptiPlex 3070',   'Lentidão extrema, SSD corrompido',
 'PAGA', '2024-10-10 09:00:00',
 490.00, 2, '2024-10-11 10:00:00',
 'SSD defeituoso substituído por Samsung 870 EVO 480GB',
 'Faça backups regulares em nuvem ou HD externo',
 2, '2024-10-15 14:00:00',
 '2024-10-16 11:00:00', NULL, NULL, NULL, NULL),

-- 18
(18, 2, 3, 'Impressora Canon PIXMA G3160', 'Não imprime a cor preta',
 'PAGA', '2024-10-05 10:00:00',
 175.00, 1, '2024-10-06 09:00:00',
 'Cabeça de impressão limpa e cartucho de tinta preta substituído',
 'Realize impressões ao menos uma vez por semana para não entupir',
 1, '2024-10-09 15:00:00',
 '2024-10-10 10:00:00', NULL, NULL, NULL, NULL),

-- 19 (rejeitada e depois resgatada → paga)
(19, 3, 1, 'Notebook Asus VivoBook 15',    'HD mecânico com bad sectors, muito lento',
 'PAGA', '2024-09-20 09:00:00',
 420.00, 2, '2024-09-21 10:00:00',
 'HD substituído por SSD e sistema reinstalado',
 'Evite impactos físicos no equipamento',
 2, '2024-09-25 14:00:00',
 '2024-09-26 10:00:00', NULL, NULL, NULL, NULL),

-- ── FINALIZADAS ───────────────────────────────────────────────
-- 20
(20, 4, 4, 'Mouse Óptico OEX Task MS300', 'Sensor não detecta movimento',
 'FINALIZADA', '2024-09-01 09:00:00',
 60.00, 1, '2024-09-02 10:00:00',
 'Sensor óptico substituído',
 'Utilize em superfícies lisas e limpas',
 1, '2024-09-04 14:00:00',
 '2024-09-05 10:00:00', 1, '2024-09-06 09:00:00', NULL, NULL),

-- 21
(21, 1, 5, 'Teclado Bluetooth Logitech K480', 'Perde conexão Bluetooth com frequência',
 'FINALIZADA', '2024-08-15 10:00:00',
 110.00, 2, '2024-08-16 09:00:00',
 'Módulo Bluetooth interno substituído',
 'Mantenha o dispositivo pareado próximo ao receptor',
 2, '2024-08-20 15:00:00',
 '2024-08-21 11:00:00', 2, '2024-08-22 09:00:00', NULL, NULL),

-- 22
(22, 2, 2, 'Desktop Custom (peças diversas)', 'Placa de vídeo com artefatos visuais',
 'FINALIZADA', '2024-08-01 08:00:00',
 870.00, 1, '2024-08-02 10:00:00',
 'Pasta térmica da GPU reaplicada e drivers reinstalados',
 'Mantenha o gabinete limpo e bem ventilado',
 1, '2024-08-06 16:00:00',
 '2024-08-07 10:00:00', 1, '2024-08-08 09:00:00', NULL, NULL),

-- 23
(23, 3, 1, 'Notebook LG Gram 14',           'Tela piscando em qualquer brilho',
 'FINALIZADA', '2024-07-10 09:00:00',
 290.00, 2, '2024-07-11 10:00:00',
 'Cabo flat da tela reposicionado e parafusos da dobradiça apertados',
 'Abra e feche a tampa com cuidado; evite torções laterais',
 2, '2024-07-15 14:00:00',
 '2024-07-16 10:00:00', 2, '2024-07-17 09:00:00', NULL, NULL),

-- 24
(24, 4, 3, 'Impressora Epson EcoTank L4260', 'Cabeça de impressão entupida, não imprime',
 'FINALIZADA', '2024-07-01 10:00:00',
 195.00, 1, '2024-07-02 09:00:00',
 'Limpeza profunda da cabeça e alinhamento realizado',
 'Imprima ao menos uma vez por semana para evitar entupimentos',
 1, '2024-07-05 15:00:00',
 '2024-07-06 11:00:00', 1, '2024-07-07 09:00:00', NULL, NULL),

-- 25 (redirecionada e depois finalizada, para cobrir fluxo completo)
(25, 2, 2, 'Desktop Lenovo IdeaCentre 310S', 'Não reconhece nenhum dispositivo USB',
 'FINALIZADA', '2024-06-10 08:00:00',
 140.00, 1, '2024-06-11 09:00:00',
 'Drivers USB reinstalados e porta danificada trocada',
 'Sempre ejete dispositivos USB pelo sistema antes de remover',
 2, '2024-06-15 14:00:00',
 '2024-06-16 10:00:00', 2, '2024-06-17 09:00:00', NULL, NULL);

SELECT setval('solicitacao_id_seq', 25);

-- -------------------------------------------------------------
-- HISTÓRICO DE SOLICITAÇÕES
-- -------------------------------------------------------------
INSERT INTO historico_solicitacao
    (id_solicitacao, id_funcionario, estado_anterior, estado_novo, data_hora, observacao, id_func_origem, id_func_destino)
VALUES

-- ── Sol. 1, 2, 3 – ABERTAS: apenas criação, sem histórico ───

-- ── Sol. 4 – ABERTA → ORCADA ─────────────────────────────────
(4,  1,    'ABERTA', 'ORCADA', '2025-01-04 10:30:00', 'Orçamento realizado por Maria',  NULL, NULL),

-- ── Sol. 5 – ABERTA → ORCADA ─────────────────────────────────
(5,  2,    'ABERTA', 'ORCADA', '2025-01-05 09:00:00', 'Orçamento realizado por Mário',  NULL, NULL),

-- ── Sol. 6 – ABERTA → ORCADA ─────────────────────────────────
(6,  1,    'ABERTA', 'ORCADA', '2025-01-03 11:00:00', 'Orçamento realizado por Maria',  NULL, NULL),

-- ── Sol. 7 – ABERTA → ORCADA → APROVADA ─────────────────────
(7,  2,    'ABERTA',  'ORCADA',   '2024-12-21 09:00:00', 'Orçamento realizado por Mário', NULL, NULL),
(7,  NULL, 'ORCADA',  'APROVADA', '2024-12-22 14:00:00', 'Aprovado pelo cliente',          NULL, NULL),

-- ── Sol. 8 – ABERTA → ORCADA → APROVADA ─────────────────────
(8,  1,    'ABERTA',  'ORCADA',   '2024-12-23 09:00:00', 'Orçamento realizado por Maria', NULL, NULL),
(8,  NULL, 'ORCADA',  'APROVADA', '2024-12-24 10:00:00', 'Aprovado pelo cliente',          NULL, NULL),

-- ── Sol. 9 – ABERTA → ORCADA → APROVADA ─────────────────────
(9,  2,    'ABERTA',  'ORCADA',   '2024-12-29 10:00:00', 'Orçamento realizado por Mário', NULL, NULL),
(9,  NULL, 'ORCADA',  'APROVADA', '2024-12-30 11:00:00', 'Aprovado pelo cliente',          NULL, NULL),

-- ── Sol. 10 – ABERTA → ORCADA → REJEITADA ────────────────────
(10, 1,    'ABERTA',  'ORCADA',    '2024-12-02 10:00:00', 'Orçamento realizado por Maria',          NULL, NULL),
(10, NULL, 'ORCADA',  'REJEITADA', '2024-12-03 09:00:00', 'Valor acima do esperado pelo cliente',   NULL, NULL),

-- ── Sol. 11 – ABERTA → ORCADA → REJEITADA ────────────────────
(11, 2,    'ABERTA',  'ORCADA',    '2024-11-16 09:00:00', 'Orçamento realizado por Mário',               NULL, NULL),
(11, NULL, 'ORCADA',  'REJEITADA', '2024-11-17 10:00:00', 'Cliente preferiu comprar um teclado novo',    NULL, NULL),

-- ── Sol. 12 – ABERTA → ORCADA → APROVADA → REDIRECIONADA ────
(12, 1,    'ABERTA',    'ORCADA',         '2024-12-11 09:00:00', 'Orçamento realizado por Maria',                    NULL, NULL),
(12, NULL, 'ORCADA',    'APROVADA',       '2024-12-12 10:00:00', 'Aprovado pelo cliente',                             NULL, NULL),
(12, 1,    'APROVADA',  'REDIRECIONADA',  '2024-12-13 08:00:00', 'Maria não tem experiência com redes Wi-Fi em impressoras', 1, 2),

-- ── Sol. 13 – ABERTA → ORCADA → APROVADA → REDIRECIONADA ────
(13, 2,    'ABERTA',    'ORCADA',         '2024-12-16 09:00:00', 'Orçamento realizado por Mário',                    NULL, NULL),
(13, NULL, 'ORCADA',    'APROVADA',       '2024-12-17 10:00:00', 'Aprovado pelo cliente',                             NULL, NULL),
(13, 2,    'APROVADA',  'REDIRECIONADA',  '2024-12-18 08:00:00', 'Mário redirecionou para Maria por indisponibilidade', 2,  1),

-- ── Sol. 14 – ABERTA → ORCADA → APROVADA → ARRUMADA ─────────
(14, 1,    'ABERTA',   'ORCADA',   '2024-11-21 10:00:00', 'Orçamento realizado por Maria', NULL, NULL),
(14, NULL, 'ORCADA',   'APROVADA', '2024-11-22 09:00:00', 'Aprovado pelo cliente',          NULL, NULL),
(14, 1,    'APROVADA', 'ARRUMADA', '2024-11-25 15:00:00', 'Cooler substituído com sucesso', NULL, NULL),

-- ── Sol. 15 – ABERTA → ORCADA → APROVADA → ARRUMADA ─────────
(15, 2,    'ABERTA',   'ORCADA',   '2024-11-23 10:00:00', 'Orçamento realizado por Mário',        NULL, NULL),
(15, NULL, 'ORCADA',   'APROVADA', '2024-11-24 09:00:00', 'Aprovado pelo cliente',                 NULL, NULL),
(15, 2,    'APROVADA', 'ARRUMADA', '2024-11-26 14:00:00', 'Microswitch substituído com sucesso',   NULL, NULL),

-- ── Sol. 16 – ABERTA → ORCADA → APROVADA → ARRUMADA ─────────
(16, 1,    'ABERTA',   'ORCADA',   '2024-11-11 09:00:00', 'Orçamento realizado por Maria',               NULL, NULL),
(16, NULL, 'ORCADA',   'APROVADA', '2024-11-12 10:00:00', 'Aprovado pelo cliente',                        NULL, NULL),
(16, 1,    'APROVADA', 'ARRUMADA', '2024-11-14 16:00:00', 'Controlador de LEDs substituído com sucesso',  NULL, NULL),

-- ── Sol. 17 – → PAGA ─────────────────────────────────────────
(17, 2,    'ABERTA',   'ORCADA',   '2024-10-11 10:00:00', 'Orçamento realizado por Mário', NULL, NULL),
(17, NULL, 'ORCADA',   'APROVADA', '2024-10-12 09:00:00', 'Aprovado pelo cliente',          NULL, NULL),
(17, 2,    'APROVADA', 'ARRUMADA', '2024-10-15 14:00:00', 'SSD substituído com sucesso',   NULL, NULL),
(17, NULL, 'ARRUMADA', 'PAGA',     '2024-10-16 11:00:00', 'Pagamento confirmado pelo cliente', NULL, NULL),

-- ── Sol. 18 – → PAGA ─────────────────────────────────────────
(18, 1,    'ABERTA',   'ORCADA',   '2024-10-06 09:00:00', 'Orçamento realizado por Maria',       NULL, NULL),
(18, NULL, 'ORCADA',   'APROVADA', '2024-10-07 10:00:00', 'Aprovado pelo cliente',                NULL, NULL),
(18, 1,    'APROVADA', 'ARRUMADA', '2024-10-09 15:00:00', 'Cabeça de impressão limpa e tinta OK', NULL, NULL),
(18, NULL, 'ARRUMADA', 'PAGA',     '2024-10-10 10:00:00', 'Pagamento confirmado pelo cliente',    NULL, NULL),

-- ── Sol. 19 – REJEITADA → RESGATADA → PAGA (RF009) ───────────
(19, 2,    'ABERTA',    'ORCADA',    '2024-09-21 10:00:00', 'Orçamento realizado por Mário',           NULL, NULL),
(19, NULL, 'ORCADA',    'REJEITADA', '2024-09-22 09:00:00', 'Cliente achou o valor alto',              NULL, NULL),
(19, NULL, 'REJEITADA', 'APROVADA',  '2024-09-23 08:00:00', 'Cliente resgatou a solicitação',          NULL, NULL),
(19, 2,    'APROVADA',  'ARRUMADA',  '2024-09-25 14:00:00', 'HD substituído por SSD com sucesso',      NULL, NULL),
(19, NULL, 'ARRUMADA',  'PAGA',      '2024-09-26 10:00:00', 'Pagamento confirmado pelo cliente',       NULL, NULL),

-- ── Sol. 20 – → FINALIZADA ───────────────────────────────────
(20, 1,    'ABERTA',   'ORCADA',     '2024-09-02 10:00:00', 'Orçamento realizado por Maria', NULL, NULL),
(20, NULL, 'ORCADA',   'APROVADA',   '2024-09-03 09:00:00', 'Aprovado pelo cliente',          NULL, NULL),
(20, 1,    'APROVADA', 'ARRUMADA',   '2024-09-04 14:00:00', 'Sensor óptico substituído',      NULL, NULL),
(20, NULL, 'ARRUMADA', 'PAGA',       '2024-09-05 10:00:00', 'Pagamento confirmado',            NULL, NULL),
(20, 1,    'PAGA',     'FINALIZADA', '2024-09-06 09:00:00', 'Equipamento entregue ao cliente', NULL, NULL),

-- ── Sol. 21 – → FINALIZADA ───────────────────────────────────
(21, 2,    'ABERTA',   'ORCADA',     '2024-08-16 09:00:00', 'Orçamento realizado por Mário',         NULL, NULL),
(21, NULL, 'ORCADA',   'APROVADA',   '2024-08-17 10:00:00', 'Aprovado pelo cliente',                  NULL, NULL),
(21, 2,    'APROVADA', 'ARRUMADA',   '2024-08-20 15:00:00', 'Módulo Bluetooth substituído',           NULL, NULL),
(21, NULL, 'ARRUMADA', 'PAGA',       '2024-08-21 11:00:00', 'Pagamento confirmado',                   NULL, NULL),
(21, 2,    'PAGA',     'FINALIZADA', '2024-08-22 09:00:00', 'Equipamento entregue ao cliente',        NULL, NULL),

-- ── Sol. 22 – → FINALIZADA ───────────────────────────────────
(22, 1,    'ABERTA',   'ORCADA',     '2024-08-02 10:00:00', 'Orçamento realizado por Maria',  NULL, NULL),
(22, NULL, 'ORCADA',   'APROVADA',   '2024-08-03 09:00:00', 'Aprovado pelo cliente',           NULL, NULL),
(22, 1,    'APROVADA', 'ARRUMADA',   '2024-08-06 16:00:00', 'GPU corrigida com sucesso',       NULL, NULL),
(22, NULL, 'ARRUMADA', 'PAGA',       '2024-08-07 10:00:00', 'Pagamento confirmado',             NULL, NULL),
(22, 1,    'PAGA',     'FINALIZADA', '2024-08-08 09:00:00', 'Equipamento entregue ao cliente', NULL, NULL),

-- ── Sol. 23 – → FINALIZADA ───────────────────────────────────
(23, 2,    'ABERTA',   'ORCADA',     '2024-07-11 10:00:00', 'Orçamento realizado por Mário',   NULL, NULL),
(23, NULL, 'ORCADA',   'APROVADA',   '2024-07-12 09:00:00', 'Aprovado pelo cliente',            NULL, NULL),
(23, 2,    'APROVADA', 'ARRUMADA',   '2024-07-15 14:00:00', 'Cabo flat e dobradiça ajustados',  NULL, NULL),
(23, NULL, 'ARRUMADA', 'PAGA',       '2024-07-16 10:00:00', 'Pagamento confirmado',              NULL, NULL),
(23, 2,    'PAGA',     'FINALIZADA', '2024-07-17 09:00:00', 'Equipamento entregue ao cliente',  NULL, NULL),

-- ── Sol. 24 – → FINALIZADA ───────────────────────────────────
(24, 1,    'ABERTA',   'ORCADA',     '2024-07-02 09:00:00', 'Orçamento realizado por Maria',   NULL, NULL),
(24, NULL, 'ORCADA',   'APROVADA',   '2024-07-03 10:00:00', 'Aprovado pelo cliente',            NULL, NULL),
(24, 1,    'APROVADA', 'ARRUMADA',   '2024-07-05 15:00:00', 'Cabeça limpa e alinhamento OK',   NULL, NULL),
(24, NULL, 'ARRUMADA', 'PAGA',       '2024-07-06 11:00:00', 'Pagamento confirmado',             NULL, NULL),
(24, 1,    'PAGA',     'FINALIZADA', '2024-07-07 09:00:00', 'Equipamento entregue ao cliente', NULL, NULL),

-- ── Sol. 25 – REDIRECIONADA no meio → FINALIZADA ─────────────
(25, 1,    'ABERTA',       'ORCADA',         '2024-06-11 09:00:00', 'Orçamento realizado por Maria',                 NULL, NULL),
(25, NULL, 'ORCADA',       'APROVADA',       '2024-06-12 10:00:00', 'Aprovado pelo cliente',                          NULL, NULL),
(25, 1,    'APROVADA',     'REDIRECIONADA',  '2024-06-13 08:00:00', 'Maria redirecionou para Mário (especialista USB)', 1, 2),
(25, 2,    'REDIRECIONADA','ARRUMADA',       '2024-06-15 14:00:00', 'Porta USB trocada e drivers reinstalados por Mário', NULL, NULL),
(25, NULL, 'ARRUMADA',     'PAGA',           '2024-06-16 10:00:00', 'Pagamento confirmado',                           NULL, NULL),
(25, 2,    'PAGA',         'FINALIZADA',     '2024-06-17 09:00:00', 'Equipamento entregue ao cliente',                NULL, NULL);
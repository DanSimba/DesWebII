
INSERT INTO usuario (email, senha, salt, perfil) VALUES
    -- Funcionários
    ('maria@maintec.com',    'a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7', 'salt_maria_0001', 'FUNCIONARIO'),
    ('mario@maintec.com',    'b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8', 'salt_mario_0002', 'FUNCIONARIO'),
    -- Clientes
    ('joao@email.com',       'c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9', 'salt_joao_0003',  'CLIENTE'),
    ('jose@email.com',       'd9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0', 'salt_jose_0004',  'CLIENTE'),
    ('joana@email.com',      'e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1', 'salt_joana_0005', 'CLIENTE'),
    ('joaquina@email.com',   'f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2', 'salt_joaq_0006',  'CLIENTE');
 

 
INSERT INTO categoria (nome, ativo) VALUES
    ('Notebook',   TRUE),
    ('Desktop',    TRUE),
    ('Impressora', TRUE),
    ('Mouse',      TRUE),
    ('Teclado',    TRUE);
 

INSERT INTO funcionario (id_usuario, nome, data_nascimento) VALUES
    (1, 'Maria Silva',    '1990-03-15'),
    (2, 'Mário Souza',   '1985-07-22');

 
INSERT INTO cliente (id_usuario, cpf, nome, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado) VALUES
    (3, '12345678901', 'João Oliveira',    '41999990001', '80010000', 'Rua XV de Novembro',  '100', 'Apto 10', 'Centro',         'Curitiba',   'PR'),
    (4, '23456789012', 'José Santos',      '41999990002', '80020000', 'Av. Sete de Setembro', '200', NULL,      'Centro',         'Curitiba',   'PR'),
    (5, '34567890123', 'Joana Pereira',    '41999990003', '80030000', 'Rua Marechal Deodoro', '300', 'Sala 5', 'Centro',         'Curitiba',   'PR'),
    (6, '45678901234', 'Joaquina Mendes',  '41999990004', '80040000', 'Rua Amintas de Barros','400', NULL,      'Alto da Glória', 'Curitiba',   'PR');
 
 
INSERT INTO solicitacao (
    id_cliente, id_categoria, equipamento, desc_defeito,
    estado, data_hora,
    valor_orcamento, id_func_orcamento, data_hora_orcamento,
    desc_manutencao, orientacoes_cliente, id_func_manutencao, data_hora_manutencao,
    data_hora_pagamento,
    id_func_finalizacao, data_hora_finalizacao,
    id_func_destino
) VALUES
 
-- 1. ABERTA - aguardando orçamento
(1, 1, 'Notebook Dell Inspiron', 'Não liga após queda',
 'ABERTA', '2024-11-01 09:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
 
-- 2. ABERTA
(2, 3, 'Impressora HP LaserJet', 'Papel encrencando constantemente',
 'ABERTA', '2024-11-02 10:30:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
 
-- 3. ORCADA - aguardando aprovação do cliente
(3, 2, 'Desktop Lenovo', 'Tela azul frequente',
 'ORCADA', '2024-10-15 08:00:00',
 350.00, 1, '2024-10-16 09:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
 
-- 4. ORCADA
(4, 1, 'Notebook Acer', 'Bateria não carrega',
 'ORCADA', '2024-10-20 14:00:00',
 180.00, 2, '2024-10-21 10:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
 
-- 5. APROVADA - aguardando manutenção
(1, 4, 'Mouse Logitech', 'Clique duplo involuntário',
 'APROVADA', '2024-10-10 11:00:00',
 80.00, 1, '2024-10-11 09:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
 
-- 6. APROVADA
(2, 5, 'Teclado Mecânico', 'Tecla espaço travando',
 'APROVADA', '2024-10-12 15:00:00',
 120.00, 2, '2024-10-13 11:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
 
-- 7. REJEITADA - cliente rejeitou o orçamento
(3, 1, 'Notebook Samsung', 'Superaquecimento',
 'REJEITADA', '2024-09-05 09:00:00',
 600.00, 1, '2024-09-06 10:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
 
-- 8. REJEITADA
(4, 2, 'Desktop Positivo', 'Fonte queimada',
 'REJEITADA', '2024-09-10 13:00:00',
 250.00, 2, '2024-09-11 09:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
 
-- 9. REDIRECIONADA - para Mario
(1, 3, 'Impressora Epson', 'Não imprime colorido',
 'REDIRECIONADA', '2024-10-25 08:00:00',
 200.00, 1, '2024-10-26 09:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
 
-- 10. ARRUMADA - aguardando pagamento
(2, 1, 'Notebook HP', 'HD com defeito',
 'ARRUMADA', '2024-10-01 10:00:00',
 450.00, 1, '2024-10-02 09:00:00',
 'HD substituído por SSD 480GB', 'Evite impactos físicos no equipamento', 1, '2024-10-05 14:00:00',
 NULL, NULL, NULL, NULL),
 
-- 11. ARRUMADA
(3, 4, 'Mouse sem fio', 'Cursor travando',
 'ARRUMADA', '2024-09-20 11:00:00',
 90.00, 2, '2024-09-21 10:00:00',
 'Sensor óptico limpo e firmware atualizado', 'Utilize em superfícies lisas', 2, '2024-09-23 15:00:00',
 NULL, NULL, NULL, NULL),
 
-- 12. PAGA - aguardando finalização
(4, 5, 'Teclado sem fio', 'Teclas não respondem',
 'PAGA', '2024-08-15 09:00:00',
 140.00, 1, '2024-08-16 10:00:00',
 'Membrana do teclado substituída', 'Evite líquidos próximos ao teclado', 1, '2024-08-20 11:00:00',
 '2024-08-21 16:00:00', NULL, NULL, NULL),
 
-- 13. PAGA
(1, 2, 'Desktop Dell', 'Lentidão extrema',
 'PAGA', '2024-08-01 08:00:00',
 300.00, 2, '2024-08-02 09:00:00',
 'Memória RAM ampliada para 16GB', 'Reinicie semanalmente', 2, '2024-08-05 14:00:00',
 '2024-08-06 10:00:00', NULL, NULL, NULL),
 
-- 14. FINALIZADA
(2, 1, 'Notebook Asus', 'Tela quebrada',
 'FINALIZADA', '2024-07-10 09:00:00',
 700.00, 1, '2024-07-11 10:00:00',
 'Tela substituída por original', 'Utilize capa protetora', 1, '2024-07-15 11:00:00',
 '2024-07-16 14:00:00', 1, '2024-07-17 09:00:00', NULL),
 
-- 15. FINALIZADA
(3, 3, 'Impressora Canon', 'Cabeça de impressão entupida',
 'FINALIZADA', '2024-07-01 10:00:00',
 180.00, 2, '2024-07-02 09:00:00',
 'Cabeça limpa e alinhada', 'Imprima ao menos uma vez por semana', 2, '2024-07-05 15:00:00',
 '2024-07-06 11:00:00', 2, '2024-07-07 09:00:00', NULL),
 
-- 16. FINALIZADA
(4, 2, 'Desktop HP', 'Não reconhece teclado USB',
 'FINALIZADA', '2024-06-15 08:00:00',
 120.00, 1, '2024-06-16 09:00:00',
 'Porta USB e driver reinstalados', 'Evite remover dispositivos sem ejetar', 1, '2024-06-18 14:00:00',
 '2024-06-19 10:00:00', 1, '2024-06-20 09:00:00', NULL),
 
-- 17. ABERTA - recente
(1, 5, 'Teclado Gamer RGB', 'LEDs não funcionam',
 'ABERTA', '2024-11-03 08:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
 
-- 18. ORCADA - recente
(2, 4, 'Mouse Gamer', 'DPI não muda',
 'ORCADA', '2024-11-01 14:00:00',
 95.00, 1, '2024-11-02 10:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
 
-- 19. APROVADA - recente
(3, 1, 'Notebook LG Gram', 'Cooler fazendo barulho',
 'APROVADA', '2024-10-28 09:00:00',
 160.00, 2, '2024-10-29 10:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
 
-- 20. REJEITADA e resgatada → APROVADA
(4, 3, 'Impressora Brother', 'Wi-Fi não conecta',
 'APROVADA', '2024-09-25 10:00:00',
 220.00, 1, '2024-09-26 09:00:00',
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
 
-- 21. ARRUMADA recente
(1, 2, 'Desktop custom', 'Placa de vídeo com artefatos',
 'ARRUMADA', '2024-10-18 08:00:00',
 850.00, 2, '2024-10-19 09:00:00',
 'Pasta térmica reaplicada e drivers reinstalados', 'Mantenha o gabinete limpo', 2, '2024-10-22 16:00:00',
 NULL, NULL, NULL, NULL),
 
-- 22. PAGA recente
(2, 5, 'Teclado Bluetooth', 'Perda de conexão frequente',
 'PAGA', '2024-10-05 11:00:00',
 110.00, 1, '2024-10-06 10:00:00',
 'Módulo Bluetooth substituído', 'Mantenha dispositivos próximos', 1, '2024-10-09 14:00:00',
 '2024-10-10 09:00:00', NULL, NULL, NULL);

 
INSERT INTO historico_solicitacao (id_solicitacao, id_funcionario, estado_anterior, estado_novo, data_hora, observacao, id_func_origem, id_func_destino) VALUES
 
-- Sol. 1: ABERTA (só criação, sem histórico ainda)
 
-- Sol. 3: ABERTA → ORCADA
(3, 1, 'ABERTA', 'ORCADA', '2024-10-16 09:00:00', 'Orçamento efetuado por Maria', NULL, NULL),
 
-- Sol. 4: ABERTA → ORCADA
(4, 2, 'ABERTA', 'ORCADA', '2024-10-21 10:00:00', 'Orçamento efetuado por Mário', NULL, NULL),
 
-- Sol. 5: ABERTA → ORCADA → APROVADA
(5, 1, 'ABERTA',  'ORCADA',   '2024-10-11 09:00:00', 'Orçamento efetuado por Maria', NULL, NULL),
(5, NULL, 'ORCADA',   'APROVADA', '2024-10-11 14:00:00', 'Aprovado pelo cliente',        NULL, NULL),
 
-- Sol. 6: ABERTA → ORCADA → APROVADA
(6, 2, 'ABERTA',  'ORCADA',   '2024-10-13 11:00:00', 'Orçamento efetuado por Mário', NULL, NULL),
(6, NULL, 'ORCADA',   'APROVADA', '2024-10-13 16:00:00', 'Aprovado pelo cliente',        NULL, NULL),
 
-- Sol. 7: ABERTA → ORCADA → REJEITADA
(7, 1, 'ABERTA',  'ORCADA',   '2024-09-06 10:00:00', 'Orçamento efetuado por Maria',       NULL, NULL),
(7, NULL, 'ORCADA', 'REJEITADA', '2024-09-07 09:00:00', 'Valor muito alto para o cliente',  NULL, NULL),
 
-- Sol. 8: ABERTA → ORCADA → REJEITADA
(8, 2, 'ABERTA',  'ORCADA',   '2024-09-11 09:00:00', 'Orçamento efetuado por Mário',       NULL, NULL),
(8, NULL, 'ORCADA', 'REJEITADA', '2024-09-12 10:00:00', 'Cliente optou por trocar o equipamento', NULL, NULL),
 
-- Sol. 9: ABERTA → ORCADA → APROVADA → REDIRECIONADA
(9, 1, 'ABERTA',    'ORCADA',        '2024-10-26 09:00:00', 'Orçamento efetuado por Maria',              NULL, NULL),
(9, NULL, 'ORCADA',      'APROVADA',      '2024-10-26 14:00:00', 'Aprovado pelo cliente',                     NULL, NULL),
(9, 1,    'APROVADA',    'REDIRECIONADA', '2024-10-27 08:00:00', 'Maria não tem expertise em impressoras',    1,    2   ),
 
-- Sol. 10: ABERTA → ORCADA → APROVADA → ARRUMADA
(10, 1, 'ABERTA',   'ORCADA',   '2024-10-02 09:00:00', 'Orçamento efetuado por Maria', NULL, NULL),
(10, NULL, 'ORCADA',    'APROVADA', '2024-10-02 15:00:00', 'Aprovado pelo cliente',        NULL, NULL),
(10, 1,   'APROVADA', 'ARRUMADA', '2024-10-05 14:00:00', 'HD substituído com sucesso',   NULL, NULL),
 
-- Sol. 11: ABERTA → ORCADA → APROVADA → ARRUMADA
(11, 2, 'ABERTA',   'ORCADA',   '2024-09-21 10:00:00', 'Orçamento efetuado por Mário', NULL, NULL),
(11, NULL, 'ORCADA',    'APROVADA', '2024-09-21 16:00:00', 'Aprovado pelo cliente',        NULL, NULL),
(11, 2,   'APROVADA', 'ARRUMADA', '2024-09-23 15:00:00', 'Sensor limpo com sucesso',     NULL, NULL),
 
-- Sol. 12: → PAGA
(12, 1, 'ABERTA',   'ORCADA',   '2024-08-16 10:00:00', 'Orçamento efetuado por Maria', NULL, NULL),
(12, NULL, 'ORCADA',    'APROVADA', '2024-08-16 15:00:00', 'Aprovado pelo cliente',        NULL, NULL),
(12, 1,   'APROVADA', 'ARRUMADA', '2024-08-20 11:00:00', 'Membrana substituída',         NULL, NULL),
(12, NULL, 'ARRUMADA',  'PAGA',     '2024-08-21 16:00:00', 'Pagamento confirmado',         NULL, NULL),
 
-- Sol. 13: → PAGA
(13, 2, 'ABERTA',   'ORCADA',   '2024-08-02 09:00:00', 'Orçamento efetuado por Mário', NULL, NULL),
(13, NULL, 'ORCADA',    'APROVADA', '2024-08-02 14:00:00', 'Aprovado pelo cliente',        NULL, NULL),
(13, 2,   'APROVADA', 'ARRUMADA', '2024-08-05 14:00:00', 'RAM ampliada com sucesso',     NULL, NULL),
(13, NULL, 'ARRUMADA',  'PAGA',     '2024-08-06 10:00:00', 'Pagamento confirmado',         NULL, NULL),
 
-- Sol. 14: → FINALIZADA
(14, 1, 'ABERTA',   'ORCADA',     '2024-07-11 10:00:00', 'Orçamento efetuado por Maria', NULL, NULL),
(14, NULL, 'ORCADA',    'APROVADA',   '2024-07-11 15:00:00', 'Aprovado pelo cliente',        NULL, NULL),
(14, 1,   'APROVADA', 'ARRUMADA',   '2024-07-15 11:00:00', 'Tela substituída',             NULL, NULL),
(14, NULL, 'ARRUMADA',  'PAGA',       '2024-07-16 14:00:00', 'Pagamento confirmado',         NULL, NULL),
(14, 1,   'PAGA',       'FINALIZADA', '2024-07-17 09:00:00', 'Equipamento entregue',         NULL, NULL),
 
-- Sol. 15: → FINALIZADA
(15, 2, 'ABERTA',   'ORCADA',     '2024-07-02 09:00:00', 'Orçamento efetuado por Mário', NULL, NULL),
(15, NULL, 'ORCADA',    'APROVADA',   '2024-07-02 14:00:00', 'Aprovado pelo cliente',         NULL, NULL),
(15, 2,   'APROVADA', 'ARRUMADA',   '2024-07-05 15:00:00', 'Cabeça limpa',                  NULL, NULL),
(15, NULL, 'ARRUMADA',  'PAGA',       '2024-07-06 11:00:00', 'Pagamento confirmado',          NULL, NULL),
(15, 2,   'PAGA',       'FINALIZADA', '2024-07-07 09:00:00', 'Equipamento entregue',          NULL, NULL),
 
-- Sol. 16: → FINALIZADA
(16, 1, 'ABERTA',   'ORCADA',     '2024-06-16 09:00:00', 'Orçamento efetuado por Maria', NULL, NULL),
(16, NULL, 'ORCADA',    'APROVADA',   '2024-06-16 14:00:00', 'Aprovado pelo cliente',        NULL, NULL),
(16, 1,   'APROVADA', 'ARRUMADA',   '2024-06-18 14:00:00', 'Porta USB corrigida',          NULL, NULL),
(16, NULL, 'ARRUMADA',  'PAGA',       '2024-06-19 10:00:00', 'Pagamento confirmado',         NULL, NULL),
(16, 1,   'PAGA',       'FINALIZADA', '2024-06-20 09:00:00', 'Equipamento entregue',         NULL, NULL),
 
-- Sol. 18: ABERTA → ORCADA
(18, 1, 'ABERTA', 'ORCADA', '2024-11-02 10:00:00', 'Orçamento efetuado por Maria', NULL, NULL),
 
-- Sol. 19: ABERTA → ORCADA → APROVADA
(19, 2, 'ABERTA',  'ORCADA',   '2024-10-29 10:00:00', 'Orçamento efetuado por Mário', NULL, NULL),
(19, NULL, 'ORCADA',   'APROVADA', '2024-10-29 16:00:00', 'Aprovado pelo cliente',        NULL, NULL),
 
-- Sol. 20: ABERTA → ORCADA → REJEITADA → APROVADA (RF009 - Resgatar)
(20, 1, 'ABERTA',    'ORCADA',    '2024-09-26 09:00:00', 'Orçamento efetuado por Maria',     NULL, NULL),
(20, NULL, 'ORCADA',     'REJEITADA', '2024-09-27 10:00:00', 'Cliente achou caro inicialmente',  NULL, NULL),
(20, NULL, 'REJEITADA',  'APROVADA',  '2024-09-28 09:00:00', 'Cliente resgatou o serviço',       NULL, NULL),
 
-- Sol. 21: → ARRUMADA
(21, 2, 'ABERTA',   'ORCADA',   '2024-10-19 09:00:00', 'Orçamento efetuado por Mário', NULL, NULL),
(21, NULL, 'ORCADA',    'APROVADA', '2024-10-19 15:00:00', 'Aprovado pelo cliente',        NULL, NULL),
(21, 2,   'APROVADA', 'ARRUMADA', '2024-10-22 16:00:00', 'Placa de vídeo corrigida',     NULL, NULL),
 
-- Sol. 22: → PAGA
(22, 1, 'ABERTA',   'ORCADA',   '2024-10-06 10:00:00', 'Orçamento efetuado por Maria', NULL, NULL),
(22, NULL, 'ORCADA',    'APROVADA', '2024-10-06 15:00:00', 'Aprovado pelo cliente',        NULL, NULL),
(22, 1,   'APROVADA', 'ARRUMADA', '2024-10-09 14:00:00', 'Módulo Bluetooth trocado',     NULL, NULL),
(22, NULL, 'ARRUMADA',  'PAGA',     '2024-10-10 09:00:00', 'Pagamento confirmado',         NULL, NULL);
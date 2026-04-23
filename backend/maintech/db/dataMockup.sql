
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
 

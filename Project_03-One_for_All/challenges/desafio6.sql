SELECT
	MIN(pl.valor) AS 'faturamento_minimo',
    MAX(pl.valor) AS 'faturamento_maximo',
    ROUND(AVG(pl.valor), 2) AS 'faturamento_medio',
    SUM(pl.valor) AS 'faturamento_total' 
FROM planos AS pl
INNER JOIN pessoas_usuarias as p
ON pl.id = p.plano_id;
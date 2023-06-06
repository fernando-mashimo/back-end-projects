SELECT
	p.nome AS 'pessoa_usuaria',
    CASE
		WHEN MAX(YEAR(h.data_reproducao)) >= 2021 THEN 'Ativa'
        ELSE 'Inativa'
 	END AS `status_pessoa_usuaria`
FROM pessoas_usuarias AS p
INNER JOIN historico_de_reproducoes AS h
ON p.id = h.id_pessoa
GROUP BY p.nome
ORDER BY p.nome;
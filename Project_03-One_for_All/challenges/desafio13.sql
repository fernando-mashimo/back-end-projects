SELECT
	CASE
		WHEN p.idade <= 30 THEN 'Até 30 anos'
        WHEN p.idade BETWEEN 31 AND 60 THEN 'Entre 31 e 60 anos'
        ELSE 'Maior de 60 anos'
 	END AS 'faixa_etaria',
    COUNT(DISTINCT(p.id)) AS 'total_pessoas_usuarias',
    COUNT(pfm.id_pessoa) AS 'total_favoritadas'
FROM pessoas_usuarias AS p
LEFT JOIN pessoas_favoritam_musicas AS pfm
ON p.id = pfm.id_pessoa
GROUP BY faixa_etaria
ORDER BY faixa_etaria;
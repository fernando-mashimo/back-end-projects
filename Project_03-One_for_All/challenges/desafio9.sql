SELECT
	COUNT(his.id_cancao) AS 'musicas_no_historico'
FROM pessoas_usuarias AS pes
INNER JOIN historico_de_reproducoes AS his
ON pes.id = his.id_pessoa
GROUP BY pes.nome
HAVING pes.nome = 'Barbara Liskov';
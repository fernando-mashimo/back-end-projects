const validateToken = async (req, res, next) => {
  const token = req.header('authorization');
  if (!token || token === undefined) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  return next();
};

const validateName = async (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const validateAge = async (req, res, next) => {
  const { age } = req.body;
  if (!age || age === 0) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!Number.isInteger(age) || age < 18) {
    return res
      .status(400)
      .json({
        message:
          'O campo "age" deve ser um número inteiro igual ou maior que 18',
      });
  }
  return next();
};

const validateTalk = async (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  return next();
};

const validateDateFormat = (date) => {
  const dateRegEx = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (date === '') return true;
  return dateRegEx.test(date);
};

const validateWatchedAt = async (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!watchedAt || watchedAt === 0) {
    return res
    .status(400)
    .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  const validateDate = validateDateFormat(watchedAt);

  if (!validateDate) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  return next();
};

const validateWatchedAtQuery = async (req, res, next) => {
  const { date } = req.query;
  const validateDate = validateDateFormat(date);
  if (date && !validateDate) {
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }
  return next();
};

const validateRate = async (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  return next();
};

const validateRateQuery = async (req, res, next) => {
  const { rate } = req.query;
  if (rate && (!Number.isInteger(Number(rate)) || Number(rate) < 1 || Number(rate) > 5)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  return next();
};

const validateRatePatch = async (req, res, next) => {
  const { rate } = req.body;
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  return next();
};

const validateTalkerInput = [
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
];

const validateSearchInputs = [validateRateQuery, validateWatchedAtQuery];

module.exports = {
  validateToken,
  validateTalkerInput,
  validateSearchInputs,
  validateRatePatch,
};

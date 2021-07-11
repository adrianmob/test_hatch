const quotes = require("../quotes.json");

const bestOptionsPerYear = async (req, res) => {
  const { year } = req.body;
  const RC = [];
  const low = [];
  const mid = [];
  const high = [];

  //Busqueda de las cotizaciones por año.
  quotes.map((quote) => {
    if (year >= quote.yearRange[0] && year <= quote.yearRange[1]) {
      switch (quote.coverageType) {
        case "RC":
          RC.push(quote);
          break;
        case "Low":
          low.push(quote);
          break;
        case "Mid":
          mid.push(quote);
          break;
        case "High":
          high.push(quote);

          break;
      }
    }
  });

  //Asignacion de mejor cotizacion por categoria.

  const bestRC = getBestQuote(RC);
  const bestLow = getBestQuote(low);
  const bestMid = getBestQuote(mid);
  const bestHigh = getBestQuote(high);

  res.status(200).json({
    bestRC,
    bestLow,
    bestMid,
    bestHigh,
  });
};

const quoteCar = async (req, res) => {
  console.log("endpoint quoteCar");
};

const getBestQuote = (quotes) => {
  // Comparacion de las cotizaciones para obtener el mejor
  if (quotes.length > 0) {
    const bestQuotes = quotes.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }

      return 0;
    });

    return bestQuotes[0];
  } else {
    return "No se encontro cotización para este año";
  }
};

module.exports = {
  bestOptionsPerYear,
  quoteCar,
};

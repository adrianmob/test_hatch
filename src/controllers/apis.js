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

  const bestRC = getBestQuote(RC, false);
  const bestLow = getBestQuote(low, false);
  const bestMid = getBestQuote(mid, false);
  const bestHigh = getBestQuote(high, false);

  res.status(200).json({
    bestRC,
    bestLow,
    bestMid,
    bestHigh,
  });
};

const quoteCar = async (req, res) => {
  const { brand, year, hasAC } = req.body;
  const RC = [];
  const low = [];
  const mid = [];
  const high = [];

  //Busqueda de las cotizaciones por año.
  quotes.map((quote) => {
    if (quote.brand === brand) {
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
    }
  });

  //Asignacion de mejor cotizacion por categoria.

  const bestRC = getBestQuote(RC, hasAC);
  const bestLow = getBestQuote(low, hasAC);
  const bestMid = getBestQuote(mid, hasAC);
  const bestHigh = getBestQuote(high, hasAC);

  res.status(200).json({
    bestRC,
    bestLow,
    bestMid,
    bestHigh,
  });
};

const getBestQuote = (quotes, hasAC) => {
  // Comparacion de las cotizaciones para obtener el mejor
  if (quotes.length > 0) {
    const bestQuotes = quotes.sort((a, b) => {
      //suma de precio y de extra precio
      let precioA = parseFloat(a.price);
      let precioB = parseFloat(b.price);
      if (hasAC) {
        precioA += parseFloat(a.extraCoveragePrice);
        precioB += parseFloat(b.extraCoveragePrice);
      }

      if (precioA > precioB) {
        return 1;
      }
      if (precioA < precioB) {
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

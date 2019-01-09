export default {
  parseThumbnail: function (title, thumbnail) {
    let result = '';
    // Check if thumbnail is empty string or not
    if (thumbnail === '' || thumbnail === 'self' || thumbnail === 'default') {
      result = parseBrandName(title);
      return result;
    }
    else {
      result = `<img src="${thumbnail}" class="thumbnail">`;
      return result;
    }
  }
}

function parseBrandName(title) {
  let result = ''; let matchedBrand = '';
  const listOfBrand = [
    "HP",
    "casio",
    "Casio",
    "TI",
    "ti83",
    "ti 83",
    "ti84",
    "ti 84",
    "ti89",
    "ti 89",
    "Ti "
  ];

  // Check if there's a major brand or calculator within the title
  for (let i = 0; i < listOfBrand.length; i++) {
    if (title.includes(listOfBrand[i])) {
      matchedBrand = listOfBrand[i];
      break;
    }
  }

  // Check Matched Brand
  switch (matchedBrand) {
    case "HP":
      result = `<img src="/img/brand/hp.jpg" class="thumbnail">`;
      break;
    case "casio":
    case "Casio":
      result = `<img src="/img/brand/casio.png" class="thumbnail">`;
      break;
    case "TI":
    case "Ti":
    case "ti83":
    case "ti 83":
    case "ti84":
    case "ti 84":
    case "ti89":
    case "ti 89":
      result = `<img src="/img/brand/texas_instruments.png" class="thumbnail">`;
      break;
    default:
      result = `<img src="/img/reddit.png" class="thumbnail">`;
      break;
  }

  return result;
}
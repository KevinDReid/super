const cotoController = require("./p");
let scrapCoto = (cate) => {
  switch (cate.toLowerCase()) {
    case "almacen":
      url =
        "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-almac%C3%A9n/_/N-8pub5z";
      ext1 =
        "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
      ext2 =
        "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
      cotoController.scrap(url, ext1, ext2);

      break;

    case "bebidas":
      url =
        "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-bebidas/_/N-1c1jy9y";
      ext1 =
        "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
      ext2 =
        "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
      cotoController.scrap(url, ext1, ext2);

      break;

    case "frescos":
      url =
        "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-frescos/_/N-1ewuqo6";
      ext1 =
        "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
      ext2 =
        "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
      cotoController.scrap(url, ext1, ext2);

      break;

    case "congelados":
      url =
        "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-congelados/_/N-1xgbihs";
      ext1 =
        "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
      ext2 =
        "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
      cotoController.scrap(url, ext1, ext2);

      break;

    case "limpieza":
      url =
        "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-limpieza/_/N-nityfw";
      ext1 =
        "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
      ext2 =
        "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
      cotoController.scrap(url, ext1, ext2);

      break;

    case "perfumeria":
      url =
        "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-perfumer%C3%ADa/_/N-cblpjz";
      ext1 =
        "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
      ext2 =
        "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
      cotoController.scrap(url, ext1, ext2);

      break;

    case "electro":
      url =
        "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-electro/_/N-1ngpk59";
      ext1 =
        "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
      ext2 =
        "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
      cotoController.scrap(url, ext1, ext2);

      break;

    case "textil":
      url =
        "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-textil/_/N-l8joi7";
      ext1 =
        "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
      ext2 =
        "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
      cotoController.scrap(url, ext1, ext2);

      break;

    case "hogar":
      url =
        "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-hogar/_/N-qa34ar";
      ext1 =
        "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
      ext2 =
        "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
      cotoController.scrap(url, ext1, ext2);

      break;

    case "aire libre":
      url =
        "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-aire-libre/_/N-w7wnle";
      ext1 =
        "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
      ext2 =
        "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";

      cotoController.scrap(url, ext1, ext2);

      break;
  }
};

function iterar() {
  let params = [
    "almacen",
    "bebidas",
    "frescos",
    "congelados",
    "limpieza",
    "perfumeria",
    "electro",
    "textil",
    "hogar",
    "aire libre",
  ];
  for (let i = 0; i < 1; i++) {
    scrapCoto(params[i]);
  }
  // scrapCoto("almacen");
}
iterar();

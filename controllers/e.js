const cheerio = require("cheerio");
const request = require("request");
const db = require("../database/models");
const coto = db.Coto;
const sequelize = require("sequelize");
const rp = require("request-promise");

let scrap = async (url) => {
  try {
    let ext1 =
      "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";

    let ext2 =
      "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";

    let maq = await rp(url);
    const c = cheerio.load(maq);
    let cat = c("#atg_store_refinementAncestorsLastLink")
      .text()
      .replace(/^\s+|\s+$/g, "")
      .toLowerCase();
    let numberScp = Number(c("#resultsCount").text());

    let realNumber = Math.ceil(numberScp / 48);

    for (let i = 0; i < realNumber; i++) {
      let html = await rp(url);

      if (i > 0) {
        let Url = url + ext1 + 48 * i + ext2;
        html = await rp(Url);
      }

      const $ = cheerio.load(html);
      let productsInfo = $("li.clearfix");
      console.log(i);
      productsInfo.map(async (i, element) => {
        const startTime = Date.now();

        let promises = [];

        let name = $(element)
          .find(".span_productName > div > .descrip_full")
          .text()
          .replace(/^\s+|\s+$/g, "");

        let section = () => {
          switch (cat) {
            case "almacén":
              return 0;
            case "bebidas":
              return 1;
            case "frescos":
              return 2;
            case "congelados":
              return 3;
            case "limpieza":
              return 4;
            case "perfumería":
              return 5;
            case "electro":
              return 6;
            case "textil":
              return 7;
            case "hogar":
              return 8;
            case "aire libre":
              return 9;
            default:
              return null;
          }
        };

        let price = $(element)
          .find(".atg_store_productAddToCart > div > span > span")
          .text()
          .replace(/^\s+|\s+$/g, "");

        let hasDiscount = () => {
          if (
            $(element)
              .find(
                ".atg_store_productAddToCart > .info_discount > div > div > .first_price_discount_container > .price_discount"
              )
              .text().length > 0
          ) {
            // let result = "true";
            return true;
          } else {
            // let result = "false";
            return false;
          }
        };

        let discountPrice = $(element)
          .find(
            ".atg_store_productAddToCart > .info_discount > div > div > .first_price_discount_container > .price_discount"
          )
          .text()
          .replace(/^\s+|\s+$/g, "");

        let url =
          "https://www.cotodigital3.com.ar" +
          productsInfo.find(".product_info_container > a").attr("href");

        let img = $(element).find(".atg_store_productImage > img").attr("src");

        let alt = $(element).find(".atg_store_productImage > img").attr("alt");

        promises.push(
          coto
            .findOrCreate({
              where: {
                name: $(element)
                  .find(".span_productName > div > .descrip_full")
                  .text()
                  .replace(/^\s+|\s+$/g, ""),
              },
              defaults: {
                name: name,

                section: section(),

                price: price,

                hasDiscount: hasDiscount(),

                discountPrice: discountPrice,

                url: url,

                img: img,

                alt: alt,
              },
            })
            // .then(() => {
            //   const endTime = Date.now();
            //   const elapsedTime = endTime - startTime;
            //   console.log("SE CUMPIO UNA PROMESA EN: " + elapsedTime);
            // })
            .then(([product, created]) => {
              console.log(product.discountPrice);
              setTimeout(() => {}, 1000);
            })
          // if (!created) {
          //   coto.update(
          //     {
          //       name: product.name,

          //       section: product.section,

          //       price: product.price,

          //       hasDiscount: product.hasDiscount,

          //       discountPrice: product.discountPrice,

          //       url: product.url,

          //       img: product.img,

          //       alt: product.alt,
          //     },
          //     {
          //       where: {
          //         name: name,
          //       },
          //     }
          //   );
          // }
          // })
        );

        Promise.all(promises).then(() => {
          const endFTime = Date.now();
          const elapsedFinalTime = endFTime - startTime;

          console.log("PROMESAS CUMPLIDAS, TARDÓ: " + elapsedFinalTime);
          setTimeout(() => {}, 1000);
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

scrap(
  "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-almac%C3%A9n/_/N-8pub5z"
);
// let scrapCoto = (cate) => {
//   switch (cate.toLowerCase()) {
//     case "almacen":
//       url =
//         "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-almac%C3%A9n/_/N-8pub5z";
//       ext1 =
//         "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
//       ext2 =
//         "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
//       cotoController.scrap(url, ext1, ext2);

//       break;

//     case "bebidas":
//       url =
//         "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-bebidas/_/N-1c1jy9y";
//       ext1 =
//         "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
//       ext2 =
//         "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
//       cotoController.scrap(url, ext1, ext2);

//       break;

//     case "frescos":
//       url =
//         "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-frescos/_/N-1ewuqo6";
//       ext1 =
//         "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
//       ext2 =
//         "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
//       cotoController.scrap(url, ext1, ext2);

//       break;

//     case "congelados":
//       url =
//         "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-congelados/_/N-1xgbihs";
//       ext1 =
//         "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
//       ext2 =
//         "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
//       cotoController.scrap(url, ext1, ext2);

//       break;

//     case "limpieza":
//       url =
//         "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-limpieza/_/N-nityfw";
//       ext1 =
//         "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
//       ext2 =
//         "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
//       cotoController.scrap(url, ext1, ext2);

//       break;

//     case "perfumeria":
//       url =
//         "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-perfumer%C3%ADa/_/N-cblpjz";
//       ext1 =
//         "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
//       ext2 =
//         "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
//       cotoController.scrap(url, ext1, ext2);

//       break;

//     case "electro":
//       url =
//         "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-electro/_/N-1ngpk59";
//       ext1 =
//         "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
//       ext2 =
//         "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
//       cotoController.scrap(url, ext1, ext2);

//       break;

//     case "textil":
//       url =
//         "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-textil/_/N-l8joi7";
//       ext1 =
//         "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
//       ext2 =
//         "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
//       cotoController.scrap(url, ext1, ext2);

//       break;

//     case "hogar":
//       url =
//         "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-hogar/_/N-qa34ar";
//       ext1 =
//         "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
//       ext2 =
//         "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
//       cotoController.scrap(url, ext1, ext2);

//       break;

//     case "aire libre":
//       url =
//         "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-aire-libre/_/N-w7wnle";
//       ext1 =
//         "?Nf=product.startDate%7CLTEQ+1.6707168E12%7C%7Cproduct.endDate%7CGTEQ+1.6707168E12&No=";
//       ext2 =
//         "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";

//       cotoController.scrap(url, ext1, ext2);

//       break;
//   }
// };

// function iterar() {
//   let params = [
//     "almacen",
//     "bebidas",
//     "frescos",
//     "congelados",
//     "limpieza",
//     "perfumeria",
//     "electro",
//     "textil",
//     "hogar",
//     "aire libre",
//   ];
//   for (let i = 0; i < 1; i++) {
//     // scrapCoto(params[i]);
//   }
//   // scrapCoto("almacen");
// }
// iterar();

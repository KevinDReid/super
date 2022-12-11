const cheerio = require("cheerio");
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
          .find(" .price_discount")
          .text()
          .replace(/^\s+|\s+$/g, "");

        let hasWeirdPromo = $(element)
          .find(".text_price_discount")
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

                hasWeirdPromo: hasWeirdPromo,

                url: url,

                img: img,

                alt: alt,
              },
            })
            .then(([product, created]) => {
              if (!created) {
                coto.update(
                  {
                    name: name,

                    section: section(),

                    price: price,

                    hasDiscount: hasDiscount(),

                    discountPrice: discountPrice,

                    hasWeirdPromo: hasWeirdPromo,

                    url: url,

                    img: img,

                    alt: alt,
                  },
                  {
                    where: {
                      name: name,
                    },
                  }
                );
              }
              console.log(section());
              setTimeout(() => {}, 1200);
            })
        );

        Promise.all(promises).then(() => {
          const endFTime = Date.now();
          const elapsedFinalTime = endFTime - startTime;

          console.log("PROMESAS CUMPLIDAS, TARDÓ: " + elapsedFinalTime);
          setTimeout(() => {}, 600);
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

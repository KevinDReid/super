const cheerio = require("cheerio");
const request = require("request");
const db = require("../database/models");
const coto = db.Coto;
const sequelize = require("sequelize");
const rp = require("request-promise");

// URL del sitio web que queremos scrapear
// Bucle para procesar todas las páginas
async function prueba() {
  // Bucle for con una condición para terminar el bucle
  let url =
    "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-almac%C3%A9n/_/N-8pub5z";
  // Realizamos una petición a la URL especificada
  // setTimeout(() => {
  console.log("pre-ciclo");
  for (let i = 0; i < 5; i++) {
    console.log("empezando el ciclo");
    // console.log(products.length + "asd" + i);

    // console.log(i);
    if (i > 0) {
      url =
        "https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-almac%C3%A9n/_/N-8pub5z?Nf=product.startDate%7CLTEQ+1.6704576E12%7C%7Cproduct.endDate%7CGTEQ+1.6704576E12&No=" +
        48 * i +
        "&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=48";
    }
    let html = await rp(url);
    // Cargamos el HTML de la página en un objeto cheerio
    let products = [];
    const $ = cheerio.load(html);
    let productsInfo = $("li.clearfix");
    console.log(i);
    console.log(products.length + "asd" + i);
    console.log("medio ciclo");
    productsInfo.each(async (i, element) => {
      let hD = () => {
        if (
          $(element)
            .find(
              ".atg_store_productAddToCart > .info_discount > div > div > .first_price_discount_container > .price_discount"
            )
            .text().length > 0
        ) {
          let result = "true";
          return result;
        } else {
          let result = "false";
          return result;
        }
      };
      // products.push({
      //   name: $(element)
      //     .find(".span_productName > div > .descrip_full")
      //     .text()
      //     .replace(/^\s+|\s+$/g, ""),

      //   price: $(element)
      //     .find(".atg_store_productAddToCart > div > span > span")
      //     .text()
      //     .replace(/^\s+|\s+$/g, ""),
      //   hasDiscount: hD(),
      //   discountPrice: $(element)
      //     .find(
      //       ".atg_store_productAddToCart > .info_discount > div > div > .first_price_discount_container > .price_discount"
      //     )
      //     .text()
      //     .replace(/^\s+|\s+$/g, ""),

      //   url:
      //     "https://www.cotodigital3.com.ar" +
      //     productsInfo.find(".product_info_container > a").attr("href"),

      //   img: $(element).find(".atg_store_productImage > img").attr("src"),

      //   alt: $(element).find(".atg_store_productImage > img").attr("alt"),
      // });
      console.log("finalizando el ciclo");
      let promises = [];

      // console.log(products.length + "asd" + i);
      promises.push(
        coto.findOrCreate({
          where: {
            name: $(element)
              .find(".span_productName > div > .descrip_full")
              .text()
              .replace(/^\s+|\s+$/g, ""),
          },
          defaults: {
            name: $(element)
              .find(".span_productName > div > .descrip_full")
              .text()
              .replace(/^\s+|\s+$/g, ""),

            price: $(element)
              .find(".atg_store_productAddToCart > div > span > span")
              .text()
              .replace(/^\s+|\s+$/g, ""),
            hasDiscount: hD(),
            discountPrice: $(element)
              .find(
                ".atg_store_productAddToCart > .info_discount > div > div > .first_price_discount_container > .price_discount"
              )
              .text()
              .replace(/^\s+|\s+$/g, ""),

            url:
              "https://www.cotodigital3.com.ar" +
              productsInfo.find(".product_info_container > a").attr("href"),

            img: $(element).find(".atg_store_productImage > img").attr("src"),

            alt: $(element).find(".atg_store_productImage > img").attr("alt"),
          },
        })
      );
      Promise.all(promises).then((results) => {
        console.log(
          "CUMPLIDO BRO " + products.length + "PROMESAS: " + promises.length
        );
      });
    });
  }
  // }, 4000);

  // Cuando todas las promesas hayan sido completadas,
  // se ejecutará el código dentro de este bloque

  // console.log(products.length + "TERMINO");
  // let promises = [];
  // let a = 0;
  // products.forEach(async (item) => {
  //   // const transaction = coto.sequelize.transaction();
  //   console.log(a + " " + item.name);
  //   a = a + 1;

  //   console.log("creating");
  //   await coto.findOrCreate({
  //     where: {
  //       name: item.name,
  //     },
  //     defaults: {
  //       name: item.name,

  //       price: item.price,

  //       hasDiscount: item.hasDiscount,

  //       discountPrice: item.discountPrice,

  //       url: item.url,

  //       img: item.img,

  //       alt: item.alt,
  //     },
  //   });
  //   // transaction.commit();
  // });

  // await coto.findOne({ where: { name: item.name } }).then(async (result) => {
  //   if (result == null) {
  //     // No se ha encontrado ningún elemento
  //     // Agregar el elemento utilizando el método create
  //     return await coto.create(item);
  //   } else if (result != null) {
  //     console.log("ASDASDASD");

  //     return await coto.update(
  //       {
  //         name: result.name,

  //         price: result.price,

  //         hasDiscount: result.hasDiscount,

  //         discountPrice: result.discountPrice,

  //         url: result.url,

  //         img: result.img,

  //         alt: result.alt,
  //       },
  //       {
  //         where: {
  //           name: result.name,
  //         },
  //       }
  //     );
  //   }
  // });

  // Promise.all(promises).then((results) => {
  //   results.forEach((result) => {});
  // Todas las promesas se han resuelto
  // Puedes continuar con la ejecución del código aquí
  // console.log(products.length);
}
// promises.push(
// coto.findOrCreate({
//   where: {
//     name: item.name,
//   },
//   defaults: {
//     name: item.name,

//     price: item.price,

//     hasDiscount: item.hasDiscount,

//     discountPrice: item.discountPrice,

//     url: item.url,

//     img: item.img,

//     alt: item.alt,
//   },
// })
// );

//   console.log(products.length + 'asd' + i);
//   products.forEach((item) => {
//     console.log("creating");
//     coto.findOrCreate({
//       where: {
//         name: item.name,
//       },
//       defaults: {
//         name: item.name,

//         price: item.price,

//         hasDiscount: item.hasDiscount,

//         discountPrice: item.discountPrice,

//         url: item.url,

//         img: item.img,

//         alt: item.alt,
//       },
//       ignoreDuplicates: true,
//     });
//   });
// }
prueba();

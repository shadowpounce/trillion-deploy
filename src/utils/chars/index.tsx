// export const chars = (str: string, isSpace = false): string => {
//   const wrapText = (text: string, isSpace: boolean): string => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(`${text.trim()}`, "text/html");

//     const processNode = (node: ChildNode): string => {
//       if (node.nodeType === Node.TEXT_NODE) {
//         // Если это текстовый узел, обрабатываем текст
//         const text = node.textContent?.trim() || "";
//         if (text === "") return ""; // Пропускаем пустые строки

//         if (isSpace) {
//           return text
//             .split(/\s+/) // Удаляем лишние пробелы
//             .map((word: string) => `<i class="char">${word}</i>`)
//             .join(" ");
//         } else {
//           return text
//             .split(/\s+/)
//             .map((word: string) =>
//               word
//                 .split("")
//                 .map((char: string) => `<i class="char">${char}</i>`)
//                 .join("")
//             )
//             .map((word: string) => `<i class="charBig">${word}</i>`)
//             .join(" ");
//         }
//       } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== "BR") {
//         // Если это элемент, обрабатываем его рекурсивно
//         const element = node as HTMLElement;
//         const tagName = element.tagName.toLowerCase();
//         const attributes = Array.from(element.attributes)
//           .map(attr => `${attr.name}="${attr.value}"`)
//           .join(" ");

//         const innerHTML = Array.from(element.childNodes)
//           .map(child => processNode(child))
//           .join("");

//         return `<${tagName} ${attributes}>${innerHTML}</${tagName}>`;
//       } else if (node.nodeName === "BR") {
//         return "<br>";
//       }
//       return "";
//     };
//     return Array.from(doc.body.childNodes).map(node => processNode(node)).join("");
//   };
//   return wrapText(str, isSpace);
// };
import parse from "html-react-parser";
import * as cheerio from 'cheerio';

import { FC } from "react";

interface CharProps {
  str: string;
  isSpace?: boolean;
}

export const Chars: FC<CharProps> = ({str, isSpace = false}) => {
  // const $ = cheerio.load(str);

  // const wrapText = (text: string): string => {
  //   if (isSpace) {
  //     return text
  //       .split(/\s+/)
  //       .map(word => `<i class="char">${word}</i>`)
  //       .join(" ");
  //   } else {
  //     return text
  //       .split(/\s+/)
  //       .map(word =>
  //         word
  //           .split("")
  //           .map(char => `<i class="char">${char}</i>`)
  //           .join("")
  //       )
  //       .map(word => `<i class="charBig">${word}</i>`)
  //       .join(" ");
  //   }
  // };

  // $("*").each((_, el) => {
  //   const element = $(el);
  //   element.contents().each((__, node) => {
  //     if (node.type === "text") {
  //       const text = $(node).text();
  //       const wrapped = wrapText(text);
  //       $(node).replaceWith(wrapped);
  //     } else if (node.type === "tag" && node.tagName === "br") {
  //       $(node).replaceWith("<br>");
  //     }
  //   });
  // });

  // const s = $.html().replace("<html>", "").replace("</html>", "").replace("<body>", "").replace("</body>", "").replace("<head>", "").replace("</head>", "");

  // // console.log(parse(s))

  // return parse(s)

  return parse(str);
};

// import * as cheerio from 'cheerio';
// import { FC } from 'react';

// import parse from "html-react-parser";



// export const Chars: FC<CharProps> = ({str, isSpace = false}) => {
//   const $ = cheerio.load(str);

//   const wrapText = (text: string): string => {
//     if (isSpace) {
//       return text
//         .split(/\s+/)
//         .map(word => `<i class="char">${word}</i>`)
//         .join(" ");
//     } else {
//       return text
//         .split(/\s+/)
//         .map(word =>
//           word
//             .split("")
//             .map(char => `<i class="char">${char}</i>`)
//             .join("")
//         )
//         .map(word => `<i class="charBig">${word}</i>`)
//         .join(" ");
//     }
//   };

//   $("*").each((_, el) => {
//     const element = $(el);
//     element.contents().each((__, node) => {
//       if (node.type === "text") {
//         const text = $(node).text();
//         const wrapped = wrapText(text);
//         $(node).replaceWith(wrapped);
//       } else if (node.type === "tag" && node.tagName === "br") {
//         $(node).replaceWith("<br>");
//       }
//     });
//   });

//   return parse($.html().replace("<html>", "").replace("</html>", "").replace("<body>", "").replace("</body>", ""));
// };




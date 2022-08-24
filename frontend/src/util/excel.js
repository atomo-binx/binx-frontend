import ExcelJS from "exceljs";
import validator from "validator";
import download from "downloadjs";
import { dateToFilename } from "./date";

export async function exportToExcel(lista, filename, headers = null) {
  try {
    const workbook = new ExcelJS.Workbook();

    let worksheets = [];

    const sheet = workbook.addWorksheet("Relatório");

    let sheetColumns = [];

    if (headers) {
      sheetColumns = [...headers];
    } else {
      for (const name in lista[0]) {
        sheetColumns.push({
          header: name,
        });
      }
    }

    sheet.columns = sheetColumns;

    worksheets.push(sheet);

    // Insere cada um dos itens da lista como sendo uma linha na tabela
    for (const item of lista) {
      let row = [];

      for (const nome in item) {
        if (typeof item[nome] === "string") {
          if (validator.isDecimal(item[nome], { locale: "pt-BR" })) {
            item[nome] = parseFloat(item[nome].replace(",", "."));
          }
        }

        row.push(item[nome]);
      }

      worksheets[0].addRow(row);
    }

    // Ajuste de tamanho das colunas
    worksheets[0].columns.forEach((column) => {
      const lengths = column.values.map((v) => v.toString().length);
      const maxLength = Math.max(
        ...lengths.filter((v) => typeof v === "number")
      );
      column.width = maxLength + 2;
    });

    // Escreve arquivo final
    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    download(blob, filename + " " + dateToFilename());

    return;
  } catch (error) {
    throw new Error(error);
  }
}

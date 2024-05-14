import { Injectable } from "@nestjs/common"
import { createObjectCsvWriter } from "csv-writer"

@Injectable()
export class CsvService {
    async exportarCsv(data: any[], filePath: string): Promise<void> {
    // Crea un objeto csv
    const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: Object.keys(data[0]).map(key => ({ id: key, title: key })),
    })
    await csvWriter.writeRecords(data)
    }
}

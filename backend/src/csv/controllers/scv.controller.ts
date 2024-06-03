/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards, Req } from "@nestjs/common"
import { AutenticacionGuard } from "src/autenticacion/guards/autenticacion.guard"
import { Roles } from "src/autenticacion/decorators/roles.decorator"
import { UsuarioRolesEnum } from "src/usuario/enums/usuario_roles.enum"
import { CsvService } from "../services/csv.service"
import { ActividadService } from "src/actividad/services/actividad.service"
import { ApiTags } from "@nestjs/swagger"

@ApiTags('Exportación CSV')
@Controller("/exportar")
// El controlador brinda los endpoints de los servicios
export class CsvController {
    // Accede a los metodos de servicio
    constructor(private readonly csvService: CsvService, private actividadService: ActividadService) {}

    // Los decoradores
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    @Get()
    async exportarCsv(@Req() request: Request) {
        // Aquí obtén los datos que deseas exportar
        const datos = await this.actividadService.buscarActividades(request["usuario"])
        const filePath = "datos.csv"
        await this.csvService.exportarCsv(datos, filePath)
        return { message: "CSV exportado exitosamente" }
    }
}
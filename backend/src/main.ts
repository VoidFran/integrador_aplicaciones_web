/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({
        forbidNonWhitelisted: true
    }))

    // Enable CORS
    app.enableCors()
    //Docmentación API - swagger
    const config = new DocumentBuilder()
        .setTitle("API-Backend TP-DAW")
        .setDescription('Aplicación de Gestión de Tareas - Brian Baldeón, Gonzalo Garay y Francisco Rondán')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app,config)
    SwaggerModule.setup('docs',app,document)

    await app.listen(3000)


    console.log("Hola mundo!")
}
bootstrap()

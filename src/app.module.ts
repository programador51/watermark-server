import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';
import { DetaService } from './deta/deta.service';
import { DetaModule } from './deta/deta.module';
import { ZipService } from './zip/zip.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumsService } from './albums/albums.service';
import { AlbumsModule } from './albums/albums.module';
import { PaginationService } from './pagination/pagination.service';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [
    FilesModule,
    ConfigModule.forRoot(),
    DetaModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService, DetaService, ZipService, PaginationService],
})
export class AppModule {}

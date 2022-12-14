import { MulterModule } from '@nestjs/platform-express';
import { Logger, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { createStorage } from 'src/auth/multer/storage';
import { imageFilter } from 'src/auth/multer/imageFilter';
import { updateOne } from './schemas/hooks/updateOne.hook';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Product',
        useFactory: () => {
          const schema = ProductSchema;
          schema.pre('updateOne', updateOne);
          return schema;
        },
      },
    ]),
    MulterModule.register({
      storage: createStorage('products'),
      fileFilter: imageFilter,
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, Logger],
})
export class ProductsModule {}

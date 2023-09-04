import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/product.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt/jwt.strategy';
import { JwtService } from './auth/jwt/jwt.service';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs-api-v1',
      entities: [ProductEntity, UserEntity],
      synchronize: true,
    }),
    AuthModule,
    ProductModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

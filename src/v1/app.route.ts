import { ProductsModule } from './products/products.module';
import { RouterModule, Routes } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RulesModule } from './rules/rules.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { SessionsModule } from './sessions/sessions.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { FilesModule } from './files/files.module';

const routes: Routes = [
  {
    path: 'v1',
    children: [
      { path: 'categories', module: CategoriesModule },
      { path: 'auth', module: AuthModule },
      { path: 'users', module: UsersModule },
      { path: 'rules', module: RulesModule },
      { path: 'roles', module: RolesModule },
      { path: 'sessions', module: SessionsModule },
      { path: 'ingredients', module: IngredientsModule},
      { path: 'products', module: ProductsModule},
      { path: 'files', module: FilesModule },
    ],
  },
];

@Module({
  imports: [RouterModule.register(routes)],
  exports: [RouterModule],
})
export class AppRoute {}

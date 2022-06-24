import { FilesService } from './../files/files.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from 'src/utils/response.service';
import { Product } from 'src/v1/products/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductIngredientService } from '../product-ingredient/product-ingredient.services';
import { SellerStatus } from '../sellers/entities/seller.entity';
import { WholeSaleStatus } from '../wholesales/entities/wholesale.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ErrorResponse } from './exceptions/exceptions.response';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private res: ResponseService,
    private file: FilesService
  ) { }
  async create(createProductDto: CreateProductDto, reqUser: any) {

    const userId = reqUser.id;

    let promises = [];

    let [imageId, pdfId] = [null, null];

    if(createProductDto?.image?.id) {
      imageId = createProductDto.image.id;
      promises.push(this.file.checkPendingImageByUser(imageId, userId))
    }

    if(createProductDto?.pdf?.id) {
      pdfId = createProductDto.pdf.id;
      promises.push(this.file.checkPendingPdfByUser(pdfId, userId))
    }


    await Promise.all(promises);
    const product = this.productRepository.create({ ...createProductDto });

    promises = [this.productRepository.save(product)]


    if(imageId) {   
      promises.push(this.file.activateFileByUser(imageId, userId))
    }

    if(pdfId) {   
      promises.push(this.file.activateFileByUser(pdfId, userId))
    }

    const [result,] = await Promise.all(promises);



    return this.res.success(result);
  }

  findAll() {
    return `This action returns all products`;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id, sellers: {
          status: SellerStatus.Active
        },
        wholesales: {
          status: WholeSaleStatus.Active
        }
      }, relations: ['sellers', 'wholesales', 'productIngredient']
    });
    if (!product) {
      throw new BadRequestException(ErrorResponse.NotFound);
    }
    return this.res.success(product);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

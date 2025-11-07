import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from '../../modules/shop/shop.service';
import { getModelToken } from '@nestjs/mongoose';
import { Shop } from '../../modules/shop/schemas/shop.schema';

describe('ShopService', () => {
  let service: ShopService;

  const mockShopModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
        {
          provide: getModelToken(Shop.name),
          useValue: mockShopModel,
        },
      ],
    }).compile();

    service = module.get<ShopService>(ShopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


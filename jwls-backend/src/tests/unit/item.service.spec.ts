import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from '../../modules/item/item.service';
import { getModelToken } from '@nestjs/mongoose';
import { Item } from '../../modules/item/schemas/item.schema';

describe('ItemService', () => {
  let service: ItemService;

  const mockItemModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: getModelToken(Item.name),
          useValue: mockItemModel,
        },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


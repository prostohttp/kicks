import { Test, TestingModule } from "@nestjs/testing";
import { BrandsResolver } from "./brands.resolver";

describe("BrandsResolver", () => {
  let resolver: BrandsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandsResolver],
    }).compile();

    resolver = module.get<BrandsResolver>(BrandsResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});

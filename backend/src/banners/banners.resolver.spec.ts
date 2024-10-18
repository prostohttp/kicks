import { Test, TestingModule } from "@nestjs/testing";
import { BannersResolver } from "./banners.resolver";

describe("BannersResolver", () => {
  let resolver: BannersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BannersResolver],
    }).compile();

    resolver = module.get<BannersResolver>(BannersResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { ShippingsResolver } from "./shippings.resolver";

describe("ShippingsResolver", () => {
  let resolver: ShippingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingsResolver],
    }).compile();

    resolver = module.get<ShippingsResolver>(ShippingsResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});

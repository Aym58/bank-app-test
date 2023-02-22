import { createParamDecorator } from '@nestjs/common';

import { BankEntity } from '../bank.entity';
import { BankRepository } from '../bank.repository';

export const GetBank = createParamDecorator(
  async (data: string, context): Promise<BankEntity> => {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    const id = Number(params.id);

    const bank = await BankRepository.findOne({
      where: { id },
    });

    return bank;
  },
);

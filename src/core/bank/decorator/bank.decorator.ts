import { createParamDecorator } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { BankEntity } from '../bank.entity';
import { BankRepository } from '../bank.repository';
import { Messages } from '../enum/messages.enum';

export const GetBank = createParamDecorator(
  async (data: string, context): Promise<BankEntity> => {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    const id = Number(params.id);

    const bank = await BankRepository.findOne({
      where: { id },
    });
    if (!bank) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }

    return bank;
  },
);

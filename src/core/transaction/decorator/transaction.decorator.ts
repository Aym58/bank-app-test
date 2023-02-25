import { createParamDecorator } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { TransactionEntity } from '../transaction.entity';
import { TransactionRepository } from '../transaction.repository';
import { Messages } from '../enum/messages.enum';

export const GetTransaction = createParamDecorator(
  async (data: string, context): Promise<TransactionEntity> => {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    const id = Number(params.id);

    const transaction = await TransactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }

    return transaction;
  },
);

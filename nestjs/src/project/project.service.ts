import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from 'src/models/project.model';
import { PROJECT_MODEL, USER_MODEL } from 'constants/constants';
import { User } from 'src/models/user.model';
import { userJwtPayload } from 'src/user/dto/user-jwt-paylaod.dto';
import Stripe from 'stripe';
import { Response } from 'express';

@Injectable()
export class ProjectService {
  private stripe: Stripe;
  constructor(
    @Inject(PROJECT_MODEL)
    private project: typeof Project,
    @Inject(USER_MODEL)
    private user: typeof User,
  ) {
    this.stripe = new Stripe(
      'sk_test_51NF9qyKHRZmQNLJeJQ2HgtqnxpRXSmKt2GgnkEzM8FGq39WnjnguqEmSOAmLc4Ssps19Hsg6WUZEXChc1mnQ67YG00erFhf88A',
      {
        apiVersion: '2023-08-16',
      },
    );
  }
  async create(createProjectDto: CreateProjectDto, user: userJwtPayload) {
    const project = await this.project.create({
      name: createProjectDto.name,
      deadLine: createProjectDto.deadLine,
      owner: user.sub,
      maker: createProjectDto.maker,
    });
    return project;
  }

  async findAll() {
    return await this.project.findAll();
  }

  findOne(id: number) {
    return this.project.findByPk(id);
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }

  async payForProject(res: Response) {
    const price = await this.stripe.prices.create({
      currency: 'usd',
      //this is 100.00$
      unit_amount: 10000,
      // this need mode to be sus
      // recurring: {
      //   interval: 'day',
      // },
      // here i should add project name
      product_data: {
        name: 'project-pay1',
      },
    });
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      currency: 'usd',
      // success_url: 'http://localhost:3000/projec/sucsess-payment/',
      // cancel_url: 'http://localhost:3000/project/cancel-payment',
    });

    session.success_url = `http://localhost:3000/project/sucsess-payment/?sessionId=${session.id}`;
    session.cancel_url = 'http://localhost:3000/project/cancel-payment';
    res.redirect(session.url);
  }

  async sucsessPay(project: number, user: number, sessionId: string) {
    const findSession = await this.stripe.checkout.sessions.retrieve(sessionId);
    // use this for check if payment is completed
    // console.log(findSession.payment_status);
    // console.log(findSession.status);
    return findSession.payment_status;
  }
}

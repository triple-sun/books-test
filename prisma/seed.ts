import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

const prisma = new PrismaClient();

const getSeedUserPassHash = async () => {
  const pass = process.env['SEED_USER_PASS'];
  const salt = await genSalt(10);

  if (!pass) {
    throw new Error('Seed user password is undefined');
  }

  return await hash(pass, salt);
};

async function fillDb() {
  const seedUserPassHash = await getSeedUserPassHash();

  await prisma.user.create({
    data: {
      name: 'Андрей',
      email: 'andrew@mail.local',
      passwordHash: seedUserPassHash,
    },
  });

  await prisma.user.create({
    data: {
      name: 'Юлия',
      email: 'yulia@mail.local',
      passwordHash: seedUserPassHash,
      books: {
        create: [
          {
            title: 'Властелин колец',
            author: 'Джон Рональд Руэн Толкин',
            year: 1954,
            desc: '«Властели́н коле́ц» (англ. The Lord of the Rings) — роман-эпопея английского писателя Дж. Р. Р. Толкина, одно из самых известных произведений жанра фэнтези. «Властелин колец» был написан как единая книга, но из-за объёма при первом издании его разделили на три части — «Братство Кольца», «Две крепости» и «Возвращение короля». В виде трилогии он публикуется и по сей день, хотя часто в едином томе. Роман считается первым произведением жанра эпическое фэнтези, а также его классикой.',
          },
          {
            title: 'Щегол',
            author: 'Донна Тартт',
            year: 2013,
            desc: '«Щегол» (англ. The Goldfinch) — третий роман американской писательницы Донны Тартт, опубликованный в 2013 году. Роман назван в честь картины известного голландского художника Карела Фабрициуса «Щегол» (1654), которая играет важную роль в судьбе главного героя. Книга стала лауреатом многих наград, в том числе Пулитцеровской премии за художественную книгу 2014 года.',
          },
        ],
      },
    },
  });

  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });

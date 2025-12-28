import { PrismaClient, TransactionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding default budget categories...');

  const categories = await prisma.category.findMany();

  if (categories.length > 0) {
    console.log('✅ Skipping creating default categories ');
    return;
  }

  // Delete all existing default categories to avoid duplicates
  await prisma.subCategory.deleteMany({
    where: {
      category: {
        userId: null,
      },
    },
  });
  await prisma.category.deleteMany({
    where: {
      userId: null,
    },
  });

  // Income Categories (Renda)
  const incomeCategories = [
    {
      name: 'Salários',
      icon: 'salary',
      type: TransactionType.INCOME,
      userId: null, // Global default category
      subcategories: [
        { name: 'Pagamento' },
        { name: 'Gorjetas' },
        { name: 'Bônus' },
        { name: 'Comissão' },
        { name: 'Outros' },
      ],
    },
    {
      name: 'Outros',
      icon: 'other',
      type: TransactionType.INCOME,
      userId: null, // Global default category
      subcategories: [
        { name: 'Transferência de poupança' },
        { name: 'Renda de juros' },
        { name: 'Dividendos' },
        { name: 'Presentes' },
        { name: 'Restituições' },
        { name: 'Outros' },
      ],
    },
  ];

  // Expense Categories (Despesas)
  const expenseCategories = [
    {
      name: 'Vestuário',
      icon: 'clothing',
      type: TransactionType.EXPENSE,
      userId: null, // Global default category
      subcategories: [
        { name: 'Roupas' },
        { name: 'Tenis' },
        { name: 'Cueca' },
        { name: 'Meias' },
      ],
    },
    {
      name: 'Débito',
      icon: 'expense',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Cartões de crédito' },
        { name: 'Financiamento estudantil' },
        { name: 'Outros empréstimos' },
        { name: 'Impostos (federais)' },
        { name: 'Impostos (estaduais)' },
        { name: 'Outros' },
      ],
    },
    {
      name: 'Educação',
      icon: 'education',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Cursos Investimentos' },
        { name: 'Cursos Programação' },
        { name: 'Cursos Inglês' },
        { name: 'Cursos Diversos' },
        { name: 'Livros' },
      ],
    },
    {
      name: 'Entretenimento',
      icon: 'fun',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Shows/espetáculos' },
        { name: 'Jogos' },
        { name: 'Hobbies' },
        { name: 'Filmes' },
        { name: 'Música' },
        { name: 'Atividades ao ar livre' },
        { name: 'Fotografia' },
        { name: 'Esportes' },
        { name: 'Peças de teatro' },
        { name: 'TV' },
        { name: 'Cinema' },
      ],
    },
    {
      name: 'Despesas diárias',
      icon: 'food',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Padaria' },
        { name: 'Supermercado' },
        { name: 'Restaurantes' },
        { name: 'Higiene Pessoal' },
        { name: 'Cabelo/beleza' },
        { name: 'Outros' },
      ],
    },
    {
      name: 'Presentes',
      icon: 'gift',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Presentes' },
        { name: 'Doações (caridade)' },
        { name: 'Outros' },
      ],
    },
    {
      name: 'Saúde',
      icon: 'health',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Médico/dentista/óculos' },
        { name: 'Cuidados especiais' },
        { name: 'Farmácia' },
        { name: 'Emergência' },
        { name: 'Outros' },
      ],
    },
    {
      name: 'Casa',
      icon: 'home',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Aluguel/financiamento imobiliário' },
        { name: 'Impostos residenciais' },
        { name: 'Móveis' },
        { name: 'Gramado/jardim' },
        { name: 'Suprimentos' },
        { name: 'Manutenção' },
        { name: 'Reforma' },
        { name: 'Mudança' },
        { name: 'Outros' },
      ],
    },
    {
      name: 'Seguro',
      icon: 'expense',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Veículo' },
        { name: 'Saúde' },
        { name: 'Residencial' },
        { name: 'Vida' },
        { name: 'Outros' },
      ],
    },
    {
      name: 'Animais de estimação',
      icon: 'expense',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Alimentação' },
        { name: 'Veterinário' },
        { name: 'Brinquedos' },
        { name: 'Suprimentos' },
        { name: 'Outros' },
      ],
    },
    {
      name: 'Tecnologia',
      icon: 'expense',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Domínios e hospedagem' },
        { name: 'Serviços on-line' },
        { name: 'Hardware' },
        { name: 'Software' },
        { name: 'Serviços de IA' },
        { name: 'Outros' },
      ],
    },
    {
      name: 'Transporte',
      icon: 'transport',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Combustível' },
        { name: 'Prestações do carro' },
        { name: 'Consertos' },
        { name: 'Estacionamento' },
        { name: 'Suprimentos' },
        { name: 'Transporte público' },
        { name: 'Uber' },
        { name: 'Outros' },
      ],
    },
    {
      name: 'Viagens',
      icon: 'travel',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Passagem aérea' },
        { name: 'Hotéis' },
        { name: 'Alimentação' },
        { name: 'Transporte' },
        { name: 'Entretenimento' },
        { name: 'Outros' },
      ],
    },
    {
      name: 'Contas Fixas',
      icon: 'expense',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [
        { name: 'Internet' },
        { name: 'Luz' },
        { name: 'Condomínio' },
        { name: 'Prestação Apartamento' },
        { name: 'Internet Celular' },
      ],
    },
    {
      name: 'Outros',
      icon: 'other',
      type: TransactionType.EXPENSE,
      userId: null,
      subcategories: [{ name: 'Dívida' }, { name: 'Extra' }],
    },
  ];

  // Create all categories with subcategories
  const allCategories = [...incomeCategories, ...expenseCategories];

  for (const category of allCategories) {
    const { subcategories, ...categoryData } = category;

    await prisma.category.create({
      data: {
        ...categoryData,
        subcategories: {
          create: subcategories,
        },
      },
    });
  }

  console.log('✅ Default budget categories seeded successfully!');
  console.log(`   - ${incomeCategories.length} income categories`);
  console.log(`   - ${expenseCategories.length} expense categories`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

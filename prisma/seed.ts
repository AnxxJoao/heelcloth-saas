import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  console.log("🌱 Iniciando seed do banco de dados Heelcloth SaaS...");

  // 1. Limpar dados pré-existentes para garantir idempotência
  await prisma.auditLog.deleteMany();
  await prisma.whatsAppMessage.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.financialTransaction.deleteMany();
  await prisma.inventoryMovement.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.qualityCheck.deleteMany();
  await prisma.productionHistory.deleteMany();
  await prisma.productionOrder.deleteMany();
  await prisma.orderPlayer.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.quoteItem.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.user.deleteMany();

  // 2. Usuários e RBAC (Seção 25)
  console.log("👤 Criando usuários com permissões...");
  const adminUser = await prisma.user.create({
    data: {
      name: "Administrador Geral",
      email: "admin@heelcloth.com.br",
      passwordHash: hashPassword("admin123"),
      role: "ADMIN",
    },
  });

  const prodUser = await prisma.user.create({
    data: {
      name: "Carlos Produção",
      email: "producao@heelcloth.com.br",
      passwordHash: hashPassword("prod123"),
      role: "PRODUCAO",
    },
  });

  const finUser = await prisma.user.create({
    data: {
      name: "Mariana Financeiro",
      email: "financeiro@heelcloth.com.br",
      passwordHash: hashPassword("fin123"),
      role: "FINANCEIRO",
    },
  });

  const vendUser = await prisma.user.create({
    data: {
      name: "Lucas Vendas",
      email: "vendedor@heelcloth.com.br",
      passwordHash: hashPassword("vendas123"),
      role: "VENDEDOR",
    },
  });

  // 3. Catálogo de Produtos Básicos
  console.log("👕 Criando produtos básicos...");
  const produtos = await Promise.all([
    prisma.product.create({
      data: {
        name: "Camisa Tradicional Jogador",
        category: "CAMISA_JOGADOR",
        basePrice: 59.9,
        description: "Dry-fit liso, gola careca ou V, manga curta, com personalização de nome e número",
      },
    }),
    prisma.product.create({
      data: {
        name: "Camisa Tradicional Goleiro",
        category: "CAMISA_GOLEIRO",
        basePrice: 69.9,
        description: "Dry-fit com acolchoamento nas mangas opcionais, nome e número",
      },
    }),
    prisma.product.create({
      data: {
        name: "Short / Calção Esportivo",
        category: "SHORT",
        basePrice: 35.0,
        description: "Calção poliéster com elástico e cordão de ajuste",
      },
    }),
    prisma.product.create({
      data: {
        name: "Meião Profissional",
        category: "MEIAO",
        basePrice: 22.0,
        description: "Meião de compressão anatômica cano alto",
      },
    }),
    prisma.product.create({
      data: {
        name: "Kit Completo (Camisa + Short + Meião)",
        category: "KIT_COMPLETO",
        basePrice: 110.0,
        description: "Uniforme completo de jogo com personalização individual",
      },
    }),
  ]);

  // 4. Clientes (Seção 9)
  console.log("👥 Criando clientes de exemplo...");
  const cliente1 = await prisma.customer.create({
    data: {
      name: "Fúria FC Esporte Clube",
      document: "12.345.678/0001-90",
      phone: "(11) 98765-4321",
      whatsapp: "5511987654321",
      email: "contato@furiafc.com.br",
      address: "Rua do Futebol, 100 - Bairro dos Campeões, São Paulo - SP",
      notes: "Cliente fiel, pede uniformes todo início de campeonato regional",
    },
  });

  const cliente2 = await prisma.customer.create({
    data: {
      name: "Associação Atlética Vila Nova",
      document: "98.765.432/0001-10",
      phone: "(19) 99123-4567",
      whatsapp: "5519991234567",
      email: "diretoria@vilanova.com.br",
      address: "Av. Brasil, 450 - Centro, Campinas - SP",
      notes: "Exigência de prazo curto para estreia no campeonato municipal",
    },
  });

  // 5. Orçamento e Pedido de Exemplo com Jogadores (Seção 5 e 6)
  console.log("📋 Criando orçamento e pedido de teste...");
  const orcamento1 = await prisma.quote.create({
    data: {
      quoteNumber: "ORC-2603-0001",
      customerId: cliente1.id,
      status: "CONVERTIDO",
      totalAmount: 2640.0,
      discount: 100.0,
      validUntil: new Date(Date.now() + 15 * 24 * 3600 * 1000),
      notes: "24 kits completos de jogo",
      items: {
        create: [
          {
            product: "Kit Completo (Camisa + Short + Meião)",
            quantity: 24,
            unitPrice: 110.0,
            totalPrice: 2640.0,
            details: "Dry-fit texturizado com punho elástico e gola V",
          },
        ],
      },
    },
  });

  const pedido1 = await prisma.order.create({
    data: {
      orderNumber: "HC-2603-0001",
      customerId: cliente1.id,
      quoteId: orcamento1.id,
      status: "EM_PRODUCAO",
      totalAmount: 2540.0,
      paidAmount: 1300.0,
      pendingAmount: 1240.0,
      paymentMethod: "PIX",
      deliveryDeadline: new Date(Date.now() + 10 * 24 * 3600 * 1000),
      notes: "Entregar embalado individualmente por jogador",
      items: {
        create: [
          {
            product: "Camisa de Jogador",
            quantity: 22,
            unitPrice: 60.0,
            totalPrice: 1320.0,
            color: "Preto e Vermelho",
            model: "Tradicional",
          },
          {
            product: "Camisa de Goleiro",
            quantity: 2,
            unitPrice: 70.0,
            totalPrice: 140.0,
            color: "Amarelo Fluorescente",
            model: "Manga Longa",
          },
          {
            product: "Short de Jogo",
            quantity: 24,
            unitPrice: 45.0,
            totalPrice: 1080.0,
            color: "Preto",
          },
        ],
      },
    },
  });

  // Criar jogadores individuais do pedido (Seção 6 e automação CorelDRAW)
  const jogadores = [
    { index: 1, name: "ALISSON", number: "1", size: "G", model: "Goleiro", short: "G" },
    { index: 2, name: "DANILO", number: "2", size: "M", model: "Jogador", short: "M" },
    { index: 3, name: "MARQUINHOS", number: "3", size: "G", model: "Jogador", short: "G" },
    { index: 4, name: "THIAGO", number: "4", size: "G", model: "Jogador", short: "G" },
    { index: 5, name: "CASEMIRO", number: "5", size: "GG", model: "Jogador", short: "GG" },
    { index: 6, name: "LUCAS", number: "6", size: "M", model: "Jogador", short: "M" },
    { index: 7, name: "VINICIUS", number: "7", size: "M", model: "Jogador", short: "M" },
    { index: 8, name: "RODRYGO", number: "8", size: "M", model: "Jogador", short: "M" },
    { index: 9, name: "RICHARLISON", number: "9", size: "G", model: "Jogador", short: "G" },
    { index: 10, name: "NEYMAR", number: "10", size: "M", model: "Jogador", short: "M" },
    { index: 11, name: "RAPHINHA", number: "11", size: "M", model: "Jogador", short: "M" },
    { index: 12, name: "EDERSON", number: "12", size: "GG", model: "Goleiro", short: "GG" },
  ];

  for (const j of jogadores) {
    await prisma.orderPlayer.create({
      data: {
        orderId: pedido1.id,
        playerIndex: j.index,
        name: j.name,
        number: j.number,
        size: j.size,
        model: j.model,
        shortSize: j.short,
      },
    });
  }

  // 6. Etapa de Produção (Seção 10)
  const producao1 = await prisma.productionOrder.create({
    data: {
      orderId: pedido1.id,
      currentStage: "ESTAMPARIA",
      stageStatus: "EM_ANDAMENTO",
      responsible: "Carlos Produção",
      deadline: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      notes: "Arte aprovada pelo cliente. Camisas no processo de sublimação.",
      history: {
        create: [
          {
            stage: "ARTE",
            status: "CONCLUIDO",
            responsible: "Carlos Produção",
            notes: "Vetorização e layout de nomes/números conferidos no CorelDRAW",
          },
          {
            stage: "CORTE",
            status: "CONCLUIDO",
            responsible: "Oficina Corte",
            notes: "24 kits cortados em Dry-Fit tecnológico",
          },
          {
            stage: "ESTAMPA",
            status: "EM_ANDAMENTO",
            responsible: "Carlos Produção",
            notes: "Sublimação total frente, costas e mangas",
          },
        ],
      },
    },
  });

  // 7. Estoque Inicial (Seção 12)
  console.log("📦 Criando itens de estoque...");
  const tecido = await prisma.inventoryItem.create({
    data: {
      name: "Tecido Dry-Fit 100% Poliéster Liso",
      category: "TECIDO",
      unit: "METRO",
      quantity: 450.0,
      minQuantity: 100.0,
      cost: 14.5,
      supplier: "Têxtil Santa Catarina Ltda",
    },
  });

  const elastico = await prisma.inventoryItem.create({
    data: {
      name: "Elástico Canelado 40mm para Calção",
      category: "MATERIAL",
      unit: "METRO",
      quantity: 120.0,
      minQuantity: 50.0,
      cost: 2.1,
      supplier: "Aviamentos Silva",
    },
  });

  const embalagem = await prisma.inventoryItem.create({
    data: {
      name: "Saco Plástico Transparente com Adesivo HC",
      category: "EMBALAGEM",
      unit: "UNIDADE",
      quantity: 35.0, // Estoque baixo de propósito para testar alerta (< 100)
      minQuantity: 100.0,
      cost: 0.35,
      supplier: "Embalagens Rápidas",
    },
  });

  // 8. Financeiro Inicial (Seção 13)
  console.log("💰 Criando transações financeiras...");
  await prisma.financialTransaction.create({
    data: {
      type: "RECEITA",
      category: "VENDA",
      description: "Entrada 50% Pedido HC-2603-0001 (Fúria FC)",
      amount: 1300.0,
      paymentDate: new Date(),
      paymentMethod: "PIX",
      status: "PAGO",
      orderId: pedido1.id,
      customerId: cliente1.id,
    },
  });

  await prisma.financialTransaction.create({
    data: {
      type: "RECEITA",
      category: "VENDA",
      description: "Saldo restante Pedido HC-2603-0001 (Fúria FC)",
      amount: 1240.0,
      dueDate: new Date(Date.now() + 10 * 24 * 3600 * 1000),
      paymentMethod: "PIX",
      status: "PENDENTE",
      orderId: pedido1.id,
      customerId: cliente1.id,
    },
  });

  await prisma.financialTransaction.create({
    data: {
      type: "DESPESA",
      category: "MATERIA_PRIMA",
      description: "Compra de rolos de tecido Dry-Fit",
      amount: 1450.0,
      dueDate: new Date(Date.now() + 5 * 24 * 3600 * 1000),
      paymentMethod: "BOLETO",
      status: "PENDENTE",
      supplier: "Têxtil Santa Catarina Ltda",
    },
  });

  // 9. Configurações Globais (Seção 22)
  console.log("⚙️ Criando configurações do sistema...");
  await prisma.setting.createMany({
    data: [
      { key: "EMPRESA_NOME", value: "Heelcloth Confecção e Estamparia Ltda", description: "Razão social da empresa" },
      { key: "EMPRESA_CNPJ", value: "00.000.000/0001-00", description: "CNPJ para emissão de NF-e" },
      { key: "EMPRESA_TELEFONE", value: "(11) 99999-9999", description: "Telefone de contato comercial" },
      { key: "WHATSAPP_AUTO_NOTIFY", value: "true", description: "Disparo automático de mensagens ao mudar status" },
    ],
  });

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

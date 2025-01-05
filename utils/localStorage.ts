import { Product } from "../types/product";

// Chave usada para salvar/recuperar produtos no localStorage
const STORAGE_KEY = "oak_products";

// Lista de produtos padrão que serão carregados inicialmente
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Desenvolvimento Web Personalizado",
    description:
      "Desenvolvimento de aplicações web sob medida para sua empresa, utilizando as mais modernas tecnologias do mercado.",
    price: 15000,
    available: true,
  },
  {
    id: 2,
    name: "Consultoria em Transformação Digital",
    description:
      "Consultoria especializada para auxiliar sua empresa no processo de transformação digital, identificando oportunidades e definindo estratégias.",
    price: 8000,
    available: true,
  },
  {
    id: 3,
    name: "Squad as a Service",
    description:
      "Equipe dedicada com as competências necessárias para planejar, desenvolver e evoluir seu projeto digital.",
    price: 25000,
    available: true,
  },
  {
    id: 4,
    name: "UX/UI Design",
    description:
      "Design de interfaces e experiência do usuário para seus produtos digitais, focando em usabilidade e conversão.",
    price: 12000,
    available: true,
  },
  {
    id: 5,
    name: "Manutenção de Sistemas",
    description:
      "Serviço de manutenção e suporte para sistemas web, garantindo estabilidade e evolução contínua.",
    price: 5000,
    available: true,
  },
];

/**
 * Carrega a lista de produtos do localStorage.
 * Se não existir nenhum produto salvo, retorna a lista padrão.
 */
export const loadProducts = (): Product[] => {
  try {
    // Tenta buscar os produtos do localStorage
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);

    // Se não encontrou nada salvo, usa a lista padrão
    if (!dadosSalvos) {
      saveProducts(DEFAULT_PRODUCTS); // Salva a lista padrão
      return DEFAULT_PRODUCTS;
    }

    // Converte os dados salvos de texto para objeto
    const produtos = JSON.parse(dadosSalvos);
    return produtos;
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
    return DEFAULT_PRODUCTS;
  }
};

/**
 * Salva a lista de produtos no localStorage
 */
export const saveProducts = (products: Product[]): void => {
  try {
    const dadosParaSalvar = JSON.stringify(products);
    localStorage.setItem(STORAGE_KEY, dadosParaSalvar);
  } catch (erro) {
    console.error("Erro ao salvar produtos:", erro);
  }
};

/**
 * Adiciona um novo produto à lista
 */
export const addProduct = (product: Product): Product | null => {
  try {
    // Verifica se o produto é válido
    if (!product.name || !product.description || product.price <= 0) {
      console.error("Dados do produto inválidos");
      return null;
    }

    const listaProdutos = loadProducts();
    listaProdutos.push(product);
    saveProducts(listaProdutos);
    return product;
  } catch (erro) {
    console.error("Erro ao adicionar produto:", erro);
    return null;
  }
};

/**
 * Atualiza um produto existente
 */
export const updateProduct = (product: Product): boolean => {
  try {
    const listaProdutos = loadProducts();

    // Encontra a posição do produto na lista
    const posicaoProduto = listaProdutos.findIndex((p) => p.id === product.id);

    // Se não encontrou o produto, retorna falso
    if (posicaoProduto === -1) {
      console.error("Produto não encontrado");
      return false;
    }

    // Atualiza o produto na lista
    listaProdutos[posicaoProduto] = product;
    saveProducts(listaProdutos);
    return true;
  } catch (erro) {
    console.error("Erro ao atualizar produto:", erro);
    return false;
  }
};

/**
 * Remove um produto da lista
 */
export const deleteProduct = (id: number): boolean => {
  try {
    const listaProdutos = loadProducts();
    const novaLista = listaProdutos.filter((produto) => produto.id !== id);
    saveProducts(novaLista);
    return true;
  } catch (erro) {
    console.error("Erro ao excluir produto:", erro);
    return false;
  }
};

/**
 * Reseta a lista de produtos para o estado inicial (padrão)
 */
export const resetToDefault = (): Product[] => {
  try {
    saveProducts(DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS;
  } catch (erro) {
    console.error("Erro ao resetar produtos:", erro);
    return [];
  }
};

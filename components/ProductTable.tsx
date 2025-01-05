"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/product";
import ProductTableHeader from "./ProductTableHeader";

type ProductTableProps = {
  products: Product[];
  searchTerm: string;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
};

export default function ProductTable({
  products,
  searchTerm,
  onEdit,
  onDelete,
  itemsPerPage,
  setItemsPerPage,
}: ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Product>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // 1. Primeiro filtra os produtos
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Depois ordena os produtos filtrados
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // 3. Por fim, aplica a paginação
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Funções auxiliares
  function handleSort(field: keyof Product) {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  function formatPrice(price: number | string) {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return numPrice.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {visibleProducts.length} of {sortedProducts.length} products
        </p>
        <div className="flex items-center gap-2">
          <label className="text-sm">Items per page:</label>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <ProductTableHeader
          onSort={handleSort}
          sortConfig={{ key: sortField, direction: sortDirection }}
        />
        <TableBody>
          {visibleProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="text-left">{product.name}</TableCell>
              <TableCell className="text-center">
                {formatPrice(product.price)}
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.available ? "Sim" : "Não"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className={currentPage === 1 ? "opacity-50" : ""}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              className={currentPage === totalPages ? "opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

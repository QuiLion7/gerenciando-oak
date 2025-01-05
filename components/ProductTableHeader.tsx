import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Product } from "@/types/product";

type HeaderProps = {
  onSort: (key: keyof Product) => void;
  sortConfig: {
    key: keyof Product;
    direction: "asc" | "desc";
  };
};

export default function ProductTableHeader({
  onSort,
  sortConfig,
}: HeaderProps) {
  // Mostra a seta para cima ou para baixo baseado na direção da ordenação
  function getSortArrow(key: keyof Product) {
    if (sortConfig.key !== key) return null;

    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  }

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-left">
          <Button
            variant="ghost"
            onClick={() => onSort("name")}
            className="w-full text-left"
          >
            Nome {getSortArrow("name")}
          </Button>
        </TableHead>
        <TableHead className="text-right">
          <Button
            variant="ghost"
            onClick={() => onSort("price")}
            className="w-full text-right"
          >
            Preço {getSortArrow("price")}
          </Button>
        </TableHead>
        <TableHead className="text-center">
          <Button
            variant="ghost"
            onClick={() => onSort("available")}
            className="w-full text-center"
          >
            Disponível {getSortArrow("available")}
          </Button>
        </TableHead>
        <TableHead className="text-center">Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
}
